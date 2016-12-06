import Vue from 'vue'
import Router from 'vue-router'
import Popup from '../views/popup/index'

Vue.use(Router)

let router = new Router({

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

    //CHAT
    {
      name: 'chat_zoom',
      path: '/chat/zoom',
      component: require('components/popup-img/routed')
    },
    {
      name: 'chat',
      path: '/chat/:id',
      component: require('views/chat/index')
    },

    //AUTH
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
      name: 'list',
      path: '/list',
      component: require('views/test/list.vue')
    },
    {
      name: 'monetization',
      path: '/monetization',
      component: require('views/monetization')
    },
    {
      name: 'connect-bot',
      path: '/connect-bot',
      component: require('views/connect-bot')
    },
    {
      name: 'profile',
      path: '/profile',
      component: require('views/profile/index')

    },
    {
      name: 'user',
      path: '/:id',
      component: require('views/profile/index')
    }
	]
})

router.beforeEach((to, from, next)=>{

  localStorage.setItem(`${from.name}.scroll`, window.scrollY);

  next();

});

export default router;
