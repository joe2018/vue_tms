<template>
  <div>
    <el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple" />
          <el-button type="primary" @click="addMenuVisible = true" v-if="hasAuth('sys:menus:save')">新增权限</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        stripe
        table-layout="fixed"

    >
      <el-table-column prop="name" fixed label="名称" sortable  width="180"/>
      <el-table-column prop="perms" label="权限编码"   />
      <el-table-column prop="icon" label="图标"   />
      <el-table-column prop="type" label="类型"   >
        <template v-slot="scope">
          <el-tag class="ml-2" v-if="scope.row.type === 0" type="info">目录</el-tag>
          <el-tag v-if="scope.row.type === 1" type="warning">菜单</el-tag>
          <el-tag v-if="scope.row.type === 2" type="success">操作</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="菜单URL"  />
      <el-table-column prop="component" label="菜单组件"   />
      <el-table-column prop="orderNum" label="排序号" sortable  />
      <el-table-column prop="state" label="状态" sortable  >
        <template v-slot="scope">
          <el-tag v-if="scope.row.state === 0" type="success">禁用</el-tag>
          <el-tag v-if="scope.row.state === 1 " type="warning">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="操作" fixed="right"  width="130" >
        <template v-slot="scope">
          <!--            编辑-->
          <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
          >
            <el-button type="primary" size="small" :icon="Edit" v-if="hasAuth('sys:menus:update')" @click="editDialogOpen(scope.row.id)"/>
          </el-tooltip>
          <!--            删除-->
          <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
          >
            <el-button type="danger" size="small" :icon="Delete" v-if="hasAuth('sys:menus:delete')" @click="removeDialogOpen(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增权限 -->
    <el-dialog
        v-model="addMenuVisible"
        width="35%"
        title="新增权限"
        :close-on-click-modal="false"
        @close="addDialogClosed(addFormRef)"
    >
      <el-form
          ref="addFormRef"
          :model="addForm"
          :rules="addFormRules"
          label-width="100px"
      >
        <el-form-item label="上级菜单" prop="father">
          <el-cascader
              :options="tableData"
              :props="cascaderProps"
              clearable
              v-model="selectedKeys"
              @change="parentCateChanged"
              style="width: 300px;"

          />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="addForm.name" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="权限编码" prop="perms">
          <el-input v-model="addForm.perms" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="图标" >
          <el-input v-model="addForm.icon" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="菜单URL" >
          <el-input v-model="addForm.path" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="菜单组件" >
          <el-input v-model="addForm.component" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="addForm.type" >
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="addForm.state">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum">
          <el-input-number v-model="addForm.orderNum" :min="1" :max="10" />
        </el-form-item>
        <!--        按钮区域-->
        <el-form-item>
          <el-button type="primary" @click="addFormSubmit(addFormRef)">提交</el-button>
          <el-button @click="addFormReset(addFormRef)">重置</el-button>
          <el-button @click="addMenuVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
<!--    编辑权限-->
    <el-dialog
        v-model="editMenuVisible"
        width="35%"
        title="编辑权限"
        :close-on-click-modal="false"
        @close="editDialogClosed(editFormRef)"
    >
      <el-form
          ref="editFormRef"
          :model="editForm"
          :rules="addFormRules"
          label-width="100px"

      >
        <el-form-item label="上级菜单" prop="father">
          <el-cascader
              :options="parentCateList"
              :props="cascaderProps"
              clearable
              v-model="selectedKeys"
              @change="parentCateChanged"
              style="width: 300px;"

          />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="editForm.name" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="权限编码" prop="perms">
          <el-input v-model="editForm.perms" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="图标" >
          <el-input v-model="editForm.icon" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="菜单URL" >
          <el-input v-model="editForm.path" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="菜单组件" >
          <el-input v-model="editForm.component" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="editForm.type" >
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="editForm.state">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum">
          <el-input-number v-model="editForm.orderNum" :min="1" :max="10" />
        </el-form-item>
        <!--        按钮区域-->
        <el-form-item>
          <el-button type="primary" @click="editFormSubmit(editFormRef)">提交</el-button>
          <el-button @click="editFormReset(editFormRef)">重置</el-button>
          <el-button @click="editMenuVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
// import api from '@/axios/index'
import hasAuth from '@/utils/HasAuth'
const { ElMessage, ElMessageBox } = require('element-plus')
const {  Edit, Delete } = require('@element-plus/icons')

import {reactive, ref} from "vue";


//-------- 新增权限相关 开始----------

// 选中项发送变化时触发
const parentCateChanged = () => {
  if (selectedKeys.value) {
    if (selectedKeys.value.length > 0) {
      console.log(selectedKeys)
    }
  } else {
    console.log(selectedKeys)
  }
}

// 父级分类的列表
const parentCateList = ref()

// 指定级联选择器的配置对象
const cascaderProps = reactive({
  value: 'id',
  label: 'name',
  children: 'children',
  expandTrigger: 'hover',
  checkStrictly: true
})

