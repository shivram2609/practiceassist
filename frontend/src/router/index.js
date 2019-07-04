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
import Account from '@/components/account/Account'
import Lawyers from '@/components/account/all_lawyers'
import AddLawyers from '@/components/account/add_lawyer'
import EditLawyers from '@/components/account/edit_lawyer'
import Clients from '@/components/account/all_clients'
import AddClients from '@/components/account/add_client'
import EditClients from '@/components/account/edit_client'
import UpdatePassword from '@/components/account/update_password'
import Profile from '@/components/account/profile'
//cases
import AddCase from '@/components/case/add_case'
import Cases from '@/components/case/all_cases'
import EditCase from '@/components/case/edit_case'

Vue.use(Router)

var router=  new Router({
  mode: 'history',
  routes: [
  
		{ path: '/',					name: 'home', 			component: Home, 			meta: {  	guest: 			false, 	layout: "frontend" 	}},
		{ path: '/login', 				name: 'login', 			component: Login, 			meta: { 	guest: 			true, 	layout: "frontend"	}},
		{ path: '/register',			name: 'register', 		component: Register, 		meta: { 	guest: 			true, 	layout: "frontend"	}},
		{ path: '/confirm_email', 		name: 'confirmemail', 	component: ConfirmEmail, 	meta: { 	guest: 			true, 	layout: "frontend" 	}},
		{ path: '/forgot_password', 	name: 'forgotpassword', component: ForgotPassword, 	meta: { 	guest: 			true, 	layout: "frontend" 	}},
		{ path: '/change_password', 	name: 'changepassword', component: ChangePassword,	meta: { 	guest: 			true,	layout: "frontend"	}},
		
		{ path: '/settings/update_password', 	name: 'updatepassword', component: UpdatePassword, 	meta: { 	requiresAuth: 	true, 	layout: "backend"	}},
		{ path: '/settings/profile', 			name: 'profile', 		component: Profile,			meta: {		requiresAuth: 	true,	layout: "backend" 	}},
		
		{ path: '/account', 			name: 'account', 		component: Account, 		meta: { 	requiresAuth: 	true,	layout: "backend"	}},
		{ path: '/lawyers', 			name: 'lawyers', 		component: Lawyers, 		meta: { 	requiresAuth: 	true,	layout: "backend"	}},
		{ path: '/lawyers/add', 		name: 'addlawyer', 		component: AddLawyers, 		meta: { 	requiresAuth: 	true,	layout: "backend"	}},
		{ path: '/lawyers/edit', 		name: 'editlawyer', 	component: EditLawyers,		meta: {		requiresAuth: 	true,	layout: "backend" 	}},
		{ path: '/clients', 			name: 'clients', 		component: Clients, 		meta: { 	requiresAuth: 	true,	layout: "backend" 	}},
		{ path: '/clients/add', 		name: 'addclient', 		component: AddClients, 		meta: { 	requiresAuth: 	true,	layout: "backend" 	}},
		{ path: '/clients/edit', 		name: 'editclient', 	component: EditClients, 	meta: { 	requiresAuth: 	true, 	layout: "backend"	}},
		
		{ path: '/cases', 				name: 'cases', 			component: Cases, 			meta: { 	requiresAuth: 	true,	layout: "backend"	}},
		{ path: '/cases/add', 			name: 'addcase', 		component: AddCase, 		meta: { 	requiresAuth: 	true, 	layout: "backend"	}},
		{ path: '/cases/edit', 			name: 'editcase', 		component: EditCase,		meta: {		requiresAuth: 	true,	layout: "backend" 	}},
		
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
			next()
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
           next()
        }
    }else {
        next() 
    }
});
export default router;
