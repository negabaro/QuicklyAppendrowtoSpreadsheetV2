<template>
	<div id="post">
		<div v-if="VMsheets.length">
			<div class="uk-margin">
				<div class="uk-form-controls">
					<v-select
						@input="onChangeSheetSelect"
						@selected="changedLabel"
						v-model="VMselectedSheet"
						:options="VMsheets.map(g => ({ label: g.title, value: g.title }))"
					></v-select>
					<!-- 
					<select class="uk-select uk-form-select" @change="onChange($event)" v-model="VMselectedSheet">
						<option v-for="(sheet, key) in VMsheets" :key="key" v-bind:value="sheet.title">
							{{ sheet.title }}
						</option>
					</select>-->
				</div>
			</div>
			<hr />
			<div class="uk-margin">
				<label class="uk-form-label" for="form-spreadsheet-url">title</label>
				<div class="uk-form-controls">
					<input
						@change="onChangeTitle($event)"
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
						@change="onChangeUrl($event)"
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
						@change="onChangeMemo($event)"
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
			// groupsData: groups,
			// selected: [],
		};
	},
	async created() {
		const sheets = await getSyncStorage('sheets');
		this.VMsheets = sheets.sheets;
		const selectedSheets = await getSyncStorage('selectedSheets');
		this.VMselectedSheet = selectedSheets.selectedSheets;

		const title = await getSyncStorage('title');
		this.VMtitle = title.title;

		const url = await getSyncStorage('url');
		this.VMurl = url.url;

		const memo = await getSyncStorage('memo');
		this.VMmemo = memo.memo;
	},
	computed: {
		selectOptions() {
			return this.groupsData.map(g => ({ label: g.group_name, value: g.id }));
		},
	},
	methods: {
		setSelected(value) {
			console.log('setSelected', value);
			//  trigger a mutation, or dispatch an action
		},
		async resetData() {
			await setSyncStorage({ title: '' });
			await setSyncStorage({ url: '' });
			await setSyncStorage({ memo: '' });
		},
		changedValue: function(value) {
			console.log('changedValue', value);
			// receive the value selected (return an array if is multiple)
		},
		changedLabel: function(label) {
			console.log('changedLabel', label);
			// receive the label of the value selected (the label shown in the select, or an empty string)
		},
		async onChangeSheetSelect(selectObj) {
			console.log('onChangeSheetSelect', selectObj);
			const res1 = await setSyncStorage({ selectedSheets: selectObj.value });
			// const res1 = await setSyncStorage({ selectedSheets: event.target.value });
		},
		async onChangeTitle(event) {
			const res1 = await setSyncStorage({ title: event.target.value });
		},
		async onChangeUrl(event) {
			const res1 = await setSyncStorage({ url: event.target.value });
		},
		async onChangeMemo(event) {
			const res1 = await setSyncStorage({ memo: event.target.value });
		},
		async saveData() {
			if (this.VMselectedSheet.value) {
				this.VMselectedSheet = this.VMselectedSheet.value;
			}
			console.log('this.VMselectedSheet', this.VMselectedSheet);
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

			await this.resetData();
		},
	},
};
</script>

<style lang="scss" scoped></style>
