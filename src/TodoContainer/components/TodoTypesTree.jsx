import React from 'react';
import {observer} from 'mobx-react';
import {Tree} from "antd";

const TreeNode = Tree.TreeNode;

const getTreeNodes = (list, pId) => {
  return list.filter(l1 => l1.pId === pId).map(l2 => {
    if (list.filter(l3 => l3.pId === l2.id).length > 0) {
      return <TreeNode key={l2.id} title={l2.name}>{getTreeNodes(list, l2.id)}</TreeNode>
    }
    return <TreeNode key={l2.id} title={l2.name} />
  })
};

const TodoTypesTree = observer(({listStore, onSelect, onExpand}) => (
  <Tree
    showLine
    showIcon={false}
    onSelect={onSelect}
    onExpand={onExpand}
    expandedKeys={listStore.expandedKeys}
  >
    {getTreeNodes(listStore.list, null)}
  </Tree>
));

export default TodoTypesTree;
