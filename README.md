# TypeScript Transactions
This repository contains a functional transactions API for TypeScript. 

## Usage
```typescript
import { transaction } from './transaction'

transaction()
    .add(() => {})
    .add(() => {})
    .rollback(() => {}) // rollback for both "add's"
    .add(() => {})
    .rollback(() => {}) // rollbacks above "add"
    .add(() => {}) // has no rollback
    .add(() => {})
    .execute() // executes the transaction
```

See `/src/index.ts` for an example.
