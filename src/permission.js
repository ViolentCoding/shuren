import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

const UserRole =  window.sessionStorage.getItem('role')
let add =false;
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = window.sessionStorage.getItem('token')
	const hasToken = true; 
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next()
      NProgress.done()
    } else { 
		console.log("hasToken",hasToken)
		// generate accessible routes map based on roles
		if (add==false) {
			add = true
			let roles =[];
			roles.push( window.sessionStorage.getItem('role'))
			const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
			router.addRoutes(accessRoutes)
			   
		} 
		// router.options.routes = router.options.routes.concat(accessRoutes);
		next()	
    }	
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
