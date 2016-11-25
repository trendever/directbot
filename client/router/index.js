import Vue from 'vue'
import Router from 'vue-router'
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
      component: require('views/home/index.vue')
		},
		{
		  name: 'chat_list',
		  path: '/chat',
		  component: ChatList
		},
    {
      name: 'auth',
      path: '/auth',
      component: require('views/auth/index')
    },
    {
      name: 'confirm',
      path: '/confirm',
      component: require('views/auth/confirm')
    },
    {
      name: 'profile',
      path: '/:id',
      component: require('views/profile/index')
    },
	]
})

router.beforeEach((to, from, next)=>{

/*  localStorage.setItem(`${from.name}.scroll`, window.scrollY);

  let item = `${to.name}.scroll`;

  window.scrollTo(0, +localStorage.getItem(item));*/

  next();

});

export default router;
