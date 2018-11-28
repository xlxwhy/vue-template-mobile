<template>
	<div id="app" class="app">
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
	</div>
</template>

<script>
import "./styles/app.scss"; // global css
export default {
  name: "App"
};
</script>


<style lang="scss" scoped>
@import "vant/lib/vant-css/icon-local.css";
</style>

