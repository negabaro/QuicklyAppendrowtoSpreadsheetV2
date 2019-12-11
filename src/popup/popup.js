import Vue from 'vue';
import App from './App';
// import VueRouter from 'vue-router';
// import store from '../store';
import router from './router';
// Vue.prototype.$dayjs = dayjs;
//
// Vue.use(VueRouter);
// Vue.use(ElementUI, { locale });

/* eslint-disable no-new */
//
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// import ElementUI from 'element-ui';
// import locale from 'element-ui/lib/locale/lang/ko';
// import 'element-ui/lib/thesme-chalk/index.css';
// import '../style/main.scss';
Vue.prototype.$browser = global.browser;

// loads the Icon plugin
UIkit.use(Icons);
import './css/popup.css';

// components can be called from the imported UIkit reference
// UIkit.notification('Hello world.');

new Vue({
	el: '#app',
	// store,
	router,
	render: h => h(App),
});
