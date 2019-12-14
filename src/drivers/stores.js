import { readable, derived } from 'svelte/store'

export const time$ = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date())
	}, 1000)

	return function stop() {
		clearInterval(interval)
	}
})

export const periodic = period =>
	readable(0, set => {
		let i = 0

		const interval = setInterval(() => {
			set(++i)
		}, period)

		return function stop() {
			clearInterval(interval)
		}
	})

export const fromEvent = (event, selector) =>
	readable(null, set => {
		const node = selector ? document.querySelector(selector) : window

		const fn = ev => {
			set(ev)
		}

		// TODO add options and useCapture
		node.addEventListener(event, fn)

		return () => {
			node.removeEventListener(event, fn)
		}
	})

export { derived }