// 选中的父级分类的Id数组
const selectedKeys = ref([])

// 新增权限表单代理
const addFormRef = ref()

// 新增权限弹窗状态记录
const addMenuVisible = ref(false)

// 关闭新增权限弹窗事件
const addDialogClosed = (formEl) => {
  formEl.resetFields()
}

// 新增权限表单
const addForm = reactive({
  name:'',
  perms:'',
  icon:'',
  path:'',
  component:'',
  type:0,
  state:0,
  orderNum:1
})

// 新增权限表单验证
const addFormRules = reactive({
  father: [
    { required: true, message: '不能为空', trigger: 'blur' },
    // { min: 3, max: 11, message: '用户名长度在 3 到 11个字符', trigger: 'blur' },
    // { validator: checkUsername, trigger: 'blur' }
  ],
  name: [
    { required: true, message: '不能为空', trigger: 'blur' },
    // { min: 3, max: 11, message: '用户名长度在 3 到 11个字符', trigger: 'blur' },
    // { validator: checkUsername, trigger: 'blur' }
  ],
  perms: [
    { required: true, message: '不能为空', trigger: 'blur' },
    // { min: 3, max: 12, message: '密码长度在 3 到 12个字符', trigger: 'blur' }
  ],
  type: [
    { required: true },
    // { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  state: [
    { required: true },
    // { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  orderNum: [
    { required: true },
    // { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
})

// 新增权限表单提交
const addFormSubmit = (formEl) => {
  formEl.resetFields()
}

// 新增权限表单重置
const addFormReset = (formEl) => {
  formEl.resetFields()
}

// 新增权限表单验证规则函数
// const checkUsername = (rule, value, callback) => {
//   const reg = /^[_a-zA-Z0-9]+$/
//   if (value === '' || value === undefined || value === null) {
//     callback()
//   } else {
//     callback()
//     if (!reg.test(value)) {
//       callback(new Error('仅由英文字母，数字以及下划线组成'))
//     } else {
//       callback()
//     }
//   }
// }
//-------- 新增权限相关 结束 ----------

//------- 编辑权限相关 开始 ---------

// 编辑对话框函数
const editDialogOpen =()=>{
  editMenuVisible.value = true
}

// 编辑权限弹窗状态记录
const editMenuVisible = ref(false)

// 编辑权限表单
const editForm = reactive({
  name:'',
  perms:'',
  icon:'',
  path:'',
  component:'',
  type:0,
  state:0,
  orderNum:1
})

// 编辑权限表单代理
const editFormRef = ref()

// 关闭新增权限弹窗事件
const editDialogClosed = (formEl) => {
  formEl.resetFields()
}

// 编辑权限表单提交
const editFormSubmit = (formEl) => {
  formEl.resetFields()
}

// 编辑权限表单重置
const editFormReset = (formEl) => {
  formEl.resetFields()
}


//-------- 编辑权限相关 结束 ----------

//删除权限函数
const removeDialogOpen = (id) => {
  ElMessageBox.confirm(
      '是否删除该权限？'+id,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
  )
      .then(async () => {
        // const { data: res } = await api.delete('roles/' + id)
        // if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
        // ElMessage.success(res.meta.msg)
        // getRolesList()
      })
      .catch(() => {
        // getRolesList()
        ElMessage.info('未执行删除操作')
      })
}


const tableData = [
  {
    id: 1,
    perms: '2016-05-02',
    name: 'wangxiaohu',
    type:0,
    state:0,
    children:[
      {
        id: 11,
        perms: '2016-05-01',
        name: 'wangxiaohu',
        state:1,
        type:1
      },
      {
        id: 12,
        perms: '2016-05-01',
        name: 'wangxiaohu',
        type:2,
        state:0
      },
    ],

  },
  {
    id: 2,
    perms: '2016-05-04',
    name: 'wangxiaohu',
    type:0,
    state:1,
    children:[
      {
        id: 21,
        perms: '2016-05-01',
        name: 'wangxiaohu',
        state:1,
        type:1
      },
      {
        id: 22,
        perms: '2016-05-01',
        name: 'wangxiaohu',
        type:2,
        state:0
      },
    ],
  },
  {
    id: 3,
    perms: '2016-05-01',
    name: 'wangxiaohu',
    type:0,
    state:0,
    children: [
      {
        id: 31,
        perms: '2016-05-01',
        name: 'wangxiaohu',
        state:1,
        type:1
      },
      {
        id: 32,
        perms: '2016-05-01',
        name: 'wangxiaohu',
        type:2,
        state:0
      },
    ],
  },
  {
    id: 4,
    perms: '2016-05-03',
    name: 'wangxiaohu',
    type:0,
    state:0,
    children:[
      {
        id: 41,
        perms: '2016-05-01',
        name: 'wangxiaohu',
        state:1,
        type:1
      },
      {
        id: 42,
        perms: '2016-05-01',
        name: 'wangxiaohu',
        type:2,
        state:0
      },
    ],
  },
]
</script>

<style lang="less" scoped>

</style>
