<template>
  <div class="home-item">
    <div class="home-item__name">
      \{{name}}
    </div>
    <div class="home-item__value">
      \{{value}}
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: [String, Number]
    },
    value: {
      type: [String, Number]
    }
  }
};
</script>


<style lang="scss">
@import "../../styles/variables.scss";
.home-item {
  line-height: 30px;
  width: 100%;
  display: flex;
  &__name {
    flex: 1;
  }
  &__value {
  }
}
</style>