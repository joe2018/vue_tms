<template>
  <div class="login_container">
    <div class="login_box">
<!--      图表区域-->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div class="login_title">鸿运物流管理平台</div>
<!--      登入表单区域-->
      <el-form ref="loginFormRef" :model="form" :rules="loginFormRules" class="login_form">
<!--        用户名-->
        <el-form-item prop="username">
          <el-input
            size="large"
            placeholder="请输入用户名"
            :prefix-icon="Avatar"
            v-model="form.username"
          >
          </el-input>
        </el-form-item>
<!--        密码-->
        <el-form-item prop="password">
          <el-input
            size="large"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            v-model="form.password"
            type="password"
          >
          </el-input>
        </el-form-item>
        <!--  验证码-->
        <el-form-item prop="code">
          <el-input
              size="large"
              placeholder="请输入验证码"
              v-model="form.code"
              style="width: 200px;float: left"
          >
          </el-input>
          <el-image :src="captchaImg" class="captchaImg" @click="getCaptchaImg"></el-image>
        </el-form-item>
<!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary"  @click=submitForm(loginFormRef)>登入</el-button>
          <el-button @click= resetLoginForm(loginFormRef) >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '@/axios/index'
const { Lock, Avatar } = require('@element-plus/icons')
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const router = useRouter()
const store = useStore()

const { ElMessage } = require('element-plus')

const loginFormRef = ref('')

const form = reactive({
  username: 'admin',
  password: '123456',
  code: 'p7wy5'
})
const {
  onBeforeMount
} = require('vue')

// 验证码图片
const captchaImg = ref('')

// 获取验证码图片
const getCaptchaImg = async () => {
  const { data: res } = await api.get('/captcha')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  captchaImg.value = res.data.captchaImg
}


onBeforeMount( () => {
  getCaptchaImg()
})

const loginFormRules = {
  username: [
    { required: true, message: '用户名不可为空', trigger: 'blur' },
    { min: 3, max: 11, message: '用户名长度在3-11位之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { min: 3, max: 12, message: '密码长度在3-12位之间', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '验证码不可为空', trigger: 'blur' },
    { min: 4, max: 5, message: '密码长度为5个字符', trigger: 'blur' }
  ]
}

const userInfo = reactive({
  id:0,
  rid:0,
  email:'',
  mobile:'',
  username: '',
  token: '',
  useravatar:'',
  routerList: []
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const { data: res } = await api.post('/login', form)
      if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
      ElMessage.success(res.meta.msg)
      window.sessionStorage.setItem('token', res.data.token)
      userInfo.username = res.data.username
      userInfo.routerList = res.data.routerList
      userInfo.token = res.data.token
      userInfo.id = res.data.id
      userInfo.rid = res.data.rid
      userInfo.email = res.data.email
      userInfo.mobile = res.data.mobile
      userInfo.useravatar = res.data.useravatar
      //触发登陆，保存信息，添加路由
      await store.dispatch("users/login", userInfo)
      await router.push({path: "/home"})
    } else {
      ElMessage.error('提交错误')
    }
  })
}

const resetLoginForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.login_container{
  height: 100%;
  background-image: url("../../assets/bg.57383432.png");
}
.login_box{
  width: 385px;
  height: 400px;
  border-radius: 10px;
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translate(-60%,-50%);
  box-shadow: 0 0 10px #2b4b6b;
  background-color: #ffffff;

  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 5px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
}
.login_title{
  text-align: left;
  font-size: 22px;
  margin-bottom: 58px;
  font-weight: 700;
  color: #007fe1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25%;
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  top: 40%;
}
.btns{
  display: flex;
  justify-content: flex-end;
  transform: translate(32%);
}

.captchaImg{
  margin-left: 5px;
  width: 140px;
  height: 40px;
}
</style>
