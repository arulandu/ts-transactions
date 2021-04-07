import { transaction } from './transaction'

async function main() {
	let x = 0
	const res = await transaction()
		.add(async () => {
			console.log('p1')
			x++
			console.log('x: ', x)
		})
		.rollback(async () => {
			console.log('rp1')
		})
		.add(async () => {
			console.log('p2')
			x++
			console.log('x: ', x)
		})
		.rollback(async () => {
			console.log('rp2')
		})
		.add(async () => {
			console.log('p3')
			throw Error('p3 error')
		})
		.rollback(async () => {
			console.log('rp3')
		})
		.execute()

	return res
}

main().then((val) => {
	console.log(val)
})
