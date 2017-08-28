import React from 'react';
import { observer } from 'mobx-react';

export default observer(
    class Footer extends React.Component{
        render(){
            const store = this.props.store;
            return(
                <div>
                <p>
                    <a href='#' onClick={e=> {
                        e.preventDefault() 
                        this.props.store.setFilter('SHOW_ALL');
                    }}> ALL </a>
                    {', '}
                    <a href='#' onClick={e=> {
                        e.preventDefault() 
                        this.props.store.setFilter('SHOW_ACTIVE');
                    }}> ACTIVE </a>
                    {', '}
                    <a href='#' onClick={e=> {
                        e.preventDefault() 
                        this.props.store.setFilter('SHOW_COMPLETED');
                    }}> COMPLETED </a>
                </p>
                <p>
                    <span> Completed: {store.completedCount} </span>
                        <span> Left: {store.activeCount} </span>
                </p>
                <button onClick={()=> store.undo()}>Undo</button>
                <button onClick={()=> store.redo()}>Redo</button>
            </div>
            );
        }
    }
)