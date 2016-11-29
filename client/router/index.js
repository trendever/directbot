import Vue from 'vue'
import Router from 'vue-router'
import ChatList from '../views/ChatList'
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
      name: 'popup',
      path: '/popup/:id',
      component: Popup
    },
    {
      name: 'profile',
      path: '/:id',
      component: require('views/profile/index')
    },
	]
})

router.beforeEach((to, from, next)=>{

  localStorage.setItem(`${from.name}.scroll`, window.scrollY);

  next();

});

export default router;
