<template>
	<div id="post">
		<div v-if="VMsheets.length">
			<div class="uk-margin">
				<div class="uk-form-controls">
					<select class="uk-select uk-form-select" @change="onChange($event)" v-model="VMselectedSheet">
						<option v-for="(sheet, key) in VMsheets" :key="key" v-bind:value="sheet.title">
							{{ sheet.title }}
						</option>
					</select>
				</div>
			</div>
			<hr />
			<div class="uk-margin">
				<label class="uk-form-label" for="form-spreadsheet-url">title</label>
				<div class="uk-form-controls">
					<input
						class="uk-input"
						id="form-title"
						type="text"
						placeholder="xxx"
						v-model="VMtitle"
						style="max-width:79%"
					/>
				</div>
			</div>
			<hr />
			<div class="uk-margin">
				<label class="uk-form-label" for="form-spreadsheet-url">url</label>
				<div class="uk-form-controls">
					<input
						class="uk-input"
						id="form-url"
						type="text"
						placeholder="https://xxx"
						v-model="VMurl"
						style="max-width:79%"
					/>
				</div>
			</div>
			<hr />
			<div class="uk-margin">
				<label class="uk-form-label" for="form-spreadsheet-url">memo</label>
				<div class="uk-form-controls">
					<textarea
						class="uk-textarea"
						id="form-memo"
						type="text"
						placeholder="memo"
						v-model="VMmemo"
						style="max-width:100%;max-height:100%"
					/>
				</div>
			</div>
			<hr />
			<div class="uk-margin">
				<div class="uk-form-controls">
					<button disalbed v-on:click="saveData" class="uk-button uk-button-primary" style="max-width:20%">
						save
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getSyncStorage, setSyncStorage } from '@/utils/storage';
import Repository from '@/repository/Repository';
import { doneNotification } from '@/utils/index';
export default {
	props: ['isLogin'],
	data() {
		return {
			VMselectedSheet: '',
			VMsheets: [],
			VMtitle: '',
			VMurl: '',
			VMmemo: '',
		};
	},
	async created() {
		const sheets = await getSyncStorage('sheets');
		this.VMsheets = sheets.sheets;
		const selectedSheets = await getSyncStorage('selectedSheets');
		this.VMselectedSheet = selectedSheets.selectedSheets;
	},

	methods: {
		async onChange(event) {
			// console.log(event.target.value);
			const res1 = await setSyncStorage({ selectedSheets: event.target.value });
		},
		async saveData() {
			const res2 = await Repository.get(`values/${this.VMselectedSheet}!D1:D10000`);
			const latestRow = res2.values.length;
			const data = {
				data: [],
				valueInputOption: 'USER_ENTERED',
			};
			if (!this.VMmemo) {
				this.VMmemo = 'default';
			}
			const config = {
				data: [
					{
						range: `${this.VMselectedSheet}!B${latestRow + 1}:D${latestRow + 1}`,
						majorDimension: 'ROWS',
						values: [[this.VMtitle, this.VMurl, this.VMmemo]],
					},
				],
				valueInputOption: 'USER_ENTERED',
			};

			const res3 = await Repository.post('values:batchUpdate', config);
			console.log('re3!!!:', res3);
			// const res1 = await setSyncStorage({ url: this.VMspreadsheetURL });
			doneNotification(res3);
		},
	},
};
</script>

<style lang="scss" scoped></style>
