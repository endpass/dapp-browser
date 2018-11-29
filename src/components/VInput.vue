<template>
  <input
    class="input"
    type="text"
    :placeholder="placeholder"
    :value="value"
    :disabled="disabled"
    @keypress="emitKeypress"
    @input="emitInput"
  />
</template>

<script>
export default {
  name: 'VInput',

  props: {
    placeholder: {
      type: String,
      required: false,
    },

    value: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    emitInput(e) {
      this.$emit('input', e.target.value);
    },

    emitKeypress(e) {
      this.$emit('keypress', e);
    },
  },
};
</script>

<style lang="postcss">
.input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 0;
  padding: 6px 0;
  border-bottom: 1px solid #4d4d4d;
  font-size: 16px;
  transition: 0.25s;
}
</style>
