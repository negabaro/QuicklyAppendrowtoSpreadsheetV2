<template>
	<div id="option">
		post page
	</div>
</template>

<script>
// import { BADGE_TYPE } from '@/utils';
// import mixin from '../../mixin/mixin';
export default {
	props: ['isLogin'],
	data() {
		return {
			num: 5,
			options: [
				{
					value: '50',
					label: '50',
				},
				{
					value: '100',
					label: '100',
				},
				{
					value: '300',
					label: '300',
				},
				{
					value: '500',
					label: '500',
				},
				{
					value: '9999999999999',
					label: '전체',
				},
			],
			value: '',
			serviceType: null,
			saved: false,
			reset: false,
		};
	},
	created() {
		chrome.storage.sync.get(null, result => {
			this.serviceType = result.getCommentCnt;
			console.log('created:', result);
		});
		/*
    this.$root.$on('updated', () => {
      chrome.storage.sync.get(null, result => this.init(result));
    }); */
	},

	methods: {
		save(payload) {
			console.log('payload', payload);
			chrome.storage.sync.set(payload, result => {
				console.log('saved result :', result);
			});

			chrome.storage.local.set(payload, function() {
				console.log('saved result22 :');
			});

			console.log('this.serviceType!!', this.serviceType);

			// this.serviceType = this.value;
		},

		updateData() {
			const payload = {
				getCommentCnt: this.serviceType,
			};
			// this.save(payload, 'updated');
			this.save(payload);
			this.saved = true;
			setTimeout(() => {
				this.saved = false;
			}, 3000);
		},
		resetData() {},
		handleClick() {
			this.updateData();
		},
	},
};
</script>

<style lang="scss" scoped></style>
