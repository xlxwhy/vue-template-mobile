<template>
  <div class="home-block">
    <div class="home-block__title">
      {{title}}
      <slot name='title' />
    </div>
    <div class="home-block__content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number]
    }
  }
};
</script>


<style lang="scss">
@import "../../styles/variables.scss";
.home-block {
  padding: 0px 0px;
  &__title {
    padding: 5px 5px;
    color: $color-black;
    background-color: $color-black-tint;
    font-size: 20px;
    line-height: 40px;
    border-bottom: 1px solid $color-border;
  }
  &__content {
    background-color: $color-white;
    padding: 5px 5px 5px 15px;
  }
}
</style>