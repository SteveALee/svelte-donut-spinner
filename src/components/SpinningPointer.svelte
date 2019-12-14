<script>
	import { createEventDispatcher, beforeUpdate, afterUpdate } from 'svelte'

	export let rotation = -90
	export let spin = false
	export let spinCount = 2
	export let spinTime = 3
	export let duration

	let lastRotation
	let target = rotation
	let transform
	const duration360 = 3
	let groupElement

	const rotateTransform = rotation => `rotate(${rotation}deg)`

	beforeUpdate(() => {
		// Here as beforeUpdate called before onMount
		// Not reactive as lastRotation would cause problems
		if (lastRotation == undefined) {
			lastRotation = rotation
		}

		target = rotation < lastRotation ? rotation + 360 : rotation // so always clockwise

		if (!spin) {
			duration =
				((rotation > lastRotation
					? rotation - lastRotation
					: 360 - (lastRotation - rotation)) /
					360) *
				duration360
		} else if (spin) {
			duration = spinTime ? spinTime : duration360 * spinCount
			target += 360 * spinCount
		}
		transform = rotateTransform(target)
	})

	afterUpdate(() => {
		lastRotation = rotation
	})

	const dispatch = createEventDispatcher()
	function handleTransitionEnd() {
		if (target >= 360) {
			// Restore adjusted rotation without transition playing
			// Here as want transition to be finished before we reset transform
			groupElement.style.setProperty('transition-property', 'none')
			groupElement.style.setProperty('transition-duration', '0s')
			groupElement.style.setProperty(
				'transform',
				rotateTransform(rotation),
			)
		}

		// TODO should we make this async?
		dispatch('spinend', {
			initialRotation: lastRotation,
			finalRotation: rotation,
		})
	}
</script>

<g
	id="spinpointer"
	bind:this={groupElement}
	style={`transform: ${transform}; transition-duration: ${duration}s;`}
	on:transitionend={handleTransitionEnd}>
	<line class="second" x1="0" x2="1.3" />
	<line class="second-counterweight" x1="0" x2="-0.3" />
</g>

<style>
	#spinpointer {
		transition-property: transform;
		/*		transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);*/
		transition-timing-function: ease-out;
	}

	.second,
	.second-counterweight {
		stroke: rgb(180, 0, 0);
		stroke-width: 0.06;
	}

	.second-counterweight {
		stroke-width: 0.1;
	}
</style>
