<template>
  <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
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
  }
})

const editableTabs = computed({
  get:()=>{
    return store.getters.editableTabs
  }
})

const removeTab =async (targetName) =>{
  await store.dispatch('menus/removeTab',targetName)
  const activeName = store.getters.editableTabsValue
  if ('welcome' === activeName){
    await store.dispatch('menus/active_path','/'+activeName)
    await window.router.push('/'+activeName)
  }else {
    await store.dispatch('menus/active_path','/home/'+activeName)
    await window.router.push('/home/'+activeName)
  }
}

const actionTab = async (TabsPaneContext) =>{
  if ('welcome' === TabsPaneContext.props.name){
    await store.dispatch('menus/active_path','/'+TabsPaneContext.props.name)
    await window.router.push('/'+TabsPaneContext.props.name)
  }else {
    await store.dispatch('menus/active_path','/home/'+TabsPaneContext.props.name)
    await window.router.push('/home/'+TabsPaneContext.props.name)
  }

}



</script>

<style lang="less" scoped>

</style>
