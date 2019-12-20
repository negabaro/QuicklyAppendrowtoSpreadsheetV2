export const getSyncStorage = (key: string) =>
	new Promise(resolve => {
		chrome.storage.sync.get(key, resolve);
	});

export const setSyncStorage = (payload: Object) =>
	new Promise(resolve => {
		chrome.storage.sync.set(payload, resolve);
	});

//= ========================

export const setStorage = async (payload: Object) => {
	chrome.storage.sync.set(payload, function() {
		console.log('saved result22 :');
	});
};

export const getStorage = (key: string) => {
	let res;
	chrome.storage.sync.get(key, result => {
		res = result;
		console.log('created:', result);
	});

	return res;
};

export const getAllStorage = () => {
	chrome.storage.sync.get(null, result => {
		// this.serviceType = result.getCommentCnt;
		console.log('created:', result);
	});
};

export const removeStorage = (key: string) => {
	chrome.storage.sync.remove(key, function(data: Object) {
		console.log('Successfully deleted', data);
	} as any);
};
