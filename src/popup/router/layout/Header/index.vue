<template>
	<ul uk-tab>
		<li class="uk-active">
			<router-link to="/post">post</router-link>
		</li>
		<li>
			<router-link to="/settings">settings</router-link>
		</li>
		<li>
			<router-link to="/help"><span uk-icon="question"></span></router-link>
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
