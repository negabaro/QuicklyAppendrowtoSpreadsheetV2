import Account from './pages/account';
import Option from './pages/option';
import About from './pages/about';
import Settings from './pages/settings';
import Post from './pages/post';

export default [
	{
		name: 'Settings',
		path: '/',
		component: Settings,
	},
	{
		name: 'Post',
		path: '/post',
		component: Post,
	},
];
