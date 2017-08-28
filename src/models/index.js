import { types, applySnapshot, getSnapshot } from 'mobx-state-tree';
const filterType = types.union(...['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE'].map(types.literal))

var states = [];
var currentFrame = 0;

const Todo = types.model({
    name: types.string,
    completed: false,
    index: types.identifier(types.number)
});

export const TodoStore = types
    .model({
        todos: types.array(Todo),
        filter: types.optional(filterType, 'SHOW_ALL')
    })
    .views(self => ({
        get completedCount(){
            return self.todos.filter(todo => todo.completed).length;
        },
        get activeCount(){
            return self.todos.length - self.completedCount;
        },
        get filteredTodos(){
            switch (self.filter) {
                case 'SHOW_COMPLETED':
                    return self.todos.filter(t => t.completed);
                case 'SHOW_ACTIVE':
                    return self.todos.filter(t => !t.completed);
                default:
                    return self.todos;
            }
        }
    }))
    .actions(self => ({
        addFrame(){
            states.push(getSnapshot(self));
            currentFrame++;
        },
        addTodo(name) {
            this.addFrame();
            const index= self.todos.reduce((maxId, todo) => Math.max(todo.index,maxId),-1) + 1;
            self.todos.unshift({
                index,
                name
            });
        },
        remove(index){
            this.addFrame();
            const node = self.todos.find(todo => todo.index === index);
            self.todos.remove(node);
        },
        setFilter(filter){
            this.addFrame();
            self.filter = filter;
        },
        complete(index){
            this.addFrame();
            const node = self.todos.find(todo => todo.index === index);
            node.completed = !node.completed;
        },
        undo() {
            if (currentFrame === 0) return
            if (currentFrame === states.length) {
                states.push(getSnapshot(self));
            }
            currentFrame--;
            applySnapshot(self, states[currentFrame]);
        },
        redo() {
            if (currentFrame >= states.length-1 ) return
            currentFrame++;
            applySnapshot(self, states[currentFrame])
        }
    }));