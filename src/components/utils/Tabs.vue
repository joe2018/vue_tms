<template>
  <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
  >
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
// import {ref} from "vue";
import {useStore} from "vuex";

const store = useStore();

const editableTabsValue = store.getters.editableTabsValue

const editableTabs = store.getters.editableTabs

</script>

<style lang="less" scoped>

</style>
