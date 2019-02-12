<template>
  <div class="browser-controls">
    <form class="browser-controls__form" @submit.prevent="emitSubmit">
      <div class="browser-controls__input-wrapper">
        <button
          class="browser-controls__avatar"
          type="button"
          @click="emitAccount"
        >
          <Identicon
            v-if="authorized"
            :address="address"
          />
          <v-svg-icon
            v-else
            name="account-login"
          />
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
        <VButton type="primary" @click="emitSubmit">
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
        @click="onSelectExample(dapp.url)"
      />
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
import VSvgIcon from './VSvgIcon';

export default {
  name: 'BrowserControls',

  props: {
    value: {
      type: String,
      default: '',
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
      if (this.isLoading) {
        return 'Loading...';
      }
      return 'Open';
    },
  },

  methods: {
    onSelectExample(url) {
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
      this.$emit('account');
    },
  },

  components: {
    VButton,
    VInput,
    Identicon,
    DappLink,
    Message,
    VSvgIcon,
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
