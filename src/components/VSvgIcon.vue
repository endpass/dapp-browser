<template>
  <svg
    :class="className"
    :width="width"
    :height="height"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script>
import get from 'lodash/get';

export default {
  name: 'VSvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: [String],
      default: '20px',
    },
    fill: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '20px',
    },
  },
  computed: {
    iconPath() {
      const block = require(`@/assets/icons/${this.name}.svg`);
      const url = get(block, 'default.url');
      return url;
    },
    className() {
      return `svg-icon svg-icon--${this.name}`;
    },
  },
};
</script>

<style lang="postcss">
.svg-icon {
  margin: 0 auto;
}
</style>
