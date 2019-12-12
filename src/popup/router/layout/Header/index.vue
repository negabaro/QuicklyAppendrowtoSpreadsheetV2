<template>
	<ul uk-tab>
		<li>
			<router-link to="/post">post</router-link>
		</li>
		<li class="uk-active">
			<router-link to="/">setting</router-link>
		</li>
		<li>
			<router-link to="/question"><span uk-icon="question"></span></router-link>
		</li>
	</ul>
</template>

<script>
export default {
	data: function() {
		return {};
	},
};
</script>
