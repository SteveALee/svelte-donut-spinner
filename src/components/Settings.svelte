<script context="module">
	import { persistent } from '../drivers/persistent.js'

	const defaultSettings = {
		version: 1,
		numSegments: 6,
		showHeader: true,
		header: 'Do you feel lucky?',
		spinCount: 4,
		spinTime: 5,
	}

	export const settingsStore = persistent('settings', defaultSettings)
</script>

<label>
	Header:
	<input type="checkbox" bind:checked={$settingsStore.showHeader} />
	<input bind:value={$settingsStore.header} />

</label>

<label>
	Segments:
	<span>{$settingsStore.numSegments}</span>
	<input
		type="range"
		bind:value={$settingsStore.numSegments}
		min="2"
		max="12" />
</label>

<label>
	Spin Count:
	<span>{$settingsStore.spinCount}</span>
	<input
		type="range"
		bind:value={$settingsStore.spinCount}
		min="1"
		max="10" />
</label>

<label>
	Spin Time:
	<span>{$settingsStore.spinTime}</span>
	<input type="range" bind:value={$settingsStore.spinTime} min="1" max="10" />
</label>

<style>
	label {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
