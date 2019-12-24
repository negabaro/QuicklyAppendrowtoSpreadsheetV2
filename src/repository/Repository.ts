import axios, { AxiosResponse } from 'axios';
import { getSyncStorage } from '@/utils/storage';
import { getSpreadsheetId, doneNotification } from '@/utils/index';
import { getToken, revokeToken } from '@/utils/oauth';

const rootPath = `https://sheets.googleapis.com/v4/spreadsheets`;

export const fetchGet = async <T>(path: string): Promise<T> => {
	const res = await fetch(`${rootPath}/${path}`);
	const data = await res.json();
	return data;
};

export default {
	async get(path: string, config = {}) {
		const accessToken: any = await getToken();
		console.log('get accessToken', accessToken);
		// const accessToken: any = await getSyncStorage('token');
		const spreadsheetUrl: any = await getSyncStorage('spreadsheetUrl');
		const spreadsheetId: string = getSpreadsheetId(spreadsheetUrl.spreadsheetUrl);
		return axios({
			method: 'GET',
			url: `${rootPath}/${spreadsheetId}/${path}`,
			headers: {
				Authorization: 'Bearer ' + accessToken,
				'Content-Type': 'application/json',
			},
			...config,
		})
			.then((res: AxiosResponse) => {
				doneNotification('GET成功しました');
				// UIkit.notification('🎉Done!', { status: 'success', timeout: 3000, pos: 'bottom-left' });
				return res.data;
			})
			.catch(err => {
				console.error('api request failed', err);
				doneNotification('GET失敗しました', 'danger');
				if (this.status === 401) {
					// retry = false;
					revokeToken();
				}
				// throw new Error('api request failed');
			});
	},
	async post(path: string, config = {}) {
		const accessToken: any = await getToken();

		// const accessToken: any = await getSyncStorage('token');
		const spreadsheetUrl: any = await getSyncStorage('spreadsheetUrl');
		const spreadsheetId: string = getSpreadsheetId(spreadsheetUrl.spreadsheetUrl);

		return axios({
			method: 'POST',
			url: `${rootPath}/${spreadsheetId}/${path}`,
			data: {
				...config,
			},
			headers: {
				Authorization: 'Bearer ' + accessToken,
				'Content-Type': 'application/json',
			},
		})
			.then((res: AxiosResponse) => {
				doneNotification('POST成功しました');
				return res.data;
			})
			.catch(err => {
				console.error('post api request failed', err);
				doneNotification('POST失敗しました', 'danger');
				if (this.status === 401) {
					// retry = false;
					revokeToken();
				}
			});
	},
};
