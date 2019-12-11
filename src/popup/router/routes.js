import Account from './pages/account';
import Option from './pages/option';
import About from './pages/about';

export default [
	{
		icon: 'el-icon-setting',
		name: 'Option',
		path: '/',
		component: Option,
	},
	{
		icon: 'el-icon-bell',
		name: 'Information',
		path: '/about',
		component: About,
	},
];
