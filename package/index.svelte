<script>
  import { createEventDispatcher } from "svelte";
  import standard from "./layouts/standard.js";
  import crossword from "./layouts/crossword.js";
  import wordle from "./layouts/wordle.js";

  import backspaceSVG from "./svg/backspace.js";
  import enterSVG from "./svg/enter.js";

  const dispatch = createEventDispatcher();

  export let custom;
  export let layout = "standard";
  export let noSwap = [];

  let page = 0;
  let shifted = false;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const layouts = { standard, crossword, wordle };

  const swaps = {
    Page0: "abc",
    Page1: "?123",
    Space: " ",
    Shift: "abc",
    Enter: enterSVG,
    Backspace: backspaceSVG,
  };

  const unique = (arr) => [...new Set(arr)];

  $: rawData = custom || layouts[layout] || standard;
  $: data = rawData.map((d) => {
    let display = d.display;
    if (swaps[d.value] && !noSwap.includes(d.value) && !d.noSwap)
      display = swaps[d.value];
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

  function onKey(value, event) {
    event.preventDefault();
    if (value.includes("Page")) {
      page = +value.substr(-1);
    } else if (value === "Shift") {
      shifted = !shifted;
    } else {
      let output = value;
      if (shifted && alphabet.includes(value)) output = value.toUpperCase();
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
              class="key--{value}"
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
    touch-action: manipulation;
  }

  button {
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    cursor: pointer;
    line-height: 1;
    flex: 1;
    transform-origin: 50% 50%;
    background: var(--background, #efefef);
    color: var(--color, currentColor);
    border: var(--border, none);
    border-radius: var(--border-radius, 2px);
    box-shadow: var(--box-shadow, none);
    font-family: var(--font-family, sans-serif);
    font-size: var(--font-size, 1rem);
    height: var(--height, 3.5rem);
    margin: var(--margin, 0.125rem);
    text-transform: var(--text-transform, none);
  }

  button.single {
    min-width: var(--min-width, 2rem);
  }

  button:active {
    background: var(--active-background, #cdcdcd);
    border: var(--active-border, none);
    box-shadow: var(--active-box-shadow, none);
    color: var(--active-color, currentColor);
    transform: var(--active-transform, scale(2));
  }

  button.key--Space {
    width: var(--space-width, 20%);
    flex: var(--space-flex, 3);
  }

  button.key--Page0,
  button.key--Page1,
  button.key--Shift,
  button.key--Backspace,
  button.key--Enter {
    flex: var(--special-flex, 1.5);
  }

  .page {
    display: none;
  }

  .page.visible {
    display: block;
  }
</style>
