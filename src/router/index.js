// import HomePage from '../components/HomePage'
// import Login from '../components/login'
import { createRouter, createWebHashHistory } from 'vue-router'

const HomePage = () => import('../components/HomePage')
const Login = () => import('../components/login')

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/homepage',
        name: 'HomePage',
        component: HomePage
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
