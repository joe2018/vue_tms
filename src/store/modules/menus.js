

export default {
    state: {
        menuList:[],
        authoritys: []
    },
    getters: {},
    mutations: {
        setMenuList(state,menus){
            state.menuList = menus

        },
        setAuthoritys(state,perm){
            state.authoritys = perm
        }
    },
    actions: {},
}
