<template>
  <div class="color-item">
    <home-item :name="name">
      <div :style="getStyle()" class="color-item__value">
        {{value}}
      </div>
    </home-item>
  </div>
</template>

<script>
import HomeItem from "./HomeItem.vue";
export default {
  props: {
    background: {
      type: [String, Number],
      default: "#FFFFFF"
    },
    foreground: {
      type: [String, Number],
      default: "#000000"
    },
    border: {
      type: [String, Number],
      default: ""
    },
    value: {
      type: [String, Number],
      default: "#000000"
    },
    name: {
      type: [String, Number],
      default: "#000000"
    }
  },
  components: {
    HomeItem
  },
  methods: {
    getStyle() {
      let style = { backgroundColor: this.background, color: this.foreground };
      style.border = this.border
        ? "1px solid " + this.border
        : "1px solid " + this.background;
      return style;
    }
  }
};
</script>
<style lang="scss">
.color-item {
  font-size: 14px;
  padding: 0px 0px;
  &__value {
    line-height: 28px;
    max-width: 100px;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px 1px;
    // font-weight: bold;
  }
}
</style>

 