<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo-box">
        <img src="../../assets/logo.png" alt=""/>
        <span>{{isCollapse?'':'TMS管理系统'}}</span>
      </div>
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <div>
        <el-menu
            active-text-color="#409eff"
            background-color="#304156"
            class="el-menu-vertical-demo"
            :default-active="activeIndex"
            text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
        >
          <el-menu-item index="welcome" @click="actHomeTabs">
            <template #title>
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-sub-menu :index="item.id + ''" v-for="item in meunsList" :key="item.id">
            <template #title>
              <el-icon>
                <component :is="iconObj[item.id]"/>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item :index="subitem.path" v-for="subitem in item.children" :key="subitem.id"
                          @click="saveNavstate(subitem)">
              <template #title>
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>{{ subitem.title }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="avatar">
          <span >{{ userinfo.user_name }}</span>
        </div>
        <el-dropdown ref="dropdown1" trigger="hover"  style="margin-right: 50px;cursor: pointer;">
          <el-avatar
              :src="userinfo.user_avatar"
              @click="showClick"
          />

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link class="link" to="/userCenter">
                  用户中心
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item @click="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
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
        <div style="margin: 0 15px;">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {reactive, ref, shallowRef} from 'vue'
import{ useStore }from"vuex"

const {HomeFilled, Avatar, Checked, Goods, List, PieChart,Menu } = require('@element-plus/icons')

const {onBeforeMount} = require('vue')

const store = useStore();

const meunsList = ref([])

const dropdown1 = ref()

const showClick = () => {
  dropdown1.value.handleOpen()
}


const iconObj = shallowRef({
  1: Avatar,
  2: Checked,
  3: Goods,
  4: List,
  5: PieChart
})

const activeIndex = ref('welcome')

const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const userinfo = reactive({
  user_id: JSON.parse(window.sessionStorage.getItem('userinfo')).id,
  user_avatar: JSON.parse(window.sessionStorage.getItem('userinfo')).useravatar,
  user_name: JSON.parse(window.sessionStorage.getItem('userinfo')).username
})

onBeforeMount( () => {
  meunsList.value = JSON.parse(window.sessionStorage.getItem('userinfo')).routerList
  activeIndex.value = window.sessionStorage.getItem('activeIndex')
  editableTabsValue.value = window.sessionStorage.getItem('editableTabsValue')
  editableTabs.value = JSON.parse(window.sessionStorage.getItem('editableTabs'))
})

const saveNavstate = (subitem) => {
  activeIndex.value = subitem.path
  window.sessionStorage.setItem('activeIndex',activeIndex.value)
  console.log(101,editableTabs.value)
  add_tabs(subitem)
}

const actHomeTabs = () => {
  activeIndex.value = 'welcome'
  editableTabsValue.value = 'welcome'
  window.sessionStorage.setItem('activeIndex',activeIndex.value)
  window.sessionStorage.setItem('editableTabsValue',editableTabsValue.value)
}

const editableTabsValue = ref('welcome')
const editableTabs = ref()

const add_tabs = (subitem) => {
  let isHas = true
  console.log(119,editableTabs.value)
  editableTabs.value.forEach(item => {
    console.log(item.name,subitem.path)
    if (item.name === subitem.path){
      isHas = false
    }})
  if (isHas) {
    editableTabs.value.push({
      title: subitem.title,
      name: subitem.path,
    })
  }
  editableTabsValue.value = subitem.path
  activeIndex.value = subitem.path
  window.sessionStorage.setItem('editableTabsValue',editableTabsValue.value)
  window.sessionStorage.setItem('activeIndex',activeIndex.value)
  window.sessionStorage.setItem('editableTabs',JSON.stringify(editableTabs.value))
}

const removeTab = (targetName) =>{
    if ('welcome' === targetName){
      return 0
    }
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
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
    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    window.router.push('/'+activeName)
    window.sessionStorage.setItem('editableTabsValue',editableTabsValue.value)
    window.sessionStorage.setItem('activeIndex',activeName)
    window.sessionStorage.setItem('editableTabs',JSON.stringify(editableTabs))
}

const actionTab =  (TabsPaneContext) =>{
  activeIndex.value = TabsPaneContext.props.name
  window.sessionStorage.setItem('activeIndex',TabsPaneContext.props.name)
  window.router.push(activeIndex.value)

}


//注销
const logout = async () => {
  window.sessionStorage.clear()
  await store.dispatch("users/logout")
  window.location.reload()
  window.localStorage.clear()
  await window.router.push({ path: "/login" })

}


</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #f1f1f1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.el-aside {
  background-color: #304156;

  .logo-box {
    display: flex;
    align-items: center;

    img {
      padding: 5px;
      height: 25px;
      width: 25px;
      transform: translate(38%, 0%);
    }

    span {
      color: #f1f1f1;
      transform: translate(25%, 0%);
    }
  }

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #ffffff;
  padding: 0px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}
.avatar{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.link{
  text-decoration: none;
}
</style>
