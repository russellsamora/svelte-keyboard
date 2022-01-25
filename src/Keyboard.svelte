<script>
  import { createEventDispatcher } from "svelte";
  import standard from "./layouts/standard.js";
  import crossword from "./layouts/crossword.js";

  import backspaceSVG from "./svg/backspace.js";
  import enterSVG from "./svg/enter.js";

  const dispatch = createEventDispatcher();

  export let custom;
  export let style = "";
  export let layout = "standard";

  let page = 0;
  let shifted = false;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const layouts = { standard, crossword };

  const swaps = {
    Page0: "abc",
    Page1: "?123",
    Space: " ",
    Shift: "abc",
    Enter: enterSVG,
    Backspace: backspaceSVG,
  };

  const unique = (arr) => [...new Set(arr)];

  $: rawData = custom || layouts[layout];
  $: data = rawData.map((d) => {
    let display = d.display;
    if (swaps[d.value]) display = swaps[d.value];
    if (!display) display = shifted ? d.value.toUpperCase() : d.value;
    if (d.value === "Shift")
      display = shifted ? swaps[d.value] : swaps[d.value].toUpperCase();
    return {
      ...d,
      display,
    };
  });

  $: page0 = data.filter((d) => !d.page);
  $: page1 = data.filter((d) => d.page);

  $: rows0 = unique(page0.map((d) => d.row));
  $: rows0, rows0.sort((a, b) => a - b);

  $: rows1 = unique(page1.map((d) => d.row));
  $: rows1, rows1.sort((a, b) => a - b);

  $: rowData0 = rows0.map((r) => page0.filter((k) => k.row === r));
  $: rowData1 = rows0.map((r) => page1.filter((k) => k.row === r));
  $: rowData = [rowData0, rowData1];
  $: maxInRow0 = Math.max(...rowData0.map((r) => r.length));
  $: maxInRow1 = Math.max(...rowData1.map((r) => r.length));
  $: maxInRow = Math.max(maxInRow0, maxInRow1);
  $: percentWidth = `${(1 / maxInRow) * 100}%`;

  function onKey(value, event) {
    event.preventDefault();
    if (value.includes("Page")) {
      page = +value.substr(-1);
    } else if (value === "Shift") {
      shifted = !shifted;
    } else {
      let output = value;
      if (shifted && alphabet.includes(value)) output = value.toUpperCase();
      if (value === "Space") output = " ";
      dispatch("keydown", output);
    }
    event.stopPropagation();
    return false;
  }
</script>

<div class="keyboard">
  {#each rowData as row, i}
    <div class="page" class:visible="{i === page}">
      {#each row as keys}
        <div class="row row--{i}">
          {#each keys as { value, display }}
            <button
              style="--w: {percentWidth};"
              class="{style} key--{value}"
              class:single="{value.length === 1}"
              on:touchstart="{(e) => onKey(value, e)}"
              on:mousedown="{(e) => onKey(value, e)}"
            >
              {#if display.includes("<svg")}
                {@html display}
              {:else}{display}{/if}
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
    display: inline-block;
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
    width: var(--w);
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

  button.key--Space {
    width: 20%;
  }

  button.key--Page0,
  button.key--Page1,
  button.key--Shift,
  button.key--Backspace,
  button.key--Enter {
    width: auto;
    min-width: var(--w);
  }
</style>
