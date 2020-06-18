<script>
  import { ClassBuilder } from "smelte/src/utils/classes.js";
  import { createEventDispatcher } from "svelte";
  import Icon from "smelte/src/components/Icon";
  import Image from 'smelte/src/components/Image';
  import createRipple from "smelte/src/components/Ripple/ripple.js";

  const classesDefault = "focus:bg-gray-50 dark-focus:bg-gray-700 hover:bg-gray-transDark relative overflow-hidden transition-fast p-4 cursor-pointer text-gray-700 dark:text-gray-100 flex items-center z-10";
  const selectedClassesDefault = "bg-gray-200 dark:bg-primary-transLight";
  const subheadingClassesDefault = "text-gray-600 p-0 text-sm";

  export let image = "";
  export let id = "";
  export let value = "";
  export let text = "";
  export let subheading = "";
  export let disabled = false;
  export let dense = false;
  export let selected = false;
  export let tabindex = null;
  export let selectedClasses = selectedClassesDefault;
  export let subheadingClasses = subheadingClassesDefault;

  let className = "";
  export {className as class};

  export let to = "";
  export const item = null;
  export const items = [];
  export const level = null;

  const ripple = createRipple();
  const dispatch = createEventDispatcher();

  function change() {
    if (disabled) return;
    value = id;
    dispatch('change', id, to);
  }

  export let classes = classesDefault;
  const cb = new ClassBuilder(classes, classesDefault);

  $: c = cb
    .flush()
    .add(selectedClasses, selected, selectedClassesDefault)
    .add("py-2", dense)
    .add("text-gray-600", disabled)
    .add(className)
    .get();
    console.log(tabindex);
    
</script>

<style>
  .pushImage {
    margin-right: 2.1rem;
  }
</style>

<li
  use:ripple
  class={c}
  {tabindex}
  on:keypress={change}
  on:click={change}
  on:click>
  <p class="text-3xl mr-5 text-right" class:pushImage={tabindex < 10}>{tabindex < 10 ? '\xa0' + tabindex : tabindex}</p>
  {#if image}
    <Image
      src={image}
      class="rounded-full border"
      height={90}
      width={90} />
  {/if}

  <div class="flex flex-col ml-5 p-0">
    <div class={className}>
      <slot>{text}</slot>
    </div>
    {#if subheading}
      <div class={subheadingClasses}>{subheading}</div>
    {/if}
  </div>
</li>
