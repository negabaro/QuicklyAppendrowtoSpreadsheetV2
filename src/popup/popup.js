import Vue from 'vue';
import App from './App';
import router from './router';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// import * as Notification from 'uikit/dist/js/components/notification.js';
import './css/popup.css';

Vue.prototype.$browser = global.browser;

// loads the Icon plugin
UIkit.use(Icons);
window.UIkit = UIkit;

// UIkit.use(Notification);
// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	router,
	render: h => h(App),
});
