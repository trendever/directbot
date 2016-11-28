import Vue from 'vue'
import Router from 'vue-router'

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
		  component: require('views/chat-list')
		},
    {
      name: 'chat',
      path: '/chat/:id',
      components: require('views/chat/index')
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

  next();

});

export default router;
