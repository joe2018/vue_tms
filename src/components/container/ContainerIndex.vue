<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo-box">
        <img src="../../assets/logo.png" alt=""/>
        <span>{{isCollapse?'':'电商管理后台'}}</span>
      </div>
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <div>
        <el-menu
            active-text-color="#409eff"
            background-color="#304156"
            class="el-menu-vertical-demo"
            :default-active="defactivePath"
            text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
        >
          <el-menu-item index="/home">
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
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id"
                          @click="saveNavstate('/'+subitem.path)">
              <template #title>
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>{{ subitem.authName }}</span>
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
              <el-dropdown-item>用户中心</el-dropdown-item>
              <el-dropdown-item @click="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <Bread/>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Bread from '@/components/utility/BreadTools'
import {reactive, ref, shallowRef} from 'vue'
import api from "@/axios";

const {HomeFilled, Avatar, Checked, Goods, List, PieChart, Menu} = require('@element-plus/icons')

const { ElMessage } = require('element-plus')
const {
  onBeforeMount
} = require('vue')

const meunsList = ref([])

const dropdown1 = ref()

const showClick = () => {
  dropdown1.value.handleOpen()
}

// 获取用户信息
const getUserInfo = async () => {
  const { data: res } = await api.get('/sys/userinfo')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  userinfo.user_avatar = res.data.user_avatar
  userinfo.user_name = res.data.user_name
  userinfo.user_id = res.data.user_id
}

const iconObj = shallowRef({
  101: Avatar,
  120: Checked,
  110: Goods,
  140: List,
  130: PieChart
})
const defactivePath = ref('')
const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const userinfo = reactive({
  user_id:0,
  user_avatar:'',
  user_name:''
})
onBeforeMount(async () => {
  meunsList.value = await getMenuList()
  getUserInfo()
  defactivePath.value = window.sessionStorage.getItem('activePath')
})

const getMenuList = async () => {
const { data: res } = await api.get('/menus')
if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
return res.data
}

const saveNavstate = (activePath) => {
  window.sessionStorage.setItem('activePath', activePath)
  defactivePath.value = activePath
}

// 登出
const logout = () => {
  window.sessionStorage.clear()
  window.router.push('/login')
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
</style>
