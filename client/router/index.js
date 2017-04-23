import Vue from 'vue'
import Router from 'vue-router'
import Popup from '../views/popup/index'
import config from 'root/../config'

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
      component: config.trendever ? require('views/list/index.vue') : require('views/home/landing.vue'),
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
      name: 'dress-blogger',
      path: '/dressblogger',
      component: require('views/dress-blogger')
    },
    {
      name: 'blogger-request',
      path: '/blogger-request',
      component: require('views/dress-blogger/blogger-request')
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
    {

      name: 'dark-sample',
      path: '/dark-sample',
      component: require('root/components/dark-sample')

    },

    {
      name: 'trendever-chat',
      path: '/trendever-chat',
      component: require('views/chat-list/trendever')
    },

    {
      name: 'popup',
      path: '/popup/:id',
      component: require('../views/popup/fullscreen')
    },
    {
      name: 'list',
      path: '/list',
      component: require('views/list')
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
    // {
    //   name: 'land',
    //   path: '/land',
    //   component: require('views/home/landing')
    // },
    {
      name: 'video-trendever',
      path: '/video-trendever',
      component: require('components/video/video')
    },
    {
      name: 'user',
      path: '/:id',
      component: require('views/profile/index')
    }
	]
})

router.beforeEach((to, from, next)=>{
  if(from.name === 'home-info' || from.name === "home")
    localStorage.setItem(`home.scroll`, window.scrollY);
  else
  localStorage.setItem(`${from.name}.scroll`, window.scrollY);

  if(to.name === 'user'){
    if(to.params.id.indexOf('_') !== -1){
      let replace = to.params.id.replace(new RegExp("_", 'g'),"-");
      router.replace({name: 'user', params: {id: replace}})
    }
  }


  next();

});

export default router;
