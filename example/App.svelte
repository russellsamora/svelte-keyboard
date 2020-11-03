<script>
  import Keyboard from "../src/Keyboard.svelte";
  let key = "";
  function onKeydown(event) {
    key = event.detail;
  }
</script>

<h1>Svelte Keyboard</h1>
<div>
  <p>Key pressed: {key}</p>
  <Keyboard style="outline" on:keydown="{onKeydown}" />
</div>

<style>
  h1,
  p {
    text-align: center;
  }
  div {
    max-width: 480px;
    margin: 0 auto;
  }
</style>
