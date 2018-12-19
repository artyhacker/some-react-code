import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {decorate, observable} from 'mobx';
import {Button, Popconfirm, Icon} from 'antd';
import TypeStore from '../stores/TypeStore';
import TodoTypesTree from './TodoTypesTree';
import TodoTypeEditModal from './TodoTypeEditModal';

const ButtonGroup = Button.Group;

const TodoTypes = observer(class TodoTypes extends Component {

  modalVisible = false;

  componentDidMount() {
    TypeStore.fetchTypes();
  }

  onSelect = (keys, e) => {
    if (e.selected) {
      const item = TypeStore.list.filter(t => t.id === parseInt(keys[0], 10))[0];
      console.log(item);
      TypeStore.selectedItem = item;
    } else {
      TypeStore.selectedItem = {};
    }
  };

  onClickAdd = () => {
    TypeStore.editItem = {};
    this.modalVisible = true;
  };

  onClickEdit = () => {
    TypeStore.editItem = {...TypeStore.selectedItem};
    this.modalVisible = true;
  };

  onClickDelete = () => {
    TypeStore.fetchDeleteType(TypeStore.selectedItem);
  };

  onOk = () => {
    if (TypeStore.editItem.id) {
      // edit
      TypeStore.fetchUpdateType(TypeStore.editItem);
    } else {
      // add
      TypeStore.fetchAddType({
        ...TypeStore.editItem,
        pId: TypeStore.selectedItem.id,
        layer: TypeStore.selectedItem.layer + 1,
      });
    }
    this.onCancel();
  };

  onCancel = () => {
    TypeStore.editItem = {};
    this.modalVisible = false;
  };

  setName = e => {
    TypeStore.editItem.name = e.target.value;
  };

  render() {
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <ButtonGroup>
            <Button type="primary" onClick={this.onClickAdd}>
              <Icon type={TypeStore.selectedItem.id ? 'share-alt' : 'plus'} />
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={this.onClickDelete}
            >
              <Button disabled={!TypeStore.selectedItem.id}><Icon type="delete"/></Button>
            </Popconfirm>
            <Button
              type="primary"
              onClick={this.onClickEdit}
              disabled={!TypeStore.selectedItem.id}
            ><Icon type="edit"/></Button>
          </ButtonGroup>
        </div>
        <TodoTypesTree
          listStore={TypeStore}
          onSelect={this.onSelect}
        />
        <TodoTypeEditModal
          visible={this.modalVisible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          TypeStore={TypeStore}
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
