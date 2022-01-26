<script>
  import Keyboard from "$lib/Keyboard.svelte";

  let keys = [];
</script>

<h1>svelte-keyboard</h1>
<p>
  An on-screen keyboard component for Svelte. Read the docs on <a
    href="https://github.com/russellgoldenberg/svelte-keyboard">github.</a
  >
</p>

<div class="info">
  <h3>Default</h3>
  <p>key pressed: <strong>{keys[0] || ""}</strong></p>
</div>
<div>
  <Keyboard on:keydown="{({ detail }) => (keys[0] = detail)}" />
</div>

<div class="info">
  <h3>Preset Layout (Wordle)</h3>
  <p>key pressed: <strong>{keys[1] || ""}</strong></p>
</div>
<div>
  <Keyboard
    layout="wordle"
    on:keydown="{({ detail }) => (keys[1] = detail)}"
    --text-transform="uppercase"
  />
</div>

<div class="info">
  <h3>Custom Layout</h3>
  <p>key pressed: <strong>{keys[2] || ""}</strong></p>
</div>
<div>
  <Keyboard
    custom="{[
      { row: 0, value: 's' },
      { row: 0, value: 'v' },
      { row: 0, value: 'e' },
      { row: 0, value: 'l' },
      { row: 0, value: 't' },
      { row: 0, value: 'e' },
    ]}"
    on:keydown="{({ detail }) => (keys[2] = detail)}"
  />
</div>

<div class="info">
  <h3>Custom Style - A</h3>
  <p>key pressed: <strong>{keys[3] || ""}</strong></p>
</div>
<div>
  <Keyboard
    --background="black"
    --color="white"
    --border-radius="16px"
    --font-family="monospace"
    --font-weight="bold"
    --active-background="lightgreen"
    --active-color="black"
    on:keydown="{({ detail }) => (keys[3] = detail)}"
  />
</div>

<div class="info">
  <h3>Custom Style - B</h3>
  <p>key pressed: <strong>{keys[4] || ""}</strong></p>
</div>
<div>
  <Keyboard
    --background="pink"
    --color="darkred"
    --border-radius="4px"
    --box-shadow="2px 2px 2px 0 red"
    --active-background="pink"
    --active-color="darkred"
    --active-transform="translate(2px, 2px)"
    --font-size="18px"
    on:keydown="{({ detail }) => (keys[4] = detail)}"
  />
</div>

<style>
  h1,
  h3,
  p,
  div {
    margin: 0 auto;
    max-width: 30rem;
    padding: 1rem;
  }

  .info > * {
    padding: 0;
  }
</style>
