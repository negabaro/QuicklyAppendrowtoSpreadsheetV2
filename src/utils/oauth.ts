import { setStorage, removeStorage } from '@/utils/storage';

export const getToken = () => {
	chrome.identity.getAuthToken({ interactive: true }, function(token) {
		console.log('token!!zz', token);
		if (token) {
			setStorage({ token: token });
		}
	});
};

export const revokeToken = () => {
	chrome.identity.getAuthToken({ interactive: false }, function(currentToken) {
		if (!chrome.runtime.lastError) {
			// @corecode_begin removeAndRevokeAuthToken
			// @corecode_begin removeCachedAuthToken
			// Remove the local cached token
			chrome.identity.removeCachedAuthToken({ token: currentToken }, function() {});
			// @corecode_end removeCachedAuthToken

			// Make a request to revoke token in the server
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + currentToken);
			xhr.send();
			// @corecode_end removeAndRevokeAuthToken

			// Update the user interface accordingly
			// changeState(STATE_START);
			removeStorage('token');
			console.log('Token revoked and removed from cache. ' + 'Check chrome://identity-internals to confirm.');
		}
	});
};
