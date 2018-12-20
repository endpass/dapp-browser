<template>
  <div class="browser-controls">
    <div v-if="address" class="browser-controls__avatar">
      <Identicon :address="address" />
    </div>
    <form class="browser-controls__form" @submit.prevent="emitSubmit">
      <div class="browser-controls__input">
        <VInput
          :value="value"
          :disabled="!authorized || loading"
          placeholder="Enter dapp url..."
          @input="emitInput"
        />
      </div>
      <div class="browser-controls__button">
        <VButton
          :disabled="isButtonDisabled"
          type="primary"
          :submit="authorized"
          @click="emitAuth"
        >
          {{ buttonLabel }}
        </VButton>
      </div>
    </form>
    <Message v-if="error" :danger="true"> {{ error }} </Message>
  </div>
</template>

<script>
import VButton from './VButton.vue';
import VInput from './VInput.vue';
import Message from './Message.vue';
import Identicon from './Identicon.vue';

export default {
  name: 'BrowserControls',

  props: {
    value: {
      type: String,
      default: '',
    },

    loading: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      default: null,
    },
  },

  computed: {
    authorized() {
      return !!this.address;
    },

    isButtonDisabled() {
      const { authorized, loading, value } = this;

      if (!authorized) return false;

      return loading || !value;
    },

    buttonLabel() {
      if (this.loading) {
        return 'Loading...';
      }
      if (this.authorized) {
        return 'Open';
      }

      return 'Sign in';
    },
  },

  methods: {
    emitSubmit() {
      this.$emit('submit');
    },

    emitInput(value) {
      this.$emit('input', value);
    },

    emitAuth() {
      if (!this.authorized) {
        this.$emit('auth');
      }
    },
  },

  components: {
    VButton,
    VInput,
    Identicon,
    Message,
  },
};
</script>

<style lang="postcss">
.browser-controls {
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

.browser-controls__avatar {
  flex: 0 0 auto;
  margin-right: 16px;
}

.browser-controls__form {
  flex: 1 1 auto;
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
