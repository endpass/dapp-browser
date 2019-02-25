<template>
  <p :class="{ message: true, danger: danger }">
    <slot />
  </p>
</template>

<script>
export default {
  props: {
    danger: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="postcss">
.message {
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.5;

  &.danger {
    color: #f00;
  }
}
</style>
