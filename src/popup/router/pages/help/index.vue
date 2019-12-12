<template>
	<div id="help">
		<h4>Setup</h4>
		<ol>
			<li>
				Copy
				<a
					href="https://script.google.com/a/hatena.ne.jp/d/1lQRnlGtN_M8oT4QaRXXdMnE4We81QsYd6ms4c7X1uUEbjSu9M8Hv3-Cp/edit?usp=drive_web"
					target="_blank"
				>
					this AppsScript file.
				</a>
			</li>
			<li>
				<a href="https://developers.google.com/apps-script/guides/web#deploying_a_script_as_a_web_app" target="_blank">
					Deploy as web app.
				</a>
			</li>
			<li>
				<a href="https://developers.google.com/apps-script/guides/services/authorization" target="_blank">
					Run the script and granting access rights
				</a>
			</li>
			<li>Copy "Current web app URL".</li>
			<li>Paste it in the "Script Current web app URL" of the setting tab.</li>
			<li>Create Spreadsheet and enter column name.</li>
			<ul>
				<li>Special column name entered automatically input</li>
				<ul>
					<li>URL - current tab url</li>
					<li>created_at - date created</li>
				</ul>
				<li>Register data validation (List of imtes) on the second row you can also use it on the chrome extension.</li>
			</ul>
			<li>Paste it in the "Spreadsheet URL" of the setting tab and click "SYNC" button.</li>
			<li>Click "Add" button.</li>
		</ol>
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
