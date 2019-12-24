import Vue from 'vue';
import vSelect from 'vue-select';
import App from './App';
import router from './router';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// import * as Notification from 'uikit/dist/js/components/notification.js';
import './css/popup.css';
import 'vue-select/dist/vue-select.css';
Vue.prototype.$browser = global.browser;

Vue.component('v-select', vSelect);
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
