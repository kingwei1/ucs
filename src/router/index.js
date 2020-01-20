import Vue from 'vue'
import VueRouter from 'vue-router'
const home = r => require.ensure([], () => r(require('@/views/Home')), 'home')

Vue.use(VueRouter)

const routes = [
 {
   path: '/',
   redirect: '/about',
 },
 {
    path: '/',
    name: 'home',
    component: home,
	children: [
	      {
	        path: '/about',
	        name: 'about',
	        //component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
			component: resolve => require(['@/views/About'], resolve),
	        children: []
	      },
		  {
		    path: '/system',
		    name: 'system',
		  	component: resolve => require(['@/views/system'], resolve),
		    children: []
		  },
		  {
			  path: '/heartBeat',
			  name: 'heartBeat',
			  component: resolve => require(['@/views/heartBeat'],resolve),
			  children: []
		  },
		  {
			  path: '/phone',
			  name: 'phone',
			  component: resolve => require(['@/views/communication/phone'],resolve),
			  children: []
		  },
		  {
			  path: '/sms',
			  name: 'sms',
			  component: resolve => require(['@/views/communication/sms'],resolve),
			  children: []
		  },
		  {
			  path: '/fax',
			  name: 'fax',
			  component: resolve => require(['@/views/communication/fax'],resolve),
			  children: []
		  },
		  {
			  path: '/meeting',
			  name: 'meeting',
			  component: resolve => require(['@/views/communication/meeting'],resolve),
			  children: []
		  },
		  {
			  path: '/videoMonitor',
			  name: 'videoMonitor',
			  component: resolve => require(['@/views/communication/videoMonitor'],resolve),
			  children: []
		  },
		  {
			  path: '/voiceCall',
			  name: 'voiceCall',
			  component: resolve => require(['@/views/communication/voiceCall'],resolve),
			  children: []
		  }
	    ]
  },
  /* {
    path: '/communication',
    name: 'communication',
    component: () => import('../views/communication.vue')
  } */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
