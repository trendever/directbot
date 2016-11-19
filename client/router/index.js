import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import ChatList from '../views/ChatList'
Vue.use(Router)

export default new Router({
	saveScrollPosition: true,
	mode: 'hash',
	routes: [
		{
          name: 'home',
		  path: '/',
		  component: Home
		},
		{
		  name: 'chat',
		  path: '/chat',
		  component: ChatList
		},
	]
})
