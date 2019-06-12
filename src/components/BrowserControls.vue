<template>
  <div class="browser-controls">
    <form class="browser-controls__form" @submit.prevent="emitSubmit">
      <div class="browser-controls__input-wrapper">
        <button
          class="browser-controls__avatar"
          type="button"
          @click="emitAccount"
        >
          <Identicon :authorized="authorized" :address="address" />
        </button>
        <div class="browser-controls__input">
          <VInput
            :value="value"
            placeholder="Enter dapp url..."
            @input="emitInput"
          />
        </div>
      </div>
      <div class="browser-controls__button">
        <VButton
          :disabled="isSameUrl && isLoading"
          submit
          type="primary"
        >
          {{ buttonLabel }}
        </VButton>
      </div>
    </form>
    <Message v-if="error" :danger="true">
      {{ error }}
    </Message>
    <div class="browser-controls__links">
      <DappLink
        v-for="dapp in dapps"
        :key="dapp.url"
        :url="dapp.url"
        :name="dapp.name"
        :title="dapp.title"
        :icon="dapp.icon"
        @click="onClickDappBookmark(dapp.url)"
      />
      <div class="browser-controls__demo-mode" v-if="isDemoMode">
        <div>
          <div>Hey! You are in <b>Demo mode!</b> </div>
          <div>Your password is&nbsp;<b>{{ demoPassword }}</b></div>
        </div>
        <VButton
          @click="emitAuth"
        >
          Log in
        </VButton>
      </div>
    </div>
  </div>
</template>

<script>
import { demoAccount } from '@/class/singleton';
import dapps from '@/constants/dapp-links';
import VButton from './VButton.vue';
import VInput from './VInput.vue';
import DappLink from './DappLink.vue';
import Message from './Message.vue';
import Identicon from './Identicon.vue';
import { DEMO_DEFAULT_PASSWORD } from '@/constants';


export default {
  name: 'BrowserControls',

  props: {
    value: {
      type: String,
      default: '',
    },

    isDemoMode: {
      type: Boolean,
      default: false,
    },

    isSameUrl: {
      type: Boolean,
      default: false,
    },

    isLoading: {
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

    buttonLabel() {
      return this.isLoading ? 'Loading...' : 'Open';
    },

    demoPassword() {
      return DEMO_DEFAULT_PASSWORD;
    },
  },

  methods: {
    onClickDappBookmark(url) {
      this.emitInput(url);
      this.emitSubmit();
    },

    emitSubmit() {
      this.$emit('submit');
    },

    emitInput(value) {
      this.$emit('input', value);
    },

    emitAccount() {
      this.authorized ? this.$emit('account') : this.$emit('auth');
    },

    emitAuth() {
      this.$emit('auth');
    }
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
.browser-controls {
  padding: 10px 16px;
}

.browser-controls__form {
  display: flex;
  align-items: center;
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
  flex-flow: row wrap;
  align-items: center;
  padding-top: 9px;
  min-height: 54px;
}

.browser-controls__demo-mode {
  display: flex;
  align-items: center;
  margin-left: auto;

  b {
    font-weight: bold;
  }
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
