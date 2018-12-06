import React, {Component} from 'react';
import { Input, Checkbox, Radio } from 'antd';

const RadioGroup = Radio.Group;

const appStyle = {
  width: 600,
  maxHeight: 800,
  margin: '1rem auto',
};

const listStyle = {
  width: '100%',
  maxHeight: 500,
  overflow: 'auto',
  marginTop: '.5rem',
};

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      editText: '',
      filter: 'all',
      showCount: 0,
    };
    this.addTodo = this.addTodo.bind(this);
    this.onClickTodo = this.onClickTodo.bind(this);
    this.getTodosView = this.getTodosView.bind(this);
  }

  onClickTodo(todo) {
    this.setState({
      list: this.state.list.map(t => {
        if (t.id === todo.id) {
          return {
            ...t,
            done: !t.done,
          };
        }
        return t;
      }),
    });
  }

  onChangeFilter(filter) {
    this.setState({filter});
  }

  addTodo() {
    if (this.state.editText) {
      this.setState({
        list: [
          {
            id: Math.random(),
            text: this.state.editText,
            done: false,
          },
          ...this.state.list,
        ],
        editText: '',
      })
    }
  }

  getTodosView() {
    let list = [];
    switch (this.state.filter) {
      case 'todo':
        list = this.state.list.filter(t => !t.done);
        break;
      case 'done':
        list = this.state.list.filter(t => t.done);
        break;
      default:
        list = this.state.list;
        break;
    }
    return list.map(todo => (
      <div key={todo.id}>
        <Checkbox
          checked={todo.done}
          onChange={() => this.onClickTodo(todo)}
          style={{
            textDecorationLine: todo.done ? 'line-through' : 'none',
            color: todo.done ? '#555555' : '',
          }}
        >
          {todo.text}
        </Checkbox>
      </div>
    ));
  }

  getShowCount() {
    switch (this.state.filter) {
      case 'todo':
        return this.state.list.filter(t => !t.done).length;
      case 'done':
        return this.state.list.filter(t => t.done).length;
      default:
        return this.state.list.length;
    }
  }

  render() {
    return (
      <div style={appStyle}>
        <Input
          placeholder="input & press Enter to add a todo"
          value={this.state.editText}
          onChange={e => this.setState({editText: e.target.value})}
          onPressEnter={this.addTodo}
          style={{ width: '98%' }}
        />
        <div style={listStyle}>
          {this.getTodosView()}
        </div>
        <div style={{marginTop: '.5rem'}}>
          <RadioGroup value={this.state.filter} onChange={e => this.onChangeFilter(e.target.value)}>
            <Radio value="all">ALL</Radio>
            <Radio value="todo">TODO</Radio>
            <Radio value="done">DONE</Radio>
          </RadioGroup>
        </div>
        <div>
          Count: {this.getShowCount()}
        </div>
      </div>
    );
  }
}

export default Todo;
