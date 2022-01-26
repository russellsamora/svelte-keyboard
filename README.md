# svelte-keyboard

A svelte component for when you want a permanent, on-screen keyboard. [Example](https://russellgoldenberg.github.io/svelte-keyboard/example/public).

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

### Custom Keys

```svelte
<script>
  const keys = [{ row: 0, value: "Q"}, ...];
</script>

<Keyboard custom="{keys}" />
```

If you want value to be different than the display key, pass a `display` property. If you want keys to be laid out on the second page, include `page: 1` (defaults to `page: 0`) .

### Layouts

- `standard` - (_default_) two pages with all basic keys
- `crossword` - one page, just capitalized letters and Backspace
- `wordle` - one page, just capitalized letters, Backspace, and Enter

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
	--font-size="1rem"
	--font-weight="normal"
	--margin="0.125rem"
	--min-width="2rem"
	--opacity="1"
	--text-transform="none"
	--active-background="#cdcdcd"
	--active-border="none"
	--active-box-shadow="none"
	--active-color="currentColor"
	--active-opacity="1"
	--active-transform="scale(2)"
>
```

For any other properties, use global CSS on the selector `.svelte-keyboard button.key`.

### Special values

- `Backspace` displays a backspace svg icon
- `Enter` displays an enter svg icon
- `Space` displays a spacebar
- `Shift` displays "ABC" or "abc" to toggle case, no event fires
- `Page1` displays "123" and will switch to the second page, no event fires
- `Page0` displays "abc" and will switch to the first page, no event fires

## Development

```
cd example;
npm run dev;
```

open `localhost:4000/svelte-keyboard`.

Note: Must manually change export package "."