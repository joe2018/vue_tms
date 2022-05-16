import {createRouter, createWebHashHistory} from 'vue-router'
import Container from '../components/container/ContainerIndex'
import AppointCar from '../views/appoint/AppointCar'
import Login from '../components/login/loginIndex'
import Home from '../components/home/HomeIndex'
import UserIndex from '../views/sys/UserIndex'
import RoleIndex from '../views/sys/RoleIndex'
import MenusIndex from '../views/sys/MenusIndex'
import DictIndex from '../views/tools/DictIndex'


const routes = [
    {
        // 重定向
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/business',
        name: 'business',
        component: Container,
        meta: {title: '业务中心'},
        children:[
            {
                path: '/appoint',
                name: 'appoint',
                component: AppointCar,
                meta: {title: '短驳派车管理'},
            }
        ]
    },
    {
        path: '/home',
        component: Container,
        children:[
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: {title: '首页'}
            },
            {
                path: '/userCenter',
                name: 'userCenter',
                component: () => import('@/components/home/UserCenter'),
                meta: {title: '个人中心'}
            },
        ]
    },
    {
        path: '/sys',
        name: 'sys',
        component: Container,
        meta: {title: '系统管理'},
        children:[
            {
                path: '/user',
                name: 'user',
                component: UserIndex,
                meta: {title: '用户管理'},
            },
            {
                path: '/role',
                name: 'role',
                component: RoleIndex,
                meta: {title: '角色管理'},
            },
            {
                path: '/menus',
                name: 'menus',
                component: MenusIndex,
                meta: {title: '菜单管理'},
            },
        ]
    },
    {
        path: '/tools',
        name: 'tools',
        component: Container,
        meta: {title: '系统工具'},
        children:[
            {
                path: '/dict',
                name: 'dict',
                component: DictIndex,
                meta: {title: '数字字典'},
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/login') {
        if (window.sessionStorage.getItem('token')) {
            next(from.fullPath)
        } else {
            next()
        }
    } else {
        if (window.sessionStorage.getItem('token')) {
            next()
        } else {
            next({
                path: from.fullPath
            })
        }
    }
})

export default router
