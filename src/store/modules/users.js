const state = {
    Token:''

    }
const mutations =  {
    ADD_TOKEN(state,token){
        state.Token = token
    }

}
const actions = {
    add_token({ commit }, token){
        commit("ADD_TOKEN", token)
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions

}
