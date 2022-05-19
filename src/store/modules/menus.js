const state = {
    editableTabsValue:'welcome',
    editableTabs:[{
        title:'首页',
        name:'welcome',
    }],
    activePath:'/welcome'

}
const mutations =  {
    ADD_TABS(state,tab){
        const tabs = state.editableTabs
        let isHas = true
        tabs.forEach(item => {
            if (item.name === tab.name){
                isHas = false
            }})
        if (isHas){
            state.editableTabs.push({
                title: tab.meta.title,
                name: tab.name,
            })
            state.editableTabsValue = tab.name
        }else {
            console.log(tab.name)
            state.editableTabsValue = tab.name
            console.log(state.editableTabsValue)
        }
    },
    REMOVE_TAB(state,targetName){
        if ('welcome' === targetName){
            return
        }
        const tabs = state.editableTabs
        let activeName = state.editableTabsValue
        if (activeName === targetName){
            tabs.forEach((tab,index) => {
                if (tab.name === targetName){
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }
        state.editableTabsValue = activeName
        state.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
    ACTIVE_PATH(state,val){
        state.activePath = val
    },
    SET_EDITABLETABS(state,val){
        state.editableTabsValue = val
    }
}
const actions = {
    add_tabs({ commit }, tabsInfo) {
        commit("ADD_TABS", tabsInfo)
    },
    removeTab({ commit }, targetName){
        commit("REMOVE_TAB", targetName)
    },
    active_path({ commit },val){
        commit("ACTIVE_PATH",val)
    },
    set_editabletabs({ commit },val){
        console.log(1,val)
        commit("SET_EDITABLETABS",val)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
