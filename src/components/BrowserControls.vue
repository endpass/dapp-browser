<template>
  <div class="browser-controls">
    <form class="browser-controls__form" @submit.prevent="emitSubmit">
      <div class="browser-controls__input">
        <v-input
          :value="value"
          :disabled="disabled"
          placeholder="Enter dapp url..."
          @input="emitInput"
        />
      </div>
      <div class="browser-controls__button">
        <v-button :disabled="!value || disabled" type="submit">Open</v-button>
      </div>
    </form>
    <Message v-if="error" :danger="true">{{ error }}</Message>
  </div>
</template>

<script>
import VButton from './VButton.vue';
import VInput from './VInput.vue';
import Message from './Message.vue';

export default {
  name: 'BrowserControls',

  props: {
    value: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: null,
    },
  },

  methods: {
    emitSubmit() {
      this.$emit('submit');
    },

    emitInput(value) {
      this.$emit('input', value);
    },
  },

  components: {
    VButton,
    VInput,
    Message,
  },
};
</script>

<style lang="postcss">
.browser-controls {
  padding: 10px;
  background-color: #fff;
}

.browser-controls__form {
  display: flex;
  align-items: center;
}

.browser-controls__input {
  flex: 1 1 auto;
}

.browser-controls__button {
  flex: 0 0 auto;
}
</style>
