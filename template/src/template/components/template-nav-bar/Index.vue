<template>
  <div class="template-nav-bar">
    <van-nav-bar left-arrow :title="title" :left-text="back.text" @click-left="onClickBack()" @click-right="onClickAction()">
      <div slot="right">
        <div v-if="action.show">
          {{ action.buttons[action.value].text }}
        </div>
        <slot name="right"></slot>
      </div>
    </van-nav-bar>

  </div>
</template>
 

 <script>
import { NavBar } from "vant";
export default {
  props: {
    title: {
      type: [String, Number],
      default: ""
    },
    back: {
      type: [Object],
      default: () => {
        return { text: "", link: {}, click: null };
      }
    },
    action: {
      type: [Object],
      default: () => {
        return {
          value: 0,
          buttons: [
            { text: "", link: {}, click: null },
            { text: "", link: {}, click: null }
          ]
        };
      }
    }
  },
  data() {
    return {};
  },

  components: {
    [NavBar.name]: NavBar
  },
  mounted() {},
  methods: {
    onClickBack() {
      this.onClick(this.back, this.$back);
    },
    onClickAction() {
      let button = this.action.buttons[this.action.value];
      this.onClick(button, null);
    },
    onClick(action, defaultClick) {
      if (action.url) {
        window.location.href = action.url;
        return;
      }
      if (action.link && (action.link.name || action.link.path)) {
        this.$router.push(action.link);
      } else {
        if (action.click) {
          action.click();
        } else {
          if (defaultClick) {
            defaultClick();
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";
.template-nav-bar {
  .van-hairline--bottom::after {
    transform: scale(0);
  }
  .van-nav-bar {
    color: $color-white;
    background-color: $color-primary;
    height: $nav-bar-height;
    .van-icon {
      color: $color-white;
    }
    &__title {
      height: $nav-bar-height;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__text {
      color: $color-white;
    }
  }
  background-color: $color-primary;
}
</style>





 
