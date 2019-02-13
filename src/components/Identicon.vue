<template>
  <div class="identicon">
    <img
      v-if="authorized"
      :src="image"
      :alt="address"
      :title="address"
    />
    <VSvgIcon
      v-else
      :width="'20px'"
      :height="'16px'"
      name="account-login"
    />
  </div>
</template>

<script>
import blockie from 'ethereum-blockies-base64';
import VSvgIcon from './VSvgIcon.vue';

export default {
  name: 'Identicon',

  props: {
    authorized: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      default: '',
    },
  },

  computed: {
    image() {
      return this.address && blockie(this.address);
    },
  },
  components: {
    VSvgIcon,
  },
};
</script>

<style lang="postcss">
.identicon {
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e2e2e2;
  box-sizing: content-box;

  img {
    width: 32px;
    height: 32px;
  }
}
</style>
