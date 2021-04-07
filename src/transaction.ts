import { Process, ProcessType } from './process'
export function transaction(): Transaction {
	return new Transaction()
}

export interface TransactionStatus {
	failedAdd?: ProcessFailure
	failedRollbacks?: ProcessFailure[]
}

export interface ProcessFailure {
	error: Error
	name?: string
}

export class Transaction {
	processes: Process[]

	constructor() {
		this.processes = [] as Process[]
	}

	add(func: () => Promise<any>): Transaction {
		this.processes.push(new Process(func, ProcessType.ADD))
		return this
	}

	rollback(func: () => Promise<any>): Transaction {
		this.processes.push(new Process(func, ProcessType.ROLLBACK))
		return this
	}

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
