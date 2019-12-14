<script>
	/*
	credit https://css-tricks.com/building-a-donut-chart-with-vue-and-svg/
	*/

	let c = null
	export { c as class }
	export let id = null
	export let width = '100%'
	export let height = '100%'
	export let segments = [{ value: 100, colour: 'lightgray' }]
	export let options = { gap: 0.002, strokeWidth: 0.5, wedge: true }
	export let selected = undefined

	const radius = 1.0
	const circumference = 2 * Math.PI * radius
	const dasharray =
		circumference - circumference * (segments.length == 1 ? 0 : options.gap)

	const proportion = value => value / dataTotal
	const d2r = deg => (deg * Math.PI) / 180
	const segmentCentreLine = (value, angleOffset) =>
		(proportion(value) * 360) / 2 + angleOffset
	const labelCoords = (value, angleOffset) => {
		const angle = segmentCentreLine(value, angleOffset)
		const radians = d2r(angle)
		return {
			x: radius * Math.cos(radians),
			y: radius * Math.sin(radians),
		}
	}

	const margin = 0.1
	$: vpUnit =
		radius + options.strokeWidth / 2 + (options.wedge ? 0.1 : 0) + margin
	$: dataTotal = segments.reduce((acc, seg) => acc + seg.value, 0)
	$: chartData = segments
		.reduce((acc, s, i) => {
			const rotation =
				i == 0
					? -90
					: acc[i - 1].rotation + proportion(acc[i - 1].value) * 360
			acc[i] = {
				...s,
				offset: circumference - proportion(s.value) * circumference,
				rotation,
				label: {
					...labelCoords(s.value, rotation),
					text:
						s.text == undefined
							? `${Math.round(proportion(s.value) * 100)}%`
							: s.text,
				},
			}
			return acc
		}, [])
		.map((s, i) => {
			const selectedWedge = options.wedge && i == selected
			return selectedWedge
				? {
						...s,
						r: radius + 0.08,
						strokeWidth: options.strokeWidth - 0.05,
						transform: `rotate(${s.rotation +
							360 / segments.length / 25},0 ,0)`,
				  }
				: {
						...s,
						r: radius,
						strokeWidth: options.strokeWidth,
						transform: `rotate(${s.rotation},0 ,0)`,
				  }
		})

	let selectedAngle
	let spin
	$: {
		spin = selected != undefined && selected != null
		if (spin) {
			const segment = chartData[selected]
			selectedAngle = segmentCentreLine(segment.value, segment.rotation)
		} else {
			selectedAngle = -90
		}
	}
</script>

<svg
	class={c}
	{id}
	{width}
	{height}
	viewbox={`${-vpUnit} ${-vpUnit} ${vpUnit * 2} ${vpUnit * 2}`}>
	{#each chartData as { value, colour, r, strokeWidth, offset, transform, label }}
		<g>
			<circle
				{r}
				stroke={colour}
				stroke-width={strokeWidth}
				stroke-dasharray={dasharray}
				stroke-dashoffset={offset}
				{transform} />
			<text dy=".1" x={label.x} y={label.y}>{label.text}</text>
		</g>
	{/each}
	<slot {selectedAngle} {spin} />
</svg>

<style>
	circle {
		fill: transparent;
	}
	text {
		font-size: 0.3px;
		text-anchor: middle;
		fill: darkblue;
	}
</style>
