<script>
  import Keyboard from "$lib/Keyboard.svelte";

  let keys = [];
  const keyClass = {};
</script>

<h1>svelte-keyboard</h1>
<p>
  A virtual keyboard component for Svelte. Read the docs on <a
    href="https://github.com/russellgoldenberg/svelte-keyboard">github.</a
  >
</p>

<div class="info">
  <h3>Default (Qwerty)</h3>
  <p>key pressed: <strong>{keys[0] || ""}</strong></p>
</div>
<div>
  <Keyboard on:keydown="{({ detail }) => (keys[0] = detail)}" />
</div>

<div class="info">
  <h3>Default (Azerty)</h3>
  <p>key pressed: <strong>{keys[1] || ""}</strong></p>
</div>
<div>
  <Keyboard localizationLayout="azerty" on:keydown="{({ detail }) => (keys[1] = detail)}" />
</div>

<div class="info">
  <h3>Preset Layout (Wordle - Qwerty)</h3>
  <p>key pressed: <strong>{keys[2] || ""}</strong></p>
</div>
<div>
  <Keyboard
    layout="wordle"
    on:keydown="{({ detail }) => (keys[2] = detail)}"
    --text-transform="uppercase"
  />
</div>

<div class="info">
  <h3>Preset Layout (Wordle - Azerty)</h3>
  <p>key pressed: <strong>{keys[3] || ""}</strong></p>
</div>
<div>
  <Keyboard
    layout="wordle"
    localizationLayout="azerty"
    on:keydown="{({ detail }) => (keys[3] = detail)}"
    --text-transform="uppercase"
  />
</div>

<div class="info">
  <h3>Preset Layout (Crossword - Qwerty)</h3>
  <p>key pressed: <strong>{keys[4] || ""}</strong></p>
</div>
<div>
  <Keyboard
    layout="crossword"
    on:keydown="{({ detail }) => (keys[4] = detail)}"
    --text-transform="uppercase"
  />
</div>

<div class="info">
  <h3>Preset Layout (Crossword - Azerty)</h3>
  <p>key pressed: <strong>{keys[5] || ""}</strong></p>
</div>
<div>
  <Keyboard
    layout="crossword"
    localizationLayout="azerty"
    on:keydown="{({ detail }) => (keys[5] = detail)}"
    --text-transform="uppercase"
  />
</div>

<div class="info">
  <h3>Custom Layout</h3>
  <p>key pressed: <strong>{keys[6] || ""}</strong></p>
</div>
<div>
  <Keyboard
    --flex="0 auto"
    custom="{[
      { row: 0, value: 's' },
      { row: 0, value: 'v' },
      { row: 0, value: 'e' },
      { row: 0, value: 'l' },
      { row: 0, value: 't' },
      { row: 0, value: 'e' },
      { row: 1, value: 'k' },
      { row: 1, value: 'e' },
      { row: 1, value: 'y' },
      { row: 1, value: 'b' },
      { row: 1, value: 'o' },
      { row: 1, value: 'a' },
      { row: 1, value: 'r' },
      { row: 1, value: 'd' },
    ]}"
    on:keydown="{({ detail }) => (keys[6] = detail)}"
  />
</div>

<div class="info">
  <h3>Custom Style - A</h3>
  <p>key pressed: <strong>{keys[7] || ""}</strong></p>
</div>
<div>
  <Keyboard
    --background="black"
    --color="white"
    --border-radius="16px"
    --font-family="monospace"
    --font-weight="400"
    --stroke-width="2px"
    --active-background="lightgreen"
    --active-color="black"
    on:keydown="{({ detail }) => (keys[7] = detail)}"
  />
</div>

<div class="info">
  <h3>Custom Style - B</h3>
  <p>key pressed: <strong>{keys[8] || ""}</strong></p>
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
    on:keydown="{({ detail }) => (keys[8] = detail)}"
  />
</div>

<div class="info">
  <h3>Custom Key Class</h3>
  <p>key pressed: <strong>{keys[9] || ""}</strong></p>
</div>
<div>
  <Keyboard
    keyClass="{keyClass}"
    on:keydown="{({ detail }) => {
      keys[9] = detail;
      keyClass[detail] = 'clicked';
    }}"
  />
</div>

<style>
  h1,
  h3,
  p,
  div {
    margin: 0 auto;
    max-width: 30rem;
    padding: 1rem 0;
  }

  .info > * {
    padding: 0;
  }

  :global(.key.clicked) {
    --background: pink;
  }
</style>
