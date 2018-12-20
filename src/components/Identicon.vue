<template>
  <img class="identicon" :src="image" :alt="address" />
</template>

<script>
import blockie from 'ethereum-blockies-base64';

export default {
  name: 'Identicon',

  props: {
    address: {
      type: String,
      required: true,
    },
  },

  computed: {
    image() {
      return blockie(this.address);
    },
  },
};
</script>

<style lang="postcss">
.identicon {
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
