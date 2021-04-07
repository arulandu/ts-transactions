# TypeScript Transactions
This repository contains a functional transactions API for TypeScript. 

## Usage
```typescript
import { tsts } from 'ts-transaction'

tsts.transaction()
    .add(async () => {})
    .add(async () => {})
    .rollback(async () => {}) // rollback for both "add's"
    .add(async () => {})
    .rollback(async () => {}) // rollbacks above "add"
    .add(async () => {}) // has no rollback
    .add(async () => {})
    .execute() // executes the transaction
```

## Running
To build to js, `npm run build:dev`. To run, `npm run run`.
