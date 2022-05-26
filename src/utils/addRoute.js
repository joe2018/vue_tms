import {filterAsyncRouter} from "@/utils/menus";
import {router} from "@/router";

export const add_route = () => {
    //路由未添加之前是5个,我们判断是否添加过，没添加过就添加
    if (router.getRoutes().length === 5) {
        let addRouterList = filterAsyncRouter(
            //这里深拷贝下，不然会出问题
            JSON.parse(window.sessionStorage.getItem('userinfo')).routerList
        )
        addRouterList.forEach((i) => {
            if (i.children.length > 0){
                i.children.forEach(item => {
                    delete item.icon
                    delete item.children
                    router.addRoute("home", item)
                })
            }
        })
    }
}
