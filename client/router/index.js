import Vue from 'vue'
import Router from 'vue-router'
import Popup from '../views/popup/index'

Vue.use(Router)

let router = new Router({

	mode: 'history',

	scrollBehavior (to, from, savedPosition) {

    if(to.name === 'home-info') return;

    let item = `${to.name}.scroll`;

    window.scrollTo(0, +localStorage.getItem(item));

	},

	routes: [
    { path: '/', redirect: { name: 'home' }},
		{
      path: '/home',
      component: require('views/home/index.vue'),
      children: [
        {
          name: 'home',
          path: '',
          component: {
              render(createElement) {
              return createElement('div', '')
            },
          }
        },

        {
          name: 'home-info',
          path: ':id',
          component:  Popup
        }

      ]
		},
		{
		  name: 'chat_list',
		  path: '/chat',
		  component: require('views/chat-list')
		},
    //FAKE CHAT
    {
      name: 'fake_chat',
      path: '/chat/0/payed/:result',
      component: require('views/fakechat/index.vue')
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

    // {
    //   name: 'popup',
    //   path: '/popup/:id',
    //   component: Popup
    // },

    {
      name: 'popup',
      path: '/popup/:id',
      component: require('../views/popup/fullscreen-popup')
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
  if(from.name === 'home-info')
    localStorage.setItem(`home.scroll`, window.scrollY);
  else
  localStorage.setItem(`${from.name}.scroll`, window.scrollY);

  next();

});

export default router;
