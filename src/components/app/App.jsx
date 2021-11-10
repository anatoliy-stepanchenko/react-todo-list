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
    ],
    term: '',
    filter: 'all' // all, active, done
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
      return {todoData: todoData.filter((elem) => elem.id !== id)};
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoData}) => {
      if (newItem.label != 0) {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr
        };
      } 
    });
  }

  onToggleProperty(arr, id, propName) {
    const ind = arr.findIndex((elem) => elem.id === id);
    const oldItem = arr[ind];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    const before = arr.slice(0, ind);
    const after = arr.slice(ind + 1);
    const newArray = [...before, newItem, ...after];
    return newArray;
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.onToggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.onToggleProperty(todoData, id, 'done')
      }
    })
  }

  search(items, term) {
    if (term == 0) {
      return items
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onSearchChenge = (term) => {
    this.setState({term});
  }

  onFilterChenge = (filter) => {
    this.setState({filter});
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done );
      case 'done':
        return items.filter((item) => item.done);
      default: 
        return items;
    }
  }

  render() {
    const {todoData, term, filter} = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChenge={this.onSearchChenge}/>
          <ItemStatusFilter 
            filter={filter} 
            onFilterChenge={this.onFilterChenge} />
        </div>
  
        <TodoList todos={visibleItems}
                  onDeleted={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleDone={this.onToggleDone} />
        <ItemAddForm addItem={this.addItem}/>
      </div>
    );
  }
};