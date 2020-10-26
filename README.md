# svelte-keyboard

A svelte component for when you want a permanent, on-screen keyboard.

## Installation

`npm install svelte-keyboard`

## Usage

```svelte
<script>
	import Keyboard from "svelte-keyboard";
</script>
<Keyboard />
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
</script>
<Keyboard {data} />
```
