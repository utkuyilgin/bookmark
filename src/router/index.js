import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            requiresAuth: true
        },
        component: function () {
            return import('../views/Home.vue')
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: function () {
            return import('../views/Login.vue')
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: function () {
            return import('../views/Register.vue')
        }
    },
    {
        path: '/new-bookmark',
        name: 'NewBookmark',
        component: function () {
            return import('../views/NewBookmark.vue')
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const authNotRequiredRoutes = ["Login", "Register"];

    if (authNotRequiredRoutes.indexOf(to.name) > -1 && store.getters._isAuthenticated) next({ name: "Home"});

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters._isAuthenticated) {
            next({ name: 'Login' })
        } else {
            next() // go to wherever I'm going
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
})

export default router
