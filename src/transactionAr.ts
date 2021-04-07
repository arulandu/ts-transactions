export class TransactionElement {
	process: () => void
	rollback?: () => void
}

export function transaction(elements: TransactionElement[]) {
	let stopInd = -1
	for (let i = 0; i < elements.length; i++) {
		try {
			elements[i].process()
		} catch {
			stopInd = i - 1
			break
		}
	}

	if (stopInd == -1) return
	for (let i = stopInd; i >= 0; i--) {
		if (elements[i].rollback) {
			elements[i].rollback()
		} else {
			continue
		}
	}
}
