import store from "@/store"

const hasAuth = (perm) => {
    const authority = store.getters.permList
    console.log(authority)
    return authority.indexOf(perm) > -1
}


export default hasAuth
