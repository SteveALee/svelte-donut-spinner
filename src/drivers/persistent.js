import { writable } from 'svelte/store'

function read(key) {
	try {
		return JSON.parse(localStorage[key])
	} catch (e) {} // eslint-disable-line no-empty
}

function updateToNewVersion(saved, initial) {
	if (initial.version && initial.version !== saved.version) {
		const withNew = Object.entries(initial).filter(
			([k]) => k != 'version' && saved[k] === undefined,
		)
		const newValue = { ...saved, ...withNew, version: initial.version }
		return newValue
	}
	return saved
}

// if nothing saved return initial
// else if initial version is different then update the persisted value
function readOrUpdate(key, initial) {
	const saved = read(key)
	if (!saved) {
		return initial
	}
	return updateToNewVersion(saved, initial)
}

export function persistent(key, initial) {
	const store = writable(readOrUpdate(key, initial), () => {
		return store.subscribe(value => {
			localStorage[key] = JSON.stringify(value)
		})
	})

	return store
}
