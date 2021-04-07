import { Transaction } from './transaction'

const transaction = new Transaction()
let x = 0
transaction
	.add(() => {
		console.log('p1')
		x++
		console.log('x: ', x)
	})
	.rollback(() => {
		console.log('rp1')
	})
	.add(() => {
		console.log('p2')
		x++
		console.log('x: ', x)
	})
	.rollback(() => {
		console.log('rp2')
	})
	.add(() => {
		console.log('p3')
		throw Error('p3 error')
	})
	.rollback(() => {
		console.log('rp3')
	})
	.execute()
