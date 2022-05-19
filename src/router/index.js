import {createRouter, createWebHashHistory} from 'vue-router'
import HomeIndex from '../components/container/Home'
import Login from '../components/login/login'
import WelcomeIndex from '../components/home/Welcome'
import UserCenter from '../components/home/UserCenter'
import nullPage from '@/views/404'

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
        path: "/404",
        name: "404",
        component: nullPage
    },
    {
        path: '/home',
        name: 'home',
        component: HomeIndex,
        redirect: '/welcome',
        meta: { title: '首页' },
        children:[
            {
                path: '/welcome',
                name: 'welcome',
                component: WelcomeIndex,
                meta: {title: '欢迎页'}
            },
            {
                path: '/userCenter',
                name: 'UserCenter',
                component: UserCenter,
                meta: {title: '个人中心'}
            },
        ]
    },
    // {
    //     path: '/business',
    //     name: 'Business',
    //     component: Business,
    //     meta: {title: '业务中心'},
    //     children:[
    //         {
    //             path: '/appoint',
    //             name: 'AppointCar',
    //             component: AppointCar,
    //             meta: {title: '短驳派车管理'},
    //         }
    //     ]
    // },
    // {
    //     path: '/sys',
    //     name: 'SYS',
    //     component: SYS,
    //     meta: {title: '系统管理'},
    //     children:[
    //         {
    //             path: '/user',
    //             name: 'UserIndex',
    //             component: UserIndex,
    //             meta: {title: '用户管理'},
    //         },
    //         {
    //             path: '/role',
    //             name: 'RoleIndex',
    //             component: RoleIndex,
    //             meta: {title: '角色管理'},
    //         },
    //         {
    //             path: '/menus',
    //             name: 'MenusIndex',
    //             component: MenusIndex,
    //             meta: {title: '菜单管理'},
    //         },
    //     ]
    // },
    // {
    //     path: '/tools',
    //     name: 'tools',
    //     component: Tools,
    //     meta: {title: '系统工具'},
    //     children:[
    //         {
    //             path: '/dict',
    //             name: 'DictIndex',
    //             component: DictIndex,
    //             meta: {title: '数字字典'},
    //         }
    //     ]
    // }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
