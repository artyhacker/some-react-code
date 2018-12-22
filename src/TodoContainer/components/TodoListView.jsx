import {observer} from "mobx-react";
import {Checkbox} from "antd";
import React from "react";

const itemStyle = index => ({
  padding: '.2rem 0',
  backgroundColor: index % 2 === 0 ? '' : 'rgba(0,0,0,0.1)',
});

const TodoListView = observer(({TodoStore, onClickTodo}) => {
  if (TodoStore.getShowList.length === 0) {
    return <div style={{ textAlign: 'center' }}>恭喜,全部完成了!</div>
  }
  return TodoStore.getShowList.map((todo, index) => (
    <div key={todo.id} style={itemStyle(index)}>
      <Checkbox
        checked={todo.done}
        onChange={() => onClickTodo(todo)}
        style={{
          textDecorationLine: todo.done ? 'line-through' : 'none',
          color: todo.done ? '#555555' : '',
        }}
      >
        {todo.text}
      </Checkbox>
    </div>
  ));
});

export default TodoListView;