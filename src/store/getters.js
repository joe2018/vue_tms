const getters = {
    userInfo: (state) => state.users.userInfo,
    editableTabsValue:(state) => state.menus.editableTabsValue,
    editableTabs:(state) => state.menus.editableTabs,
    activePath:(state) => state.menus.activePath,
}
export default getters
