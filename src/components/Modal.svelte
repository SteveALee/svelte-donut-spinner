<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const close = () => dispatch('close')

	let modal

	const keydown = e => {
		if (e.key === 'Escape') {
			close()
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*')
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0)

			let index = tabbable.indexOf(document.activeElement)
			if (index === -1 && e.shiftKey) index = 0

			index += tabbable.length + (e.shiftKey ? -1 : 1)
			index %= tabbable.length

			tabbable[index].focus()
			e.preventDefault()
		}
	}

	const previously_focused =
		typeof document !== 'undefined' && document.activeElement
	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus()
		})
	}

	let closeButton
	onMount(() => {
		closeButton.focus()
	})
</script>

<div class="modal-background" on:click={close} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<slot name="header" />
	<hr />
	<slot />
	<hr />

	<button on:click={close} bind:this={closeButton}>Close</button>
</div>

<svelte:window on:keydown={keydown} />

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.5em;
		background: white;
	}

	button {
		display: block;
	}
</style>
