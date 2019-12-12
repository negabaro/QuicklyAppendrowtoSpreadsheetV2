import Settings from './pages/settings';
import Post from './pages/post';
import Help from './pages/help';
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
	{
		name: 'Help',
		path: '/help',
		component: Help,
	},
];
