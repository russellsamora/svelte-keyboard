<script>
  import { createEventDispatcher } from "svelte";
  import keyboardData from "./data.js";
  const dispatch = createEventDispatcher();

  export let data = keyboardData;
  export let style = "";
  let page = 0;

  const unique = (arr) => [...new Set(arr)];

  $: page0 = data.filter((d) => !d.page);
  $: page1 = data.filter((d) => d.page);

  $: rows0 = unique(page0.map((d) => d.row));
  $: rows0, rows0.sort((a, b) => a - b);

  $: rows1 = unique(page1.map((d) => d.row));
  $: rows1, rows1.sort((a, b) => a - b);

  const swaps = {
    page0: "abc",
    page1: "123",
    delete:
      '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-delete"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>',
  };

  $: rowData0 = rows0.map((r) => page0.filter((k) => k.row === r));
  $: rowData1 = rows0.map((r) => page1.filter((k) => k.row === r));
  $: rowData = [rowData0, rowData1];
  $: maxInRow0 = Math.max(...rowData0.map((r) => r.length));
  $: maxInRow1 = Math.max(...rowData1.map((r) => r.length));
  $: maxInRow = Math.max(maxInRow0, maxInRow1);
  $: percentWidth = `${(1 / maxInRow) * 100}%`;

  function onKey(value) {
    if (value.includes("page")) {
      page = +value.substr(-1);
      return false;
    }
    dispatch("keydown", value);
  }
</script>

<div class="keyboard">
  {#each rowData as row, i}
    <div class="page" class:visible="{i === page}">
      {#each row as keys}
        <div class="row row--{i}">
          {#each keys as { value, display }}
            <button
              style="width: {value.length === 1 ? percentWidth : 'auto'};"
              class="{style}"
              class:single="{value.length === 1}"
              on:touchstart="{() => onKey(value)}"
              on:click="{() => onKey(value)}">
              {#if display}
                {display}
              {:else if swaps[value]}
                {@html swaps[value]}
              {:else}{value}{/if}
            </button>
          {/each}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
    justify-content: center;
  }

  button {
    font-family: sans-serif;
    font-size: 1em;
    text-align: center;
    padding: 0.5em;
    margin: 0.1em;
    border-radius: 2px;
    background-color: #efefef;
    border: none;
    cursor: pointer;
    line-height: 1;
    vertical-align: baseline;
  }

  button.depth {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
    margin: 0.2em;
  }

  button.outline {
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  button:active {
    transform: scale(2);
    background-color: #cdcdcd;
  }

  button.single {
    padding: 0.5em 0;
  }

  .page {
    display: none;
  }

  .page.visible {
    display: block;
  }
</style>
