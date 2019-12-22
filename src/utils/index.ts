export const getSpreadsheetId = (spreadsheetUrl: string): any => {
	let spreadsheetId: string;
	const r1 = RegExp('/docs.google.com\\/spreadsheets\\/d\\/(.+)\\/edit');
	if (r1.test(spreadsheetUrl)) {
		const r2 = r1.exec(spreadsheetUrl);
		if (r2) {
			return r2[1];
		}
		throw new Error('URL parser result is null');
	} else {
		throw new Error('URL is incorrect');
	}
};
