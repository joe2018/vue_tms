const getters = {
    userInfo: (state) => state.users.userInfo,
    editableTabsValue:(state) => state.menus.editableTabsValue,
    editableTabs:(state) => state.menus.editableTabs,
    activePath:(state) => state.menus.activePath,
    permList:(state) => state.users.permList,

}
export default getters
