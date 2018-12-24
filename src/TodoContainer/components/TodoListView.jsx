import {observer} from "mobx-react";
import {Checkbox, Icon} from "antd";
import React from "react";
import moment from 'moment';

const itemStyle = index => ({
  padding: '.2rem 0',
  backgroundColor: index % 2 === 0 ? '' : 'rgba(0,0,0,0.1)',
});
const timeStyle = {
  color: '#b2b2b2',
  marginLeft: '1rem',
  fontSize: 'smaller',
  textDecorationLine: 'none',
};

const getText = todo => {
  const dateText = todo.done ?
    `完成于 ${moment(todo.completeTime).format('MM-DD HH:mm')}` :
    `创建于 ${moment(todo.createTime).format('MM-DD HH:mm')}`;
  return <span>
    <span style={{ textDecorationLine: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
    <span style={timeStyle}>{dateText}</span>
  </span>;
};

const TodoListView = observer(({TodoStore, onClickTodo}) => {
  if (TodoStore.getShowList.length === 0) {
    return <div style={{ textAlign: 'center' }}>恭喜,全部完成了!</div>
  }
  return TodoStore.getShowList.map((todo, index) => (
    <div key={todo.id} style={itemStyle(index)}>
      <Checkbox
        checked={todo.done}
        onChange={() => onClickTodo(todo)}
      >
        {getText(todo)}
      </Checkbox>
      <span onClick={() => TodoStore.fetchDelete(todo)} style={{ color: '#b2b2b2' }}>
        <Icon type="delete" />
      </span>
    </div>
  ));
});

export default TodoListView;