<template>
  <div class="home-container">
    <template-page>
      <div slot="title">
        <template-nav-bar title="Template Home" />
      </div>

      <home-block title="Document"> 
        <home-item name="查看帮助文档(GitLab)">
          <a href="https://github.com/xlxwhy/vue-template-mobile/blob/master/README.md">点击查看</a>
        </home-item>
      </home-block>

      <home-block title="Template Projects" v-if="projects && Object.keys(projects).length>1">
        <home-item :name="projects[item]" v-for="(item,i) in Object.keys(projects)" v-bind:key="i">
          <a :href="projects[item]">点击查看</a>
        </home-item>
      </home-block>
      <home-block title="Template Test">
        <home-item name="测试svg显示">
          <div class="success">
            <icon name="selected" />
          </div>
        </home-item>
        {{#useCommonLayer }}
        <home-item name="测试common-layer中的MemberApi.js">
          <div v-if="test.api.state==0">
            <a href="#" @click="testMemberApi">点击测试</a>
          </div>
          <div v-if="test.api.state==1" class="warning">WAITING</div>
          <div v-if="test.api.state==2" class="success">
            <icon name="selected" />
          </div>
          <div v-if="test.api.state==3" class="error">错误：\{{test.api.message}}</div>
        </home-item>
        {{/useCommonLayer }}

        <home-item name="测试404页面">
          <router-link :to="{path:'/nizhaobudaowo'}">点击查看</router-link>
        </home-item>
        <home-item name="测试独立static资源: vue.jpg">
          <img src="../../static/vue/vue.jpg" width="20" height="20" alt="ERROR" />
        </home-item>
        <home-item name="测试独立static资源: vue.md">
          <a href="./static/vue/vue.md">vue.md</a>
        </home-item>

        <home-item name="测试共享static资源: webpack.jpg">
          <img src="@/../static/webpack/webpack.jpg" width="20" height="20" alt="ERROR" />
        </home-item>
        <home-item name="测试共享static资源: webpack.md">
          <a href="./static/webpack/webpack.md">webpack.md</a>
        </home-item>

      </home-block>
      <home-block title="Template Colors" class="colors">
        <color-item name="黑色" :background="colors.black" foreground="#FFF" :value="colors.black" />
        <color-item name="蓝色" :background="colors.blue" foreground="#FFF" :value="colors.blue" />
        <color-item name="红色" :background="colors.red" foreground="#FFF" :value="colors.red" />
        <color-item name="绿色" :background="colors.green" foreground="#FFF" :value="colors.green" />
        <color-item name="黄色" :background="colors.yellow" foreground="#FFF" :value="colors.yellow" />
        <color-item name="深浅黑色" :background="colors.blackTint" :foreground="colors.black" :value="colors.black" />
        <color-item name="深浅蓝色" :background="colors.blueTint" :foreground="colors.blue" :value="colors.blue" />
        <color-item name="深浅红色" :background="colors.redTint" :foreground="colors.red" :value="colors.red" />
        <color-item name="深浅绿色" :background="colors.greenTint" :foreground="colors.green" :value="colors.green" />
        <color-item name="深浅黄色" :background="colors.yellowTint" :foreground="colors.yellow" :value="colors.yellow" />
        <color-item name="背景色" :background="colors.background" :foreground="colors.black" :value="colors.background" />
        <color-item name="边框色" :background="colors.white" :foreground="colors.black" :value="colors.border" :border="colors.border" />
      </home-block>

      <div slot="foot">
        <template-tabbar :model="tabbar" />
      </div>
    </template-page>
  </div>
</template>
 
 <script>
import HomeBlock from "../../components/home/HomeBlock.vue";
import HomeItem from "../../components/home/HomeItem.vue";
import ColorItem from "../../components/home/ColorItem.vue";
import TemplateNavBar from "../../components/template-nav-bar/Index.vue";
import TemplateTabbar from "../../components/template-tabbar/Index.vue";
import TemplatePage from "../../components/template-page/Index.vue";
{{#useCommonLayer }}
import MemberApi from "common-layer/apis/infra-member/MemberApi.js"; 
{{/useCommonLayer }}
import VueProjects from "@/../static/vue-projects.js";
export default {
  data() {
    return {
      projects: VueProjects,
      test: {
        api: {
          state: 0,
          message: ""
        }
      },
      colors: {
        primary: "#20A0FF",
        primaryTint: "#B0DEFF",
        blue: "#20A0FF",
        blueTint: "#B0DEFF",
        red: "#E4393C",
        redTint: "#F8C9CA",
        yellow: "#FF9900",
        yellowTint: "#FFE0B3",
        green: "#44B549",
        greenTint: "#C8EACA",
        black: "#333333",
        blackTint: "#F4F4F4",
        border: "#E4E4E4",
        background: "#F2F2F2",
        gray6: "#666666",
        gray9: "#999999",
        white: "#FFFFFF"
      },
      tabbar: {
        active: 0,
        items: [
          {
            icon: "home",
            name: "首页",
            link: {
              path: "/franchise/workbench/operator",
              query: this.$route.query
            }
          },
          {
            icon: "msg",
            name: "消息",
            link: { path: "/franchise/message/list", query: this.$route.query }
          },
          {
            icon: "order",
            name: "订单",
            link: { path: "/franchise/message/list", query: this.$route.query }
          },
          {
            icon: "buyer",
            name: "会员中心",
            link: { path: "/franchise/list" }
          }
        ]
      }
    };
  },
  mounted() {
    // this.testMemberApi();
  },
  components: {
    HomeBlock,
    HomeItem,
    ColorItem,
    TemplateNavBar,
    TemplateTabbar,
    TemplatePage
  },
  methods: {
    testMemberApi() {
      this.test.api.state = 1;
      {{#useCommonLayer }}
      MemberApi.isSignin(
        {},
        res => {
          this.test.api.state = 2;
        },
        err => {
          if (err.code) {
            this.test.api.state = 2;
          } else {
            this.test.api.state = 3;
            this.test.api.message = err.statusCode;
          }
        }
      );
      {{/useCommonLayer }}
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";
.home-container {
  .success {
    color: $color-green;
  }
  .warning {
    color: $color-yellow;
  }
  .error {
    color: $color-red;
  }

  .colors {
    background-color: $color-white;
  }
}
</style>



