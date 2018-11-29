<template>
  <div class="browser">
    <section class="browser__controls">
      <BrowserControls
        v-model="url"
        :disabled="loading"
        :error="error"
        @submit="handleControlsSubmit"
        @reset="handleControlsReset"
      ></BrowserControls>
    </section>
    <section class="browser__frame">
      <iframe
        v-if="loading || loaded"
        v-show="loaded"
        class="browser__viewer"
        :src="dappUrl"
        ref="viewer"
        @load="handleViewerLoad"
      ></iframe>
    </section>
  </div>
</template>

<script>
import get from 'lodash.get';
import { mapState, mapMutations } from 'vuex';
import BrowserControls from '@/components/BrowserControls';

export default {
  name: 'Browser',

  data: () => ({
    url: '',
    error: null,
  }),

  computed: {
    ...mapState({
      loading: state => state.dapp.loading,
      loaded: state => state.dapp.loaded,
    }),

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
    ...mapMutations(['changeLoadStatus', 'changeLoadingStatus']),

    handleControlsSubmit() {
      this.changeLoadingStatus(true);
    },

    handleControlsReset() {
      this.url = '';
    },

    handleUrlChange() {
      if (this.loaded) {
        this.changeLoadStatus(false);
      }
    },

    handleViewerLoad() {
      try {
        get(this.$refs.viewer.contentWindow, 'location');

        this.changeLoadStatus(true);
      } catch (err) {
        this.error =
          'Page is not loaded. Try load other page or reload current.';
      } finally {
        this.changeLoadingStatus(false);
      }
    },
  },

  components: {
    BrowserControls,
  },
};
</script>

<style lang="postcss">
.browser {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.browser__controls {
  flex: 0 0 auto;
  position: relative;
  z-index: 1;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
