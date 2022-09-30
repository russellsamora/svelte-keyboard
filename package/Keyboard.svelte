<script>
  import { createEventDispatcher } from "svelte";

  import qwertyStandard from "./layouts/qwerty/standard.js";
  import qwertyCrossword from "./layouts/qwerty/crossword.js";
  import qwertyWordle from "./layouts/qwerty/wordle.js";

  import azertyStandard from "./layouts/azerty/standard.js";
  import azertyCrossword from "./layouts/azerty/crossword.js";
  import azertyWordle from "./layouts/azerty/wordle.js";

  import backspaceSVG from "./svg/backspace.js";
  import enterSVG from "./svg/enter.js";

  // exposed props
  export let custom;
  export let localizationLayout = "qwerty";
  export let layout = "standard";
  export let noSwap = [];
  export let keyClass = {};

  // vars
  let page = 0;
  let shifted = false;
  let active = undefined;

  const layouts = {
    qwerty: {
      standard: qwertyStandard,
      crossword: qwertyCrossword,
      wordle: qwertyWordle,
    },
    azerty: {
      standard: azertyStandard,
      crossword: azertyCrossword,
      wordle: azertyWordle,
    },
  };
  const dispatch = createEventDispatcher();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const swaps = {
    Page0: "abc",
    Page1: "?123",
    Space: " ",
    Shift: "abc",
    Enter: enterSVG,
    Backspace: backspaceSVG,
  };

  // functions
  const unique = (arr) => [...new Set(arr)];

  const onKeyStart = (event, value) => {
    event.preventDefault();
    active = value;
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
  };

  const onKeyEnd = (value) => {
    setTimeout(() => {
      if (value === active) active = undefined;
    }, 50);
  };

  // reactive vars
  $: rawData = custom || layouts[localizationLayout][layout] || standard;
  $: data = rawData.map((d) => {
    let display = d.display;
    const s = swaps[d.value];
    const shouldSwap = s && !noSwap.includes(d.value) && !d.noSwap;
    if (shouldSwap) display = s;
    if (!display) display = shifted ? d.value.toUpperCase() : d.value;
    if (d.value === "Shift") display = shifted ? s : s.toUpperCase();
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
</script>

<div class="svelte-keyboard">
  {#each rowData as row, i}
    <div class="page" class:visible="{i === page}">
      {#each row as keys}
        <div class="row row--{i}">
          {#each keys as { value, display }}
            <button
              type="button"
              class="key key--{value} {keyClass[value] || ''}"
              class:single="{value.length === 1}"
              class:active="{value === active}"
              on:touchstart="{(e) => onKeyStart(e, value)}"
              on:mousedown="{(e) => onKeyStart(e, value)}"
              on:touchend="{() => onKeyEnd(value)}"
              on:mouseup="{() => onKeyEnd(value)}"
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
    appearance: none;
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    cursor: pointer;
    line-height: 1;
    transform-origin: 50% 50%;
    user-select: none;
    background: var(--background, #eee);
    color: var(--color, #111);
    border: var(--border, none);
    border-radius: var(--border-radius, 2px);
    box-shadow: var(--box-shadow, none);
    flex: var(--flex, 1);
    font-family: var(--font-family, sans-serif);
    font-size: var(--font-size, 20px);
    font-weight: var(--font-weight, normal);
    height: var(--height, 3.5rem);
    margin: var(--margin, 0.125rem);
    opacity: var(--opacity, 1);
    text-transform: var(--text-transform, none);
    -webkit-tap-highlight-color: transparent;
  }

  button.single {
    min-width: var(--min-width, 2rem);
  }

  button.active,
  button:active {
    background: var(--active-background, #ccc);
    border: var(--active-border, none);
    box-shadow: var(--active-box-shadow, none);
    color: var(--active-color, #111);
    opacity: var(--active-opacity, 1);
    transform: var(--active-transform, none);
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

  :global(.svelte-keyboard svg) {
    stroke-width: var(--stroke-width, 2px);
    vertical-align: middle;
  }
</style>
