# svelte-keyboard

A svelte component for when you want a permanent, on-screen keyboard. [View Demo](https://russellsamora.github.io/svelte-keyboard/).

## Installation

`npm install svelte-keyboard`

## Usage

```svelte
<script>
  import Keyboard from "svelte-keyboard";

  const onKeydown = (event) => {
    console.log(event.detail);
  }
</script>

<Keyboard on:keydown="{onKeydown}" />
```

### Localization Layouts

- `qwerty` - (_default_)
- `azerty`

### Preset Layouts

- `standard` - (_default_) two pages with all basic keys
- `crossword` - one page, just capitalized letters and Backspace
- `wordle` - one page, just capitalized letters, Backspace, and Enter


### Custom Layout

```svelte
<script>
  const keys = [{ row: 0, value: "Q"}, ...];
</script>

<Keyboard custom="{keys}" />
```

If you want value to be different than the display key, pass a `display` property. If you want keys to be laid out on the second page, include `page: 1` (defaults to `page: 0`) .


```svelte
<Keyboard layout="wordle" />
```

### Custom Styles
Use style props on the component (showing defaults):
```svelte
<Keyboard
	--height="3.5rem"
	--background="#efefef"
	--color="currentColor"
	--border="none"
	--border-radius="2px"
	--box-shadow="none"
	--flex="1"
	--font-family="sans-serif"
	--font-size="20px"
	--font-weight="normal"
	--margin="0.125rem"
	--min-width="2rem"
	--opacity="1"
	--stroke-width="3px"
	--text-transform="none"
	--active-background="#cdcdcd"
	--active-border="none"
	--active-box-shadow="none"
	--active-color="currentColor"
	--active-opacity="1"
	--active-transform="none"
>
```

For any other properties, use global CSS on the selector `.svelte-keyboard button.key`. Note: `stroke-width` is for svg icons.

To give specific keys a class (e.g., "clicked") you can use the `keyClass` prop:
```svelte
<Keyboard keyClass="{{ "x": "clicked"}}" />
```
The `keyClass` object is key/value pairs where they key is the key name (e.g., "x" or "Enter") and the value is the class name(s) to apply (e.g., "clicked" or "clicked hide"). You can then use global styling `:global(.key.clicked) { ... }` to apply custom styles.

### Special values

- `Backspace` displays a backspace svg icon
- `Enter` displays an enter svg icon
- `Space` displays a spacebar
- `Shift` displays "ABC" or "abc" to toggle case, no event fires
- `Page1` displays "123" and will switch to the second page, no event fires
- `Page0` displays "abc" and will switch to the first page, no event fires

If you want to say the word instead of an icon, add this prop:
```svelte
<Keyboard noSwap={["Enter"]} />
```

## Development

change basepath to "" for dev and "svelte-keyboard" for deploy.

```
npm run dev;
```
