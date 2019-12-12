<template>
	<div id="settings">
		<div class="uk-margin">
			<label class="uk-form-label" for="form-script-url">Script Current web app URL</label>
			<div class="uk-form-controls">
				<input
					class="uk-input"
					id="form-script-url"
					type="text"
					placeholder="https://script.google.com/macros/s/******/exec"
					style="max-width:79%"
				/>
				<button class="uk-button uk-button-primary" style="max-width:20%">
					SAVE
				</button>
			</div>
		</div>
		<hr />
		<div class="uk-margin">
			<label class="uk-form-label" for="form-spreadsheet-url">Spreadsheet URL</label>
			<div class="uk-form-controls">
				<input
					class="uk-input"
					id="form-spreadsheet-url"
					type="text"
					placeholder="https://docs.google.com/spreadsheets/d/******/edit"
					style="max-width:79%"
				/>
				<button class="uk-button uk-button-default" style="max-width:20%">
					Sync
				</button>
			</div>
		</div>

		<!-- <ul class="uk-list uk-list-divider uk-margin-small-top">
			<li v-for="sheet in syncSheets">
				<div style="float:left">
					<span class="sub">{{ sheet.spreadsheetName }}</span>
					<h6 class="uk-margin-remove">{{ sheet.sheetName }}</h6>
				</div>
				<button
					v-if="!sheet.added"
					class="uk-button uk-button-small uk-button-primary"
					style="float:right"
					@click="
						addSheet(sheet);
						sheet.disabled = true;
					"
					:disabled="sheet.disabled"
				>
					add
				</button>
				<button
					v-if="sheet.added"
					class="uk-button uk-button-small uk-button-primary"
					style="float:right"
					@click="
						updateSheet(sheet);
						sheet.disabled = true;
					"
					:disabled="sheet.disabled"
				>
					update
				</button>
			</li>
		</ul>-->
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
