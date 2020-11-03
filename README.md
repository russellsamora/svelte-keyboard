# svelte-keyboard

A svelte component for when you want a permanent, on-screen keyboard. [Example](https://russellgoldenberg.github.io/svelte-keyboard/example/public).

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

### Custom Keys

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

If you want value to be different than the display key, pass a `display` property. If you want keys to be laid out on the second page, include `page: 1` (defaults to `page: 0`) .

### Style

```svelte
	<Keyboard style="depth" />
	<Keyboard style="outline" />
```

### Special values

- `delete` displays a delete svg icon
- `page1` displays "123" and will switch to the second page, no event fires
- `page0` displays "abc" and will switch to the first page, no event fires

## Development

```
cd example;
npm run dev;
```
