import {createStore} from 'vuex'
import menus from './modules/menus'
import users from './modules/users'
import createPersistedState from "vuex-persistedstate";
import getters from './getters'


const store = createStore({
    modules: {
        menus,
        users,
    },
    getters,
    plugins : [createPersistedState()]
})

export const setupStore = (app) => {
    app.use(store)
}

export default store
