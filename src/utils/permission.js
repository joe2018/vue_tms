/**
 * 权限配置文件
 */
import { router } from "@/router"
import store from "@/store"

//const whiteRouter = ["login", "404"] //路由白名单，不需要添加路由和登陆

router.beforeEach(async (to, from, next) => {
  //有用户信息
  if (sessionStorage.getItem('token')) {
    if (to.path === "/login" || to.path === '/') {
      next('/home')
    }
    //获取用户信息
    let userInfo  = store.getters.userInfo
    // const { username } = userInfo
    // console.log("用户角色", username ? username : "未登陆")
    //触发添加路由方法，里面会判断是否需要添加
    await store.dispatch("users/addRoute")
    let { routerList } = userInfo
    //根据to.name来判断是否为动态路由, 是否有人知道还有更好的判断方法？
    if (!to.name) {
      let rouList = []
       routerList.forEach(item => {
        item.children.forEach(e => {
          rouList.push(e)
        })
      })
      rouList = JSON.parse(JSON.stringify(rouList))
      //当前路由是动态的，确定是有的, 有就跳自己，没有就跳404,, tip: 刷新后动态路由的to.name为空
      if (rouList.findIndex((i) => ('/home/'+i.path) === to.path) !== -1) {

        next({ ...to, replace: true })
      } else {
        next("/404")
      }
    } else {
      // console.log(28, router.getRoutes())
      next()
    }
  }
  //无用户信息
  else {
    //没有权限访问，跳入没有权限页面/或者登陆页面
    // 跳转之前要判断一下是否为需要跳转的界面，不然会进入死循环
    if (to.path === "/login") {
      next()
    } else {
      next("/login")
    }
  }
})

router.afterEach(() => {})
