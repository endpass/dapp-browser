<template>
  <button
    :class="{ button: true, disabled: disabled }"
    :disabled="disabled"
    :type="type"
    @click="emitClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VButton',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'button',
    },
  },

  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="postcss">
.button {
  padding: 6px 12px;
  background: #4b0472;
  border: none;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &.disabled {
    background: #5d4769;
    cursor: not-allowed;
  }
}
</style>
