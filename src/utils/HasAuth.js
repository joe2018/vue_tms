import store from "@/store"

const hasAuth = (perm) => {
    const authority = JSON.parse(window.sessionStorage.getItem("userinfo")).permList
    return authority.indexOf(perm) > -1
}


export default hasAuth
