import React, {Component} from 'react';
import * as Actions from './actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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

const propTypes = {
  list: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

class TodoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: '',
    };
    this.addTodo = this.addTodo.bind(this);
    this.onClickTodo = this.onClickTodo.bind(this);
    this.getTodosView = this.getTodosView.bind(this);
  }

  onClickTodo(todo) {
    this.props.changeStatus(todo);
  }

  onChangeFilter(filter) {
    this.props.changeFilter(filter);
  }

  addTodo() {
    if (this.state.editText) {
      this.props.addTodo(this.state.editText);
      this.setState({
        editText: '',
      })
    }
  }

  getTodosView() {
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

  render() {
    return(
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
          <RadioGroup value={this.props.filter} onChange={e => this.onChangeFilter(e.target.value)}>
            <Radio value="all">ALL</Radio>
            <Radio value="todo">TODO</Radio>
            <Radio value="done">DONE</Radio>
          </RadioGroup>
        </div>
        <div>
          Unfinished Count: {this.props.list.filter(t => !t.done).length}
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
  addTodo: text => dispatch(Actions.addTodo(text)),
  changeStatus: todo => dispatch(Actions.changeStatus(todo)),
  changeFilter: filter => dispatch(Actions.changeFilter(filter)),
});

TodoContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);