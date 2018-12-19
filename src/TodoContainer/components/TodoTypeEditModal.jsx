import React from 'react';
import {observer} from 'mobx-react';
import {Modal, Form, Input} from 'antd';

const FormItem = Form.Item;
const formItemStyle = {
  labelCol: {span: 6},
  wrapperCol: {span: 16}
};

const TodoTypeEditModal = observer(({visible, onOk, onCancel, TypeStore, setName}) => (
  <Modal
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    width={500}
    title={TypeStore.editItem.id ? '编辑' : '新增'}
  >
    <Form>
      <FormItem
        {...formItemStyle}
        label="名称"
      >
        <Input value={TypeStore.editItem.name} onChange={setName} />
      </FormItem>
    </Form>
  </Modal>
));

export default TodoTypeEditModal;
