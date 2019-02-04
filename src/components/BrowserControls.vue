<template>
  <div class="browser-controls">
    <form class="browser-controls__form" @submit.prevent="emitSubmit">
      <div class="browser-controls__input-wrapper">
        <button
          v-if="authorized"
          class="browser-controls__avatar"
          type="button"
          @click="emitAccount"
        >
          <Identicon :address="address" />
        </button>
        <div class="browser-controls__input">
          <VInput
            :value="value"
            :disabled="!authorized || loading"
            placeholder="Enter dapp url..."
            @input="emitInput"
          />
        </div>
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
      <Message v-if="error" :danger="true"> {{ error }} </Message>
    </form>
    <div v-if="authorized" class="browser-controls__links">
      <DappLink
        v-for="dapp in dapps"
        :key="dapp.url"
        :url="dapp.url"
        :name="dapp.name"
        :title="dapp.title"
        :icon="dapp.icon"
        @click="goTo(dapp.url)"
      ></DappLink>
    </div>
  </div>
</template>

<script>
import dapps from '@/constants/dapp-links';
import VButton from './VButton.vue';
import VInput from './VInput.vue';
import DappLink from './DappLink.vue';
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

  data() {
    return {
      dapps,
    };
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

    goTo(url) {
      if (!this.loading) {
        this.$emit('input', url);
        this.$emit('submit');
      }
    },

    emitLogout() {
      this.$emit('logout');
    },

    emitInput(value) {
      this.$emit('input', value);
    },

    emitAuth() {
      if (!this.authorized) {
        this.$emit('auth');
      }
    },

    emitAccount() {
      this.$emit('account');
    },
  },

  components: {
    VButton,
    VInput,
    Identicon,
    DappLink,
    Message,
  },
};
</script>

<style lang="postcss">
.browser-controls__form {
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

.browser-controls__input-wrapper {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
}

.browser-controls__avatar {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  padding: 0;
  background: none;
  border: none;
  margin-right: 16px;
  cursor: pointer;
  transition: opacity 0.25s;
  opacity: 1;

  &:hover {
    opacity: 0.7;
  }
}

.browser-controls__input {
  flex: 1 1 auto;
}

.browser-controls__button {
  flex: 0 0 auto;
}

.browser-controls__form {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
}

.browser-controls__links {
  display: flex;
  align-items: left;
  padding: 5px 16px 12px;
}

@media (max-width: 768px) {
  .browser-controls {
    display: block;
  }

  .browser-controls__input-wrapper {
    margin-bottom: 16px;
  }

  .browser-controls__button {
    display: flex;
    align-items: center;

    & > button {
      flex: 1 1 auto;
    }
  }
}
</style>
