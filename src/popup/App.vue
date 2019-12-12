<template>
	<div id="app" class="uk-padding-small">
		<Header />
		<router-view />
	</div>
</template>

<script>
import Header from './router/layout/Header';

export default {
	components: {
		Header,
	},
	data() {
		return {
			loading: false,
			themeType: 'dark',
		};
	},
};
</script>
<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
</style>
