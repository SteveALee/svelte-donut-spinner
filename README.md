# svelte-donut-spinner

A simple inclusive random spinner app.

A sample [svelte](https://github.com/sveltejs/svelte) app showcasing a number of features (See dev notes below)

## Usage

Try it at https://spinner.fullmeasure.uk/

Press the space bar or click the Spin button when a random selection will be made and spoken.

## Dev notes

- Based on the official svelte template with fixes to ensure prettier and eslint work in VSCode.
- Components:
  - Donut - a configurable donut chart using SVG
  - SpinningPointer - a SVG spinning pointer using CSS transition
  - Spinner - composed of a donut chart and a spinning pointer
  - Modal - a modal dialog (based on the svelte example)
  - Settings - a settings pane with options for the spinner
  - App - putting it all together
- Drivers (functions with side effects)
  - Random number
  - Speech output
  - Persistent - save to local storage
  - Stores - a number of useful stores for reactive i/o etc
- Svelte techniques / features
  - Stores
  - Reactivity
  - Nested components and child content
- Other Techniques
  - Dynamic CSS Grid
  - Functional style code
- Misc
  - Prettier configured to use section order "scripts, markup, styles" in .svelte file.
  - Suggested VSCode extensions.
  - All files treated as binary by git to avoid any unwanted EOL transforms.
