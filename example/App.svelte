<script>
  import Keyboard from "../src/Keyboard.svelte";
  let key = "";
  let key2 = "";
  function onKeydown(event) {
    key = event.detail;
  }
</script>

<h1>Svelte Keyboard</h1>
<p>
  A keyboard component for Svelte. Read the docs on
  <a
    href="https://github.com/russellgoldenberg/svelte-keyboard#svelte-keyboard">github.</a>
</p>
<div>
  <h3>Default settings</h3>
  <p>Key pressed: "{key}"</p>
  <Keyboard on:keydown="{onKeydown}" />
</div>

<h3>Crossword layout with "depth" style</h3>
<div>
  <p>Key pressed: "{key2}"</p>
  <Keyboard
    layout="crossword"
    style="depth"
    on:keydown="{({ detail }) => (key2 = detail)}" />
</div>

<style>
  h1,
  h3,
  p {
    text-align: center;
  }
  div {
    max-width: 480px;
    margin: 2em auto;
  }
</style>
