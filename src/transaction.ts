import { Process, ProcessType } from './process'

/**
 * Exposes the root transaction functionally.
 * @returns a new Transaction
 */
export function transaction(): Transaction {
	return new Transaction()
}

/**
 * Contains any process failures from the transaction.
 */
export interface TransactionStatus {
	failedAdd?: ProcessFailure
	failedRollbacks?: ProcessFailure[]
}

/**
 * Contains the name of the process and the error that occurred.
 */
export interface ProcessFailure {
	error: Error
	name?: string
}

/**
 * Exposes a functional transaction API.
 */
export class Transaction {
	processes: Process[]

	constructor() {
		this.processes = [] as Process[]
	}

	/**
	 * Add a process to the transaction
	 * @param func the process function
	 * @returns a modified Transaction
	 */
	add(func: () => Promise<any>): Transaction {
		this.processes.push(new Process(func, ProcessType.ADD))
		return this
	}

	/**
	 * Adds a rollback process to the transaction
	 * @param func is the rollback function. This should rollback all "add" processes up till the previous rollback
	 * @returns a modified Transaction
	 */
	rollback(func: () => Promise<any>): Transaction {
		this.processes.push(new Process(func, ProcessType.ROLLBACK))
		return this
	}

	/**
	 * Executes the transaction asynchronously.
	 * @returns Returns a promise containing information about failed rollback/add processes.
	 */
	async execute(): Promise<TransactionStatus> {
		const status: TransactionStatus = {}

		let rollbackInd = -1
		for (let i = 0; i < this.processes.length; i++) {
			const process = this.processes[i]
			if (process.type == ProcessType.ADD) {
				try {
					await process.func()
				} catch (e) {
					status.failedAdd = {
						error: e,
						name: process.name ? process.name : 'not specified',
					}
					rollbackInd = i - 1
					break
				}
			}
		}

		if (rollbackInd != -1) {
			for (let i = rollbackInd; i >= 0; i--) {
				const process = this.processes[i]
				if (process.type == ProcessType.ROLLBACK) {
					try {
						await process.func()
					} catch (e) {
						if (!status.failedRollbacks) status.failedRollbacks = []
						status.failedRollbacks.push({
							name: process.name ? process.name : 'not specified',
							error: e,
						})
					}
				}
			}
		}

		return status
	}
}
