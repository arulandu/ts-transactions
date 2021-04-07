# TypeScript Transactions
<div>
  <a href="https://www.npmjs.com/package/prisma"><img src="https://img.shields.io/npm/v/ts-transactions.svg?style=flat" /></a>
  <a href="https://github.com/prisma/prisma/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" /></a>

</div>

Introducing `ts-transactions`, a functional transactions API for TypeScript.

## Usage
```typescript
import { tsts } from 'ts-transaction'
```

## Example
```typescript
tsts.transaction()
    .add(async () => {})
    .add(async () => {})
    .rollback(async () => {})

    .add(async () => {})
    .rollback(async () => {})

    .add(async () => {})
    .add(async () => {})

    .execute()
```
