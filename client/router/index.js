import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import ChatList from '../views/ChatList'
Vue.use(Router)

let router = new Router({

	saveScrollPosition: true,

	mode: 'history',

	scrollBehavior (to, from, savedPosition) {

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
      name: 'profile',
      path: '/:id',
      component: require('../views/profile/index.vue')
    },
    {
      name: 'auth',
      path: '/auth',
      component: require('../views/auth')
    },
    {
      name: 'confirm',
      path: '/confirm',
    }
	]
})

router.beforeEach((to, from, next)=>{

/*  localStorage.setItem(`${from.name}.scroll`, window.scrollY);

  let item = `${to.name}.scroll`;

  window.scrollTo(0, +localStorage.getItem(item));*/

  next();

});

export default router;
