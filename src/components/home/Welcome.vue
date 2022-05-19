<template>
<div>
  <el-card>
    这是首页
    <el-button @click="tmp">跳转</el-button>
  </el-card>
</div>
</template>

<script setup>
import {router} from "@/router";

const tmp = () => {
  router.push('/home/user')
}

</script>

<style scoped>

</style>
