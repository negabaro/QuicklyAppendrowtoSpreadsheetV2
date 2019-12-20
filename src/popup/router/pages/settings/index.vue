<template>
	<div id="settings">
		<div class="uk-margin">
			<label class="uk-form-label" for="form-spreadsheet-url">Spreadsheet URL</label>
			<div class="uk-form-controls">
				<input
					class="uk-input"
					id="form-spreadsheet-url"
					type="text"
					placeholder="https://docs.google.com/spreadsheets/d/******/edit"
					v-model="VMspreadsheetURL"
					style="max-width:79%"
				/>
				<button disalbed v-on:click="updateData" class="uk-button uk-button-primary" style="max-width:20%">
					Save
				</button>
			</div>
		</div>
		<hr />
		<div class="uk-margin">
			<label class="uk-form-label" for="form-spreadsheet-url">sync/revoke</label>
			<div class="uk-form-controls">
				<button disalbed v-on:click="handleClickSync" class="uk-button uk-button-primary" style="max-width:20%">
					Sync
				</button>
				<button v-on:click="handleClickRevoke" class="uk-button uk-button-default" style="max-width:20%">
					revoke
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
import { getToken, revokeToken } from '@/utils/oauth';
import { getStorage, getSyncStorage, setSyncStorage } from '@/utils/storage';
// import { BADGE_TYPE } from '@/utils';
// import mixin from '../../mixin/mixin';
export default {
	props: ['isLogin'],
	data() {
		return {
			VMspreadsheetURL: '',
			num: 5,
			value: '',
			serviceType: null,
			saved: false,
			reset: false,
		};
	},
	async created() {
		const spreadhsheetUrl = await getSyncStorage('spreadsheetUrl');
		this.VMspreadsheetURL = spreadhsheetUrl.spreadsheetUrl;
	},

	methods: {
		async handleClickSync(e) {
			const res = await getToken();
			const res1 = await setSyncStorage({ token: res });
		},
		handleClickRevoke() {
			revokeToken();
		},
		async updateData() {
			const res1 = await setSyncStorage({ spreadsheetUrl: this.VMspreadsheetURL });
		},
		resetData() {},
	},
};
</script>

<style lang="scss" scoped></style>
