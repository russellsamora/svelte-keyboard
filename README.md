# svelte-keyboard

A svelte component for when you want a permanent, on-screen keyboard.

## Installation

`npm install svelte-keyboard`

## Usage

```svelte
<Keyboard />
```

Or pass custom keys:

```svelte
<script>
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
