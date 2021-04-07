/**
 * Stores the types of Processes: Rollbacks and Adds
 */
export enum ProcessType {
	ROLLBACK,
	ADD,
}

/**
 * A general process for both rollbacks and adds
 */
export class Process {
	type: ProcessType
	func: () => Promise<any>
	name?: string

	constructor(func: () => Promise<any>, type: ProcessType, name?: string) {
		this.type = type
		this.func = func
		this.name = name
	}
}
