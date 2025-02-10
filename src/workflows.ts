import { executeChild } from '@temporalio/workflow';
import { WorkflowNode, WorkflowNodeAdd, WorkflowNodeClamp, WorkflowNodeDivide, WorkflowNodeMultiply, WorkflowNodePower, WorkflowNodeSubtract } from './schema';
import { get } from 'http';

const isLeaf = (node: WorkflowNode): boolean => node.children.length === 0;
const getChildren = (node: WorkflowNode): WorkflowNode[] => node.children;
const executeChildren = (children: WorkflowNode[], currentValue: number) => Promise.all(children.map(async (child) => {
  switch (child.type) {
    case 'add':
      return executeChild(addWorkflow, {
        args: [currentValue, child]
      });
    case 'power':
      return executeChild(powerWorkflow, {
        args: [currentValue, child]
      });
    case 'clamp':
      return executeChild(clampWorkflow, {
        args: [currentValue, child]
      });
    default:
      throw new Error('Unknown node type');
  }
}));

export async function rootWorkflow(node: WorkflowNode): Promise<void> {
  const rootValue = node.args[0];

  if (isLeaf(node)) {
    console.log(`Leaf node ${node.id} with value ${rootValue}`);
    return void 0;
  };

  await executeChildren(getChildren(node), rootValue);

  return void 0;
}

export const addWorkflow = async (parentValue: number, node: WorkflowNodeAdd & { id: string; children: WorkflowNode[] }): Promise<void> => {
  const newValue = parentValue + node.args[0]; // addActivity

  if (isLeaf(node)) {
    console.log(`Leaf node ${node.id} with value ${newValue}`);
    return void 0;
  };

  await executeChildren(getChildren(node), newValue);

  return void 0
};

export const powerWorkflow = async (parentValue: number, node: WorkflowNodePower & { id: string; children: WorkflowNode[] }): Promise<void> => {
  const newValue = Math.pow(parentValue, node.args[0]); // powerActivity

  if (isLeaf(node)) {
    console.log(`Leaf node ${node.id} with value ${newValue}`);
    return void 0;
  };

  await executeChildren(getChildren(node), newValue);

  return void 0
};

export const clampWorkflow = async (parentValue: number, node: WorkflowNodeClamp & { id: string; children: WorkflowNode[] }): Promise<void> => {
  const min = node.args[0];
  const max = node.args[1];
  const newValue = Math.min(Math.max(parentValue, min), max) // clampActivity


  if (isLeaf(node)) {
    console.log(`Leaf node ${node.id} with value ${newValue}`);
    return void 0;
  };

  await executeChildren(getChildren(node), newValue);

  return void 0
};

