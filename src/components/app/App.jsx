import React, {Component} from 'react';

import AppHeader from '../app-header/AppHeader';
import SearchPanel from '../search-panel/SearchPanel';
import TodoList from '../todo-list/TodoList';
import ItemStatusFilter from '../item-status-filter/ItemStatusFilter';
import ItemAddForm from '../item-add-form/ItemAddForm';

import './App.css'

export default class App extends Component {

  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  }

  createTodoItem(label) { 
    return {
      label, 
      important: false,
      done: false, 
      id: this.maxId++
    } 
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const ind = todoData.findIndex((elem) => elem.id === id);
      const before = todoData.slice(0, ind);
      const after = todoData.slice(ind + 1);
      const newArray = [...before, ...after];
      return {
        todoData: newArray
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoData}) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  }

  // onToggleProperty(arr, id, propName) {
  //   const ind = arr.findIndex((elem) => elem.id === id);
  //   const oldItem = arr[ind];
  //   const newItem = {...oldItem, [propName]: !oldItem[propName]};
  //   const before = arr.slice(0, ind);
  //   const after = arr.slice(ind + 1);
  //   const newArray = [...before, newItem, ...after];
  //   return {
  //     newArray
  //   }
  // }

  // onToggleImportant = (id) => {
  //   this.setState(({todoData}) => {
  //     return {
  //       todoData: this.onToggleProperty(todoData, id, 'important')
  //     }
  //   })
  // }

  // onToggleDone = (id) => {
  //   this.setState(({todoData}) => {
  //     return {
  //       todoData: this.onToggleProperty(todoData, id, 'done')
  //     }
  //   })
  // }

// -----------DRY-----------
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      const ind = todoData.findIndex((elem) => elem.id ===id);
      const oldItem = todoData[ind];
      const newItem = {...oldItem, important: !oldItem.important};
      const before = todoData.slice(0, ind);
      const after = todoData.slice(ind + 1);
      const newArray = [...before, newItem, ...after];
      return {
        todoData: newArray
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      const ind = todoData.findIndex((elem) => elem.id ===id);
      const oldItem = todoData[ind];
      const newItem = {...oldItem, done: !oldItem.done};
      const before = todoData.slice(0, ind);
      const after = todoData.slice(ind + 1);
      const newArray = [...before, newItem, ...after];
      return {
        todoData: newArray
      }
    })
  }
// -------------------------------

  render() {
    const {todoData} = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList todos={todoData}
                  onDeleted={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleDone={this.onToggleDone} />
        <ItemAddForm addItem={this.addItem}/>
      </div>
    );
  }
};