# Workflow Tree Execution Example

## Steps to run

1. `pnpm i` to install dependencies
2. `brew install temporal` to install the Temporal CLI
3. `temporal server start-dev` to start the Temporal server
4. `pnpm start:worker` to start the worker
5. `pnpm run:client` to run the client
6. Visit http://localhost:8233/ to view temporal workflow execution


![image](/screenshot.png)