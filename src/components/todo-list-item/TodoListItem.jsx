import React, { Component } from 'react';

import './TodoListItem.css';

export default class TodoListItem extends Component {
  render() {
    const { label, important = false } = this.props;
    const style = {
      color: important ? 'steelblue' : 'black',
      fontWeight: important ? 'bold' : 'normal'
    };
  
    return (
      <span className="todo-list-item app-list-item d-flex justify-content-between">
        
        <span
          className="todo-list-item-label"
          style={style}>
          {label}
        </span>
  
        <div className='d-flex justify-content-center align-items-center'>
            <button type="button"
                    className="btn btn-outline-success btn-sm">
              <i className="fa fa-exclamation" />
            </button>
  
            <button type="button"
                    className="btn btn-outline-danger btn-sm">
              <i className="fa fa-trash" />
            </button>
        </div>
        
      </span>
    );
  }
}
