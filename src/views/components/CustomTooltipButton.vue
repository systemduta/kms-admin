<template>
  <vx-tooltip :text="textTooltip">
    <vs-button
      class="mr-2"
      :to="to"
      :icon="icon"
      icon-pack="feather"
      size="small"
      :color="color"
    ></vs-button>
  </vx-tooltip>
</template>

<script>
export default {
  props: {
    textTooltip: {
      type: String,
      required: true,
    },
    to: [String, Object],
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>
