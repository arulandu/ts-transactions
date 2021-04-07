export enum ProcessType {
	ROLLBACK,
	ADD,
}

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
