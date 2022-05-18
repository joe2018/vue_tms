const state = {
    editableTabsValue:'',
    editableTabs:[{
        title:'首页',
        name:'index',
    }]
}
const mutations =  {
    ADD_TABS(state,tab){
        state.editableTabs.forEach(item =>{
            if (item.name === tab.name){
                state.editableTabsValue = tab.name
            }else {
                state.editableTabs.push({
                    title: tab.meta.title,
                    name: tab.name,
                })
                state.editableTabsValue = tab.name
            }
        })

    },
    REMOVE_TAB(state,targetName){
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
    }
}
const actions = {
    add_tabs({ commit }, tabsInfo) {
        commit("ADD_TABS", tabsInfo)
    },
    removeTab({ commit }, targetName){
        commit("REMOVE_TAB", targetName)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
