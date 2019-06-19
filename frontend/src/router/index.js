import Vue from 'vue'
import Router from 'vue-router'
// frontend
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ConfirmEmail from '@/components/confirm_email'
import ForgotPassword from '@/components/forgot_password'
import ChangePassword from '@/components/change_password'
//backend
import Accounts from '@/components/account/Account'

Vue.use(Router)

var router=  new Router({
  mode: 'history',
 
  routes: [
    {
      path: '/',
      name: 'Home',
	  component: Home,
	  meta: { 
                guest: false,
                layout: "frontend"
            }
    },
    { path: '/login',
	  name: 'Login',
	  component: Login,
	  meta: { 
				guest: true,
				layout: "frontend"
            }
	},
    { path: '/register',
	  name: 'Register',
	  component: Register,
	  meta: { 
                guest: true,
                layout: "frontend"
            }
	},
	{ path: '/confirm_email',
	  name: 'ConfirmEmail',
	  component: ConfirmEmail,
	  meta: { 
                guest: true,
                layout: "frontend"
            }
	},
	{ path: '/forgot_password',
	  name: 'ForgotPassword',
	  component: ForgotPassword,
	  meta: { 
                guest: true,
                layout: "frontend"
            }
	},
	{ path: '/change_password',
	  name: 'ChangePassword',
	  component: ChangePassword,
	  meta: { 
				guest: true,
				layout: "frontend"
            }
	},
	{
      path: '/account',
      name: 'Dashboard',
      component: Accounts,
      meta: { 
                requiresAuth: true
            }
    }
  ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
			next({ name: 'Dashboard'})
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'Dashboard'})
        }
    }else {
        next() 
    }
})

export default router;

