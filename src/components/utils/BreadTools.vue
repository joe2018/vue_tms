<template>
  <el-breadcrumb class="breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
          v-for="(item, index) in breadcrumbData"
          :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect" v-text="item.meta.title"></span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)" v-text="item.meta.title"></a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()

// 生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
      item => item.meta && item.meta.title
  )
}
// 监听路由变化时触发
watch(
    route,
    () => {
      getBreadcrumbData()
    },
    {
      immediate: true
    }
)

// 处理点击事件
const router = useRouter()
const onLinkClick = item => {
  router.push(item.path)
}

</script>

<style scoped>

</style>
