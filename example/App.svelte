<script>
  import Keyboard from "../src/Keyboard.svelte";
  let key;
  function onKeydown(event) {
    key = event.detail;
  }
</script>

<h1>Svelte Keyboard</h1>
<p>Key pressed: {key}</p>
<Keyboard on:keydown="{onKeydown}" />
