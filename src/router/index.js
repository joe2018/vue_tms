import {createRouter, createWebHashHistory} from 'vue-router'
// import Tools from '../components/container/ContainerIndex'
// import SYS from '../components/container/ContainerIndex'
import Index from '../components/container/ContainerIndex'
// import Business from '../components/container/ContainerIndex'
// import AppointCar from '../views/appoint/AppointCar'
import Login from '../components/login/loginIndex'
import Home from '../components/home/HomeIndex'
// import UserIndex from '../views/sys/UserIndex'
// import RoleIndex from '../views/sys/RoleIndex'
// import MenusIndex from '../views/sys/MenusIndex'
// import DictIndex from '../views/tools/DictIndex'
import UserCenter from '../components/home/UserCenter'
import api from "@/axios";
import store from '../store/index'


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
        path: '/home',
        name: 'Index',
        component: Index,
        children:[
            {
                path: '/home',
                name: 'Home',
                component: Home,
                meta: {title: '首页'}
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

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to,from,next) => {
    const {data: res} = await api.get('/menus')
    await store.commit('setMenuList', res.data.nav)
    await store.commit('setAuthoritys', res.data.authoritys)

    let newRoutes = router.options.routes
    res.data.nav.forEach(menu =>{
        if (menu.children){
            menu.children.forEach(e => {
                let route = menuToRoute(e)
            })
        }
    })


    // 登入后不可进入登入页面
    if (to.fullPath === '/login' && window.sessionStorage.getItem('token')) {
        next({
            path: '/home'
        })
    } else {
        next()
    }
})



export default router
