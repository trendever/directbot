import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import ChatList from '../views/ChatList'
Vue.use(Router)

export default new Router({

	saveScrollPosition: true,

	mode: 'history',

	scrollBehavior (to, from, savedPosition) {
		localStorage.setItem(`${from.name}.scroll`, window.scrollY);
		let item = `${to.name}.scroll`;
		window.scrollTo(0, +localStorage.getItem(item));
	},
	routes: [
		{
      name: 'home',
		  path: '/',
		  component: Home
		},
		{
		  name: 'chat_list',
		  path: '/chat',
		  component: ChatList
		},
    {
      name: 'auth',
      path: '/auth',
      component: require('../views/auth')
    },
    {
      name: 'confirm',
      path: '/confirm',
      component: require('../views/auth/confirm')
    }
	]
})

