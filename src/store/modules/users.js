
import { router } from "@/router"

import {filterAsyncRouter} from '@/utils/menus'


const state = {
        userInfo: {
            id:0,
            rid:0,
            email:'',
            mobile:'',
            username: '',
            token: '',
            useravatar:'',
            routerList: []
        }
    }
const mutations =  {
        SET_USER_INFO(state, val) {
            state.userInfo = val
        },
        ADD_ROUTE(state) {
            // console.log("路由添加前", router.getRoutes())
            //路由未添加之前是3个,我们判断是否添加过，没添加过就添加
            if (router.getRoutes().length === 6) {
                let addRouterList = filterAsyncRouter(
                    //这里深拷贝下，不然会出问题
                    JSON.parse(JSON.stringify(state.userInfo.routerList))
                )
                // console.log(1111,addRouterList)
                addRouterList.forEach((i) => {
                    if (i.children.length > 0){
                        i.children.forEach(item => {
                            router.addRoute("home", item)
                        })
                    }
                })
            }
            // console.log("路由添加后", router.getRoutes())
        },
}
const actions = {
        //登陆
        login({ commit }, userInfo) {
            const { username, token, routerList,useravatar,id,rid,email,mobile } = userInfo
            return new Promise((resolve) => {
                //登陆，获取用户信息， 权限路由列表
                //假设返回的有token, 路由列表(根据不同用户返回不同)
                // console.log(56, routerList)
                //把用户信息存入vuex
                commit("SET_USER_INFO", {
                    id,
                    rid,
                    email,
                    mobile,
                    username,
                    token,
                    useravatar,
                    routerList
                })
                // console.log("login over")
                //添加路由
                //commit("ADD_ROUTE")
                resolve()
            })
        },
        //添加路由
        addRoute({ commit }) {
            commit("ADD_ROUTE")
        },
        //注销
        logout({ commit, state }) {
            return new Promise((resolve) => {
                console.log(state.userInfo.token, "注销了")
                //拷贝一下
                const delRouterList = JSON.parse(
                    JSON.stringify(state.userInfo.routerList)
                )
                //删除添加的路由，如果路由是多层的 递归下。。
                delRouterList.forEach((route) => {
                    router.removeRoute(route.name)
                })
                //删除路由
                commit("SET_USER_INFO", {
                    id:0,
                    rid:0,
                    email:'',
                    mobile:'',
                    userName: "",
                    token: "",
                    useravatar:"",
                    routerList: []
                })
                resolve("注销 success， 清空路由，用户信息")
            })
        }
    }



export default {
    namespaced: true,
    state,
    mutations,
    actions
}
