import React from 'react';
import {Checkbox} from "antd";


function TodoListView(props) {
  const {filterText, todoList} = props;
  let list = [];
  switch (filterText) {
    case 'todo':
      list = todoList.todos.filter(t => !t.done);
      break;
    case 'done':
      list = todoList.todos.filter(t => t.done);
      break;
    default:
      list = todoList.todos;
      break;
  }
  return list.map(t => (
    <div key={t.id}>
      <Checkbox
        checked={t.done}
        onChange={() => todoList.changeState(t)}
        style={{
          textDecorationLine: t.done ? 'line-through' : 'none',
          color: t.done ? '#555555' : '',
        }}
      >
        {t.text}
      </Checkbox>
    </div>
  ));
}

export default TodoListView;