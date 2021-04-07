export function transaction(): Transaction {
	return new Transaction()
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

	async execute(): Promise<any> {
		let rollbackInd = -1
		for (let i = 0; i < this.processes.length; i++) {
			const process = this.processes[i]
			if (process.type == ProcessType.ADD) {
				try {
					await process.func()
				} catch {
					rollbackInd = i - 1
					break
				}
			}
		}

		if (rollbackInd == -1) return true

		for (let i = rollbackInd; i >= 0; i--) {
			const process = this.processes[i]
			if (process.type == ProcessType.ROLLBACK) {
				try {
					await process.func()
				} catch {
					console.log(
						'ERROR: could not run rollback. continuing with other rollbacks.',
					)
				}
			}
		}

		return false
	}
}

export enum ProcessType {
	ROLLBACK,
	ADD,
}

export class Process {
	type: ProcessType
	func: () => Promise<any>

	constructor(func: () => Promise<any>, type: ProcessType) {
		this.type = type
		this.func = func
	}
}
