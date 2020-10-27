# svelte-keyboard

A svelte component for when you want a permanent, on-screen keyboard.

## Installation

`npm install svelte-keyboard`

## Usage

```svelte
<script>
	import Keyboard from "svelte-keyboard";
	function onKeydown(event) {
		console.log(event.detail);
	}
</script>

<Keyboard on:keydown="{onKeydown}" />
```

Or pass custom keys:

```svelte
<script>
	import Keyboard from "svelte-keyboard";
	const data = [{
		row: 0,
		value: "Q"
	}, {
		row: 0,
		value: "W"
	},
	...]

	function onKeydown(event) {
		console.log(event.detail);
	}
</script>

<Keyboard data="{data}" on:keydown="{onKeydown}" />
```

## Development

```
cd example;
npm run dev;
```
