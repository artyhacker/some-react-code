import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {decorate, observable} from 'mobx';
import {Button, Popconfirm, Icon} from 'antd';
import TodoTypesTree from './TodoTypesTree';
import TodoTypeEditModal from './TodoTypeEditModal';

const ButtonGroup = Button.Group;

const TodoTypes = observer(class TodoTypes extends Component {

  modalVisible = false;

  componentDidMount() {
    this.props.TypeStore.fetchTypes();
  }

  onSelect = (keys, e) => {
    if (e.selected) {
      const item = this.props.TypeStore.list.filter(t => t.id === parseInt(keys[0], 10))[0];
      this.props.TodoStore.fetchList({typeId: item.id});
      this.props.TypeStore.selectedItem = item;
    } else {
      this.props.TypeStore.selectedItem = {};
    }
  };
  
  onExpand = (keys) => {
    this.props.TypeStore.expandedKeys = keys;
  };

  onClickAdd = () => {
    this.props.TypeStore.editItem = {};
    this.modalVisible = true;
  };

  onClickEdit = () => {
    this.props.TypeStore.editItem = {...this.props.TypeStore.selectedItem};
    this.modalVisible = true;
  };

  onClickDelete = () => {
    this.props.TypeStore.fetchDeleteType(this.props.TypeStore.selectedItem);
  };

  onOk = () => {
    if (this.props.TypeStore.editItem.id) {
      // edit
      this.props.TypeStore.fetchUpdateType(this.props.TypeStore.editItem);
    } else {
      // add
      this.props.TypeStore.fetchAddType({
        ...this.props.TypeStore.editItem,
        pId: this.props.TypeStore.selectedItem.id,
        layer: this.props.TypeStore.selectedItem.layer + 1,
      });
    }
    this.onCancel();
  };

  onCancel = () => {
    this.props.TypeStore.editItem = {};
    this.modalVisible = false;
  };

  setName = e => {
    this.props.TypeStore.editItem.name = e.target.value;
  };

  render() {
    return (
      <div>
        <div style={{textAlign: 'center', marginBottom: '.5rem'}}>
          <ButtonGroup>
            <Button
              type="primary"
              onClick={this.onClickAdd}
              title={this.props.TypeStore.selectedItem.id ? '添加子类' : '添加类别'}
            >
              <Icon type={this.props.TypeStore.selectedItem.id ? 'share-alt' : 'plus'} />
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={this.onClickDelete}
            >
              <Button disabled={!this.props.TypeStore.selectedItem.id} title="删除类别"><Icon type="delete"/></Button>
            </Popconfirm>
            <Button
              type="primary"
              onClick={this.onClickEdit}
              disabled={!this.props.TypeStore.selectedItem.id}
              title="编辑名称"
            ><Icon type="edit"/></Button>
          </ButtonGroup>
        </div>
        <TodoTypesTree
          listStore={this.props.TypeStore}
          onSelect={this.onSelect}
          onExpand={this.onExpand}
        />
        <TodoTypeEditModal
          visible={this.modalVisible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          TypeStore={this.props.TypeStore}
          setName={this.setName}
        />
      </div>
    );
  }
});

decorate(TodoTypes, {
  modalVisible: observable,
});

export default TodoTypes;
