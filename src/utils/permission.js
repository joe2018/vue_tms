/**
 * 权限配置文件
 */
import { router } from "@/router"
import { add_route } from "@/utils/addRoute"

router.beforeEach(async (to, from, next) => {
  //有用户信息
  if (sessionStorage.getItem('token')) {
    if (to.path === "/login" || to.path === '/') {
      next('welcome')
    }
    //获取用户信息
    let userInfo  = JSON.parse(window.sessionStorage.getItem('userinfo'))
    //触发添加路由方法，里面会判断是否需要添加
    add_route()
    let { routerList } = userInfo
    //根据to.name来判断是否为动态路由, 是否还有更好的判断方法？
    if (!to.name) {
      let rouList = []
       routerList.forEach(item => {
        item.children.forEach(e => {
          rouList.push(e)
        })
      })
      rouList = JSON.parse(JSON.stringify(rouList))
      //当前路由是动态的，确定是有的, 有就跳自己，没有就跳404,, tip: 刷新后动态路由的to.name为空
      if (rouList.findIndex((i) => '/'+i.path === to.path) !== -1) {
        next({ ...to, replace: true })
      } else {
        next("/404")
      }
    } else {
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
