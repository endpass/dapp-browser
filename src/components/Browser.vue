<template>
  <div class="browser">
    <section v-if="inited" class="browser__controls">
      <BrowserControls
        v-model="inputUrl"
        :is-loading="isLoading"
        :is-same-url="isSameUrl"
        :address="activeAccount"
        :error="error"
        @submit="handleSubmitUrl"
        @account="handleOpenAccount"
        @auth="handleAuthRequest"
      />
    </section>
    <section :class="browserFrame">
      <iframe
        v-if="!preventLoad"
        v-show="isVisibleViewer && !isLoading"
        ref="viewer"
        class="browser__viewer"
        :src="viewerUrl"
        @load="onViewerLoad"
      />
    </section>
  </div>
</template>

<script>
import get from 'lodash/get';
import { mapState, mapMutations, mapActions } from 'vuex';
import BrowserControls from '@/components/BrowserControls';
import { LOAD_STATE } from '@/constants';

export default {
  name: 'Browser',

  data: () => ({
    inputUrl: '',
    checkUrl: '',
    viewerUrl: '',
    inited: false,
    preventLoad: false,
    error: null,
  }),

  computed: {
    ...mapState({
      accountData: state => state.dapp.accountData,
      isLoading: state => state.dapp.loadState === LOAD_STATE.LOADING,
      isLoaded: state => state.dapp.loadState === LOAD_STATE.LOADED,
    }),

    browserFrame() {
      return {
        browser__frame: true,
        'browser__frame-loaded': this.isLoaded,
      };
    },

    activeAccount() {
      return get(this.accountData, 'activeAccount');
    },

    isVisibleViewer() {
      return !!this.checkUrl;
    },

    isSameUrl() {
      return this.inputUrl === this.checkUrl;
    },
  },

  methods: {
    ...mapMutations(['changeLoadState']),
    ...mapActions([
      'auth',
      'getAccountData',
      'toInitial',
      'beforeInject',
      'inject',
      'init',
      'openAccount',
    ]),

    changeRoutePath(url = '') {
      this.$router.replace(`?url=${url}`);
    },

    handleSubmitUrl() {
      const newUrl = this.inputUrl;
      if (this.isSameUrl) {
        return;
      }
      // eslint-disable-next-line
      newUrl ? this.beforeInject() : this.toInitial();

      this.preventLoad = false;
      this.checkUrl = newUrl;
      this.viewerUrl = `/${newUrl}`;

      this.changeRoutePath(newUrl);
    },

    handleOpenAccount() {
      this.openAccount();
    },

    async handleAuthRequest() {
      try {
        await this.auth();
      } catch (err) {
        console.error('auth error: ', err);
      }
    },

    onViewerLoad() {
      this.changeLoadState(LOAD_STATE.LOADED);
    },

    loadByPathQuery() {
      const { url } = this.$route.query;
      if (url) {
        this.inputUrl = url;
        this.handleSubmitUrl();
      }
    },

    onBeforeStart() {
      try {
        const { viewer } = this.$refs;
        this.inject(viewer.contentWindow);
      } catch (err) {
        this.preventLoad = true;
        this.error =
          'Page is not loaded. Try load other page or reload current.';
      }
    },
  },

  async created() {
    this.init();
    await this.getAccountData();
    this.changeLoadState(LOAD_STATE.LOADED);

    window.addEventListener('message', message => {
      if (message.data.type === 'proxy.beforeStart') {
        this.onBeforeStart();
      }
    });

    this.loadByPathQuery();

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

.browser__frame-loaded {
  background: none;
}

.browser__viewer {
  position: absolute;
  top: 105px;
  left: 0;
  width: 100%;
  height: calc(100% - 105px);
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
