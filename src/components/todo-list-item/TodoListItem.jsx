import React, { Component } from 'react';

import './TodoListItem.css';

export default class TodoListItem extends Component {

  render() {
    const {label, onDeleted, onToggleImportant, onToggleDone, done, important} = this.props;

    let liClassNames = 'todo-list-item app-list-item d-flex justify-content-between';

    if (done) {
      liClassNames += ' done';
    }

    if (important) {
      liClassNames += ' text-warning fw-bold'
    }

    return (
      <span className={liClassNames}>
        
        <span
          onClick={onToggleDone}
          className="todo-list-item-label">
          {label}
        </span>
  
        <div className='d-flex justify-content-center align-items-center'>
            <button type="button"
                    onClick={onToggleImportant}
                    className="btn btn-outline-success btn-sm">
              <i className="fa fa-exclamation" />
            </button>
  
            <button type="button"
                    onClick={onDeleted}
                    className="btn btn-outline-danger btn-sm">
              <i className="fa fa-trash" />
            </button>
        </div>
        
      </span>
    );
  }
}
