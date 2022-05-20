<template>
  <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      editable
      @tab-remove="removeTab"
      @tab-click="actionTab"
  >
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
// import {ref} from "vue";
import {useStore} from "vuex";
import {computed} from "@vue/reactivity";
// const {onBeforeMount} = require('vue')
const store = useStore();

const editableTabsValue = computed({
  get:()=>{
    return store.getters.editableTabsValue
  },
  set:(newVal)=>{
    return store.dispatch('menus/set_editabletabs',newVal)
  }
})

const editableTabs = computed({
  get:()=>{
    return store.getters.editableTabs
  }
})

const removeTab = (targetName) =>{
  store.dispatch('menus/removeTab',targetName)
  const activeName = store.getters.editableTabsValue
  store.dispatch('menus/active_path',activeName)
  window.router.push('/'+activeName)
}

const actionTab =  (TabsPaneContext) =>{
  store.dispatch('menus/active_path','/'+TabsPaneContext.props.name)
  window.router.push('/'+TabsPaneContext.props.name)

}



</script>

<style lang="less" scoped>

</style>
