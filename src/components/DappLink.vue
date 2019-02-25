<template>
  <button
    class="dapp-link"
    type="button"
    :title="title"
    name="button"
    @click="emitClick"
  >
    <img class="dapp-link__icon" :src="icon" :alt="name" />
    <span class="dapp-link__name">
      {{ name }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'DappLink',

  props: {
    icon: {
      name: String,
      required: true,
    },
    name: {
      name: String,
      required: true,
    },
    title: {
      name: String,
      required: true,
    },
  },
  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="postcss">
.dapp-link {
  padding: 5px;
  background: transparent;
  display: flex;
  border: none;
  cursor: pointer;
  width: 120px;
}

.dapp-link__icon {
  flex: 0 0 auto;
  display: flex;
  max-width: 20px;
}

.dapp-link__name {
  display: block;
  flex: 1 1 auto;
  text-align: left;
  line-height: 20px;
  margin-left: 7px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
