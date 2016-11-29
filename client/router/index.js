import Vue from 'vue'
import Router from 'vue-router'
import Popup from '../views/popup/index'

Vue.use(Router)

let router = new Router({

	saveScrollPosition: true,

	mode: 'history',

	scrollBehavior (to, from, savedPosition) {

    let item = `${to.name}.scroll`;

    window.scrollTo(0, +localStorage.getItem(item));

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
      component: require('views/chat/index')
    },
    {
      name: 'auth',
      path: '/auth',
      component: require('views/auth/index')
    },

    {
      name: 'chat_zoom',
      path: '/chat_zoom',
    },
    {
      name: 'confirm',
      path: '/confirm',
      component: require('views/auth/confirm')
    },

    {
      name: 'product_detail',
      path: '/product/:id',
      component: require('views/product-detail/index.vue')
    },

    {
      name: 'popup',
      path: '/popup/:id',
      component: Popup
    },
    {
      name: 'user',
      path: '/:id',
      require: require('views/profile/index')

    },
    {
      name: 'profile',
      path: '/:id',
      component: require('views/profile/index')
    },
    {
      name: 'user',
      path: '/user',
      component: require('views/profile/index')
    },
	]
})

router.beforeEach((to, from, next)=>{

  localStorage.setItem(`${from.name}.scroll`, window.scrollY);

  next();

});

export default router;
