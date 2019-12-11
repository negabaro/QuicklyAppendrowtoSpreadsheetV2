<template>
	<div id="app" class="uk-padding-small">
		<Header />
		<!-- <Content /> -->
	</div>
</template>

<script>
import Header from './router/layout/Header';
import Content from './router/layout/Content';

export default {
	components: {
		Header,
		// Content,
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
