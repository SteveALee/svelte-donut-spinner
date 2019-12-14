<script>
	import { tick } from 'svelte'
	import DonutChart from './DonutChart.svelte'
	import SpinningPointer from './SpinningPointer.svelte'
	import { randomInt } from '../drivers/random.js'
	import { speak } from '../drivers/speech.js'

	let c = null
	export { c as class }
	export let id = null
	export let width = '100%'
	export let height = '100%'
	export let segments = {}
	export let options = {}
	export function startSpin() {
		handleSpin()
	}

	let selected = null
	let spinning = false

	async function handleSpin() {
		if (spinning) {
			// stop interrupting current spin as things geta bit weird
			return
		}
		spinning = true

		selected = null // reset so always announces even for same value twice
		await tick()
		selected = randomInt(0, segments.length)
	}

	function handleSpinEnd() {
		spinning = false

		const text = selected !== null ? segments[selected].text : undefined
		if (text) {
			speak(`${text}!`)
		}
	}
</script>

<DonutChart
	class={c}
	{id}
	{width}
	{height}
	let:selectedAngle
	let:spin
	{segments}
	{selected}
	options={{ gap: options.gap, strokeWidth: options.strokeWidth, wedge: options.wedge }}>
	<SpinningPointer
		spinCount={options.spinCount}
		spinTime={options.spinTime}
		rotation={selectedAngle}
		{spin}
		on:spinend={handleSpinEnd} />
</DonutChart>

<style>
	:global(#donut-chart text) {
		font-size: 0.4px;
	}
</style>
