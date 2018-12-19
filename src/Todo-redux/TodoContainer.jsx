import React, {Component} from 'react';
import * as Actions from './actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Checkbox, Radio, Button, Icon } from 'antd';

const RadioGroup = Radio.Group;

const appStyle = {
  width: '100%',
  maxHeight: 800,
  marginLeft: '.2rem',
  fontSize: 'larger',
};

const listStyle = {
  width: '100%',
  maxHeight: 500,
  overflow: 'auto',
  marginTop: '.5rem',
};

const todoItemStyle = {
  padding: '.2rem 0',
};

const propTypes = {
  fetchList: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  fetchAddTodo: PropTypes.func.isRequired,
  fetchUpdateTodo: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

class TodoContainer extends Component {
  state = {
    editText: '',
  };

  componentDidMount() {
    this.props.fetchList();
  }

  onClickFresh = () => {
    this.props.fetchList();
  };

  onClickTodo = (todo) => {
    this.props.fetchUpdateTodo({...todo, done: todo.done === 0 ? 1 : 0});
  };

  onChangeFilter = (filter) => {
    this.props.changeFilter(filter);
  };

  fetchAddTodo = () => {
    if (this.state.editText) {
      this.props.fetchAddTodo({
        text: this.state.editText,
        done: 0,
      });
      this.setState({
        editText: '',
      })
    }
  };

  getTodosView = () => {
    let list = [];
    switch (this.props.filter) {
      case 'todo':
        list = this.props.list.filter(t => !t.done);
        break;
      case 'done':
        list = this.props.list.filter(t => t.done);
        break;
      default:
        list = this.props.list;
        break;
    }
    return list.map(todo => (
      <div key={todo.id} style={todoItemStyle}>
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
  };

  render() {
    return(
      <div style={appStyle}>
        <Input
          placeholder="input & press Enter to add a todo"
          value={this.state.editText}
          onChange={e => this.setState({editText: e.target.value})}
          onPressEnter={this.fetchAddTodo}
        />
        <div style={listStyle}>
          {this.getTodosView()}
        </div>
        <div style={{margin: '.5rem'}}>
          <RadioGroup value={this.props.filter} onChange={e => this.onChangeFilter(e.target.value)}>
            <Radio value="all">ALL</Radio>
            <Radio value="todo">TODO</Radio>
            <Radio value="done">DONE</Radio>
          </RadioGroup>
          <span style={{ float: 'right' }}>
            Unfinished Count: {this.props.list.filter(t => !t.done).length}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.list,
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(Actions.fetchTodoList()),
  fetchAddTodo: todo => dispatch(Actions.fetchAddTodo(todo)),
  fetchUpdateTodo: todo => dispatch(Actions.fetchUpdateTodo(todo)),
  changeFilter: filter => dispatch(Actions.changeFilter(filter)),
});

TodoContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);