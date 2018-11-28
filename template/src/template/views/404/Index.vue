<template>
    <div class="p404-container">
        <div class="p404-container__title">
            <template-nav-bar title="找不到您指定的页面" />
        </div>
        <div class="p404-container__content">
            <div>
                <div class="p404-container__icon">
                    <icon name="blank" />
                </div>
                <div class="p404-container__message">
                    404:Page Not Found
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import TemplateNavBar from "../../components/template-nav-bar/Index.vue";
export default {
  components: {
    TemplateNavBar
  }
};
</script>

<style lang="scss">
.p404-container {
  height: 100%;
  &__content {
    display: flex;
    justify-content: center;
    padding: 100px 0px 0px 0px;
  }
  &__icon {
    font-size: 160px;
  }
  &__message {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
