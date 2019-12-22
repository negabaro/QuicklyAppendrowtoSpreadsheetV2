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
	</div>
</template>

<script>
import { getToken, revokeToken } from '@/utils/oauth';
import { filterSheets } from '@/utils/index';
import { getStorage, getSyncStorage, setSyncStorage } from '@/utils/storage';
import Repository from '@/repository/Repository';
export default {
	props: ['isLogin'],
	data() {
		return {
			VMspreadsheetURL: '',
			syncSheets: [],
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
			const res2 = await Repository.get('');
			const res3 = filterSheets(res2.sheets);
			const res4 = await setSyncStorage({ sheets: res3 });
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
