import React from 'react';

class AddComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        }
        this.addItem = this.addItem.bind(this);
        this.changeText = this.changeText.bind(this);
    }
    changeText(event){
        this.setState({value:event.target.value});
    }
    addItem(){
        if(this.state.value!=='')
             this.props.addTodo(this.state.value);
        this.setState({value:''});
    }
    render(){
        return(
            <div>
                <h1>todos</h1>
                <input value={this.state.value} onChange={this.changeText}></input> 
                <button onClick={this.addItem} >Add</button>
            </div>
        );
    }
}

export default AddComponent;