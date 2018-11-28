<template>
  <div class="template-tabbar">
    <van-tabbar v-model="model.active">
      <van-tabbar-item v-for="(item,i) in model.items" v-bind:key="i" :to="item.link">
        <icon :name="item.icon" slot="icon" />{{item.name}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
 
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  props: {
    model: {
      type: [Object],
      default: () => {
        return {
          active: 0,
          items: [{ icon: "", name: "", link: {} }]
        };
      }
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";
.template-tabbar {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: $color-black-tint;
  &__value {
    font-size: 16px;
  }
  .van-tabbar {
    min-height: $tabbar-height;
    max-height: $tabbar-height;
  }
}
</style>



