<template>
  <div class="browser">
    <section v-if="inited" class="browser__controls">
      <BrowserControls
        v-model="url"
        :loading="loading"
        :address="activeAccount"
        :error="error"
        @submit="handleControlsSubmit"
        @logout="handleControlsLogout"
        @auth="handleAuthRequest"
        @reset="handleControlsReset"
      />
    </section>
    <section class="browser__frame">
      <iframe
        v-if="loading || loaded"
        v-show="loaded"
        ref="viewer"
        class="browser__viewer"
        :src="dappUrl"
        @load="handleViewerLoad"
      />
    </section>
  </div>
</template>

<script>
import { get } from 'lodash';
import { mapState, mapMutations, mapActions } from 'vuex';
import BrowserControls from '@/components/BrowserControls';

export default {
  name: 'Browser',

  data: () => ({
    url: '',
    inited: false,
    error: null,
  }),

  computed: {
    ...mapState({
      accountData: state => state.dapp.accountData,
      loading: state => state.dapp.loading,
      loaded: state => state.dapp.loaded,
    }),

    activeAccount() {
      return get(this.accountData, 'activeAccount');
    },

    dappUrl() {
      return `/${this.url}`;
    },
  },

  watch: {
    url() {
      this.handleUrlChange();
    },
  },

  methods: {
    ...mapMutations(['changeLoadingStatus', 'changeLoadStatus']),
    ...mapActions([
      'auth',
      'logout',
      'getAccountData',
      'inject',
      'reset',
      'initProvider',
    ]),

    handleControlsSubmit() {
      this.changeLoadingStatus(true);
    },

    handleControlsLogout() {
      this.logout();
    },

    handleControlsReset() {
      this.url = '';
    },

    async handleAuthRequest() {
      try {
        await this.auth();
      } catch (err) {
        console.error('auth error: ', err);
      }
    },

    handleUrlChange() {
      if (this.loaded) {
        this.reset();
      }
    },

    handleViewerLoad() {
      try {
        const { viewer } = this.$refs;
        get(viewer.contentWindow, 'location');

        this.changeLoadStatus(true);
        this.inject(viewer.contentWindow);
      } catch (err) {
        this.error =
          'Page is not loaded. Try load other page or reload current.';
      } finally {
        this.changeLoadingStatus(false);
      }
    },
  },

  async created() {
    this.initProvider();
    await this.getAccountData();

    this.inited = true;
  },

  components: {
    BrowserControls,
  },
};
</script>

<style lang="postcss">
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.browser {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.browser__controls {
  flex: 0 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.65s;
}

.browser__frame {
  position: relative;
  flex: 1 1 auto;
  background-color: #4b0472;
  background-image: url(../assets/img/logo.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 15%;
}

.browser__viewer {
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
}

@media (max-width: 768px) {
  .browser__controls {
    position: static;
  }

  .browser__viewer {
    top: 0;
    height: 100%;
  }
}
</style>
