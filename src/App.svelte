<script>
	import { onMount } from 'svelte'
	import Spinner from './components/Spinner.svelte'
	import Modal from './components/Modal.svelte'
	import Settings, { settingsStore } from './components/Settings.svelte'

	function mkSegments(nSegments) {
		const colour1 = 'lightblue'
		const colour2 = 'deepskyblue'
		const segments = Array.from({ length: nSegments }, (_, i) => ({
			value: 1,
			colour: i % 2 ? colour1 : colour2,
			text: (i + 1).toString(),
		}))
		return segments
	}

	$: segments = mkSegments($settingsStore.numSegments)

	let showHelp = false
	let showSettings = false
	let spinner

	const gridClass = (settings, header) =>
		`grid-${settings ? '' : 'no-'}settings-${header ? '' : 'no-'}header`

	let spinButton
	onMount(() => {
		spinButton.focus()
	})

	const keydown = e => {
		if (e.key === 'Escape') {
			showSettings = false
		}
	}
</script>

<div id="wrapper" class={gridClass(showSettings, $settingsStore.showHeader)}>
	{#if $settingsStore.showHeader}
		<h1 id="header">
			<span>&nbsp;</span>
			<span>{$settingsStore.header}</span>
		</h1>
	{/if}
	{#if showSettings}
		<div id="settings">
			<div id="settings-header">
				<h2>Settings</h2>
				<button
					id="close-settings-btn"
					class="button"
					on:click={() => {
						showSettings = false
					}}>
					Close
				</button>
			</div>
			<Settings />
		</div>
	{/if}

	<Spinner
		width="100%"
		height="100%"
		{segments}
		options={{ gap: 0.002, strokeWidth: 1, wedge: false, spinCount: $settingsStore.spinCount, spinTime: $settingsStore.spinTime }}
		bind:this={spinner} />
</div>

{#if !showSettings}
	<button
		accesskey="t"
		id="settings-btn"
		class="button"
		on:click={() => {
			showSettings = true
		}}>
		Settings
	</button>
{/if}

<button
	accesskey="h"
	id="help-btn"
	class="button"
	on:click={() => {
		showHelp = true
	}}>
	Help
</button>

{#if showHelp}
	<Modal on:close={() => (showHelp = false)}>
		<h2 slot="header">Spinner Help</h2>
		<p>This random selection spinner is designed to be inclusive.</p>
		<ul>
			<li>
				Click or touch the 'Spin' button'. Use the SPACE or ENTER key;
			</li>
			<li>
				Access keys: s - spin, h - help & t - settings (In Firefox and
				Chrome use Alt + Shift + key, on other browsers use Alt + Shift
				+ key).
			</li>
			<li>Both see and hear the random selection.</li>
		</ul>
		<p>
			Settings are saved in the web browser's storage, until you delete
			it.
		</p>
	</Modal>
{/if}

<button
	accesskey="s"
	id="spin"
	on:click={() => {
		spinner.startSpin()
	}}
	bind:this={spinButton}>
	Spin
</button>

<a id="netlify" href="https://www.netlify.com">
	<img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" />
</a>

<svelte:window on:keydown={keydown} />

<style>
	:global(body) {
		margin: 0;
		background-color: #fffef5;
	}
	#wrapper {
		display: grid;
		width: 100%;
		height: 99vh;
	}
	.foo {
		grid-template-rows: 0.15fr 1fr;
		grid-template-columns: 1fr;
		grid-template-areas:
			'header'
			'spinner';
	}
	.grid-settings-header {
		grid-template-rows: 0.15fr 1fr;
		grid-template-columns: 1fr 2fr;
		grid-template-areas:
			'header header'
			'settings spinner';
	}
	:global(.grid-no-settings-header) {
		grid-template-rows: 0.15fr 1fr;
		grid-template-columns: 1fr;
		grid-template-areas:
			'header'
			'spinner';
	}
	.grid-settings-no-header {
		grid-template-rows: 1fr;
		grid-template-columns: 1fr 2fr;
		grid-template-areas: 'settings spinner';
	}
	.grid-no-settings-no-header {
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
		grid-template-areas: 'spinner';
	}
	#header {
		grid-area: header;
		display: flex;
		justify-content: center;
		margin: 1vh;
		border: 0.3rem darkRed solid;
		border-radius: 2rem;
		background-color: #fff2f2;
		color: darkRed;
	}
	#header span {
		align-self: center;
	}

	#settings {
		grid-area: settings;
		display: flex;
		flex-direction: column;
		margin: 1vh;
		padding: 1rem;
		border: 0.3rem darkRed solid;
		border-radius: 2rem;
		color: darkRed;
		background-color: #fff2f2;
	}
	#settings-btn {
		position: absolute;
		left: 2%;
		top: 15%;
	}
	#help-btn {
		position: absolute;
		right: 2%;
		top: 15%;
	}
	.button {
		border: 0.2rem darkRed solid;
		border-radius: 1rem;
		color: darkRed;
	}
	#settings-header {
		display: flex;
		justify-content: space-between;
	}
	#settings h2 {
		margin-top: 0;
	}
	#spinner {
		/* is used - id set in Spinner */
		grid-area: spinner;
	}
	#spin {
		position: absolute;
		right: 2%;
		bottom: 2%;
		font-size: calc(5vw);
		border-radius: 50%;
		border-width: 0.4rem;
		color: darkred;
		font-weight: 600;
		border-color: darkred;
		background-color: #ffd7d7;
		padding: 0.8em;
	}

	#netlify {
		position: absolute;
		left: 2%;
		bottom: 2%;
	}
</style>
