import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import ChatList from '../views/ChatList'
Vue.use(Router)

export default new Router({
	saveScrollPosition: true,
	mode: 'hash',
    scrollBehavior (to, from, savedPosition) {
        console.log("DEBUG")
        console.log(to)
        console.log(from)
        console.log(savedPosition)
        return { x: 0, y: 100 }
    },
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
