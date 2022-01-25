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
  <Keyboard layout="wordle" on:keydown="{({ detail }) => (keys[1] = detail)}" />
</div>

<div class="info">
  <h3>Preset Style (depth)</h3>
  <p>key pressed: <strong>{keys[2] || ""}</strong></p>
</div>
<div>
  <Keyboard style="depth" on:keydown="{({ detail }) => (keys[2] = detail)}" />
</div>

<div class="info">
  <h3>Custom Style</h3>
  <p>key pressed: <strong>{keys[3] || ""}</strong></p>
</div>
<div>
  <Keyboard
    --background="black"
    --color="white"
    --border-radius="5px"
    --active-background="lightgreen"
    --active-color="black"
    --active-transform="scale(1)"
    --active-box-shadow="0 0 0 3px purple"
    on:keydown="{({ detail }) => (keys[3] = detail)}"
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
