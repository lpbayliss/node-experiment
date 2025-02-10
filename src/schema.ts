export type WorkflowNodeRoot = {
    type: 'root';
    args: [number];
}

export type WorkflowNodeAdd = {
    type: 'add';
    args: [number];
}

export type WorkflowNodeSubtract = {
    type: 'subtract';
    args: [number];
}

export type WorkflowNodeMultiply = {
    type: 'multiply';
    args: [number];
}

export type WorkflowNodeDivide = {
    type: 'divide'; 
    args: [number];
}

export type WorkflowNodeClamp = {
    type: 'clamp';
    args: [number, number];
}

export type WorkflowNodePower = {
    type: 'power';
    args: [number];
}

export type WorkflowNode = 
    (
        WorkflowNodeRoot |
        WorkflowNodeAdd |
        WorkflowNodeSubtract |
        WorkflowNodeMultiply |
        WorkflowNodeDivide |
        WorkflowNodePower |
        WorkflowNodeClamp
    )
    & { id: string; children: WorkflowNode[] };