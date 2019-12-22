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

export const filterSheets = (addedSheets: any) => {
	console.log('addedSheets', addedSheets);
	const z = addedSheets.map((x: any) => {
		var y = { sheetId: '', title: '', index: 0 };

		y.sheetId = x.properties.sheetId;
		y.title = x.properties.title;
		y.index = x.properties.index;
		return y;
	});
	return z;
};
