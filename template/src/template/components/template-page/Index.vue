<template>
  <div class="template-page">
    <div class="template-page__title">
      <slot name="title" />
    </div>
    <div class="template-page__content">
      <slot />
    </div>
    <div class="template-page__foot">
      <slot name="foot" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";
.template-page {
  background-color: $color-background;
  color: $color-black;
  &__title {
    max-width: $body-max-width;
    min-width: $body-min-width;
    width: 100%;
    position: fixed;
    padding: 0px;
    top: 0px;
  }
  &__content {
    margin-top: $nav-bar-height;
    padding: 0px;
  }
  &__foot {
    width: 100%;
    padding: 0px;
    margin-bottom: $tabbar-height;
    .van-tabbar--fixed {
      left: auto;
      right: auto;
      bottom: 0px;
      position: fixed;
    }
    .van-tabbar {
      max-width: $body-max-width;
      min-width: $body-min-width;
    }
  }
}
</style>





 