import { Client } from '@temporalio/client';
import { rootWorkflow } from './workflows';
import { nanoid } from 'nanoid';

const genId = (base: string) => `${base}-${nanoid()}`;

async function run() {
  const client = new Client();

  const result = await client.workflow.execute(rootWorkflow, {
    taskQueue: 'node-workflows',
    workflowId: genId('root-workflow'),
    args: [{
        id: genId('root'),
        type: 'root',
        args: [3],
        children: [
            {
                id: genId('child-1'),
                type: 'add',
                args: [10],
                children: [
                    {
                        id: genId('child-1-1'),
                        type: 'add',
                        args: [10],
                        children: [
                            {
                                id: genId('child-1-1-1'),
                                type: 'clamp',
                                args: [1, 100],
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: genId('child-2'),
                type: 'add',
                args: [100],
                children: [
                    {
                        id: genId('child-2-1'),
                        type: 'add',
                        args: [10],
                        children: [
                            {
                                id: genId('child-2-1-1'),
                                type: 'power',
                                args: [2],
                                children: []
                            },
                            {
                                id: genId('child-2-1-2'),
                                type: 'power',
                                args: [10],
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: genId('child-3'),
                type: 'add',
                args: [1000],
                children: [
                    {
                        id: genId('child-3-1'),
                        type: 'add',
                        args: [10],
                        children: [
                            {
                                id: genId('child-3-1-1'),
                                type: 'add',
                                args: [10],
                                children: [
                                    {
                                        id: genId('child-3-1-1-1'),
                                        type: 'add',
                                        args: [10],
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        ]
    }],
  });

  console.log(result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});