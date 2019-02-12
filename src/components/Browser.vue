<template>
  <div class="browser">
    <section v-if="inited" class="browser__controls">
      <BrowserControls
        v-model="url"
        :isLoading="isLoading"
        :address="activeAccount"
        :error="error"
        @submit="handleSubmitUrl"
        @account="handleOpenAccount"
        @auth="handleAuthRequest"
      />
    </section>
    <section class="browser__frame">
      <iframe
        v-if="isVisibleViewer"
        v-show="!isLoading"
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
    url: '',
    activeUrl: '',
    viewerUrl: '',
    inited: false,
    error: null,
  }),

  computed: {
    ...mapState({
      accountData: state => state.dapp.accountData,
      isLoading: state => state.dapp.loadState === LOAD_STATE.LOADING,
    }),

    activeAccount() {
      return get(this.accountData, 'activeAccount');
    },

    isVisibleViewer() {
      return !!this.activeUrl;
    },
  },

  methods: {
    ...mapMutations(['changeLoadingStatus']),
    ...mapActions([
      'auth',
      'getAccountData',
      'beforeInject',
      'inject',
      'init',
      'openAccount',
    ]),

    changeRoutePath(url = '') {
      this.$router.replace(`?url=${url}`);
    },

    handleSubmitUrl() {
      const newUrl = this.url;
      if (this.activeUrl === newUrl) {
        return;
      }

      this.beforeInject();

      this.activeUrl = newUrl;
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
      try {
        const { viewer } = this.$refs;
        get(viewer.contentWindow, 'location');

        this.inject(viewer.contentWindow);
      } catch (err) {
        this.error =
          'Page is not loaded. Try load other page or reload current.';
      } finally {
        this.changeLoadingStatus(LOAD_STATE.LOADED);
      }
    },

    loadByPathQuery() {
      const url = this.$route.query.url;
      if (url) {
        this.url = url;
        this.handleSubmitUrl();
      }
    },
  },

  async created() {
    this.init();
    await this.getAccountData();

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
