import axios, { AxiosResponse } from 'axios';
import { getSyncStorage } from '@/utils/storage';
import { getSpreadsheetId } from '@/utils/index';
const rootPath = `https://sheets.googleapis.com/v4/spreadsheets`;

export const fetchGet = async <T>(path: string): Promise<T> => {
	const res = await fetch(`${rootPath}/${path}`);
	const data = await res.json();
	return data;
};

export default {
	async get(path: string, config = {}) {
		const accessToken: any = await getSyncStorage('token');
		const spreadsheetUrl: any = await getSyncStorage('spreadsheetUrl');
		const spreadsheetId: string = getSpreadsheetId(spreadsheetUrl.spreadsheetUrl);

		return axios({
			method: 'GET',
			url: `${rootPath}/${spreadsheetId}`,
			headers: {
				Authorization: 'Bearer ' + accessToken.token,
				'Content-Type': 'application/json',
			},
			...config,
		})
			.then((res: AxiosResponse) => res.data)
			.catch(err => console.error('api request failed', err));
	},
	post(path: string, config = {}) {
		return axios({
			method: 'POST',
			url: `${rootPath}/${path}`,
			...config,
		})
			.then((res: AxiosResponse) => res.data)
			.catch(err => console.error('api request failed', err));
	},
};
