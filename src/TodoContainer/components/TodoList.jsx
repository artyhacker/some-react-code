import React, {Component} from 'react';
import { Input, Radio } from 'antd';
import {observer} from "mobx-react";
import {decorate, observable} from "mobx";
import TodoListView from './TodoListView';

const RadioGroup = Radio.Group;

const appStyle = {
  width: '100%',
  maxHeight: 800,
  marginLeft: '.2rem',
  fontSize: 'larger',
};

const listStyle = {
  width: '100%',
  maxHeight: 740,
  overflow: 'auto',
  marginTop: '.5rem',
};

const TodoList = observer(class TodoList extends Component {
  editText = '';
  TodoStore = this.props.TodoStore;

  componentDidMount() {
    this.TodoStore.fetchList();
  }

  onClickTodo = (todo) => {
    this.TodoStore.fetchUpdate({...todo, done: todo.done === 0 ? 1 : 0});
  };

  onChangeFilter = e => {
    this.TodoStore.filter = e.target.value;
  };

  fetchAdd = () => {
    if (this.editText) {
      this.TodoStore.fetchAdd({
        text: this.editText,
        done: 0,
        typeId: this.props.TypeStore.selectedItem.id,
      });
      this.editText = '';
    }
  };

  // getTodosView = () => {
  //   if (this.TodoStore.getShowList.length === 0) {
  //     return <div style={{ textAlign: 'center' }}>恭喜,全部完成了!</div>
  //   }
  //   return this.TodoStore.getShowList.map(todo => (
  //     <div key={todo.id} style={todoItemStyle}>
  //       <Checkbox
  //         checked={todo.done}
  //         onChange={() => this.onClickTodo(todo)}
  //         style={{
  //           textDecorationLine: todo.done ? 'line-through' : 'none',
  //           color: todo.done ? '#555555' : '',
  //         }}
  //       >
  //         {todo.text}
  //       </Checkbox>
  //     </div>
  //   ));
  // };

  changeEditText = e => {
    this.editText = e.target.value;
  };

  render() {
    return(
      <div style={appStyle}>
        <Input
          placeholder={this.props.TypeStore.selectedItem.id ? '点击回车添加待完成项' : '请先选择类别'}
          value={this.editText}
          onChange={this.changeEditText}
          onPressEnter={this.fetchAdd}
          readOnly={!this.props.TypeStore.selectedItem.id}
        />
        <div style={listStyle}>
          <TodoListView TodoStore={this.props.TodoStore} onClickTodo={this.onClickTodo} />
        </div>
        <div style={{margin: '.5rem'}}>
          <RadioGroup value={this.TodoStore.filter} onChange={this.onChangeFilter}>
            <Radio value="TODO">待完成</Radio>
            <Radio value="DONE">已完成</Radio>
            <Radio value="ALL">全部</Radio>
          </RadioGroup>
          <span style={{ float: 'right' }}>
            待完成事务: {this.TodoStore.getUnfinishedCount}
          </span>
        </div>
      </div>
    );
  }
});

decorate(TodoList, {
  editText: observable,
});

export default TodoList;
