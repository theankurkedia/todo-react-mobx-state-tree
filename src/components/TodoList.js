import React from 'react';
import { observer } from 'mobx-react';

export default observer(
    class TodoList extends React.Component{
        
        render(){
            const store = this.props.store;
            return <div>
                    <ul>
                        {store.filteredTodos.map((todo) => 
                            <div style={{ listStyleType: 'none'}} key={todo.index}>
                                <input type="checkbox" checked={todo.completed} onChange={() => store.complete(todo.index)} />
                                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    {todo.name}
                                </span>
                                <button onClick={() => store.remove(todo.index)}>x</button>
                        </div>)}
                    </ul>
                </div>;
        }
    }
)