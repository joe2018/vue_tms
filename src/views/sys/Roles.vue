<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="10">
        <el-input
            v-model="roleName"
            placeholder="名称"
            @clear="getRolesList"
            clearable
            style="width: 200px; margin-right: 5px;"
        >
        </el-input>
        <el-button @click="searchRoleList">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="table-btn" :gutter="5">
      <el-col :span="6">
        <el-button type="primary" @click="addRoleVisible = true">新增</el-button>
        <el-button type="danger" slot="reference" @click="delBtlRoles" >批量删除</el-button>
      </el-col>
    </el-row>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange">

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>

      <el-table-column
          prop="name"
          label="名称"
          width="120"
      >
      </el-table-column>
      <el-table-column
          prop="code"
          label="唯一编码"
          show-overflow-tooltip
          width="120"
      >
      </el-table-column>
      <el-table-column
          prop="remark"
          label="描述"
          show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
          prop="statu"
          label="状态"
          width="90"
      >
        <template v-slot="scope">
          <el-tag size="small" v-if="scope.row.statu === 1" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.statu === 0" type="danger">禁用</el-tag>
        </template>

      </el-table-column>
      <el-table-column
          prop="created"
          label="创建时间"
          show-overflow-tooltip
          width="180"
      >
        <template v-slot="scope">
          <span>{{$filters.format(scope.row.created)}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="updated"
          label="更新时间"
          show-overflow-tooltip
          width="180"
      >
        <template v-slot="scope">
          <span>{{$filters.format(scope.row.updated)}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="icon"
          label="操作"
          width="270"
      >

        <template v-slot="scope">
          <el-button text type="primary"  @click="permHandle(scope.row.id)">分配权限</el-button>
          <el-divider direction="vertical"  v-if="scope.row.id === 6? '':'disabled'" ></el-divider>

          <el-button text type="info"  v-if="scope.row.id === 6? '':'disabled'" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical" v-if="scope.row.id === 6? '':'disabled'" ></el-divider>

          <el-button text type="danger" key="link" v-if="scope.row.id === 6? '':'disabled'" @click="removedHandle(scope.row.id)">删除</el-button>

        </template>
      </el-table-column>

    </el-table>


    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="current"
        :page-size="size"
        :total="total">
    </el-pagination>

    <!--新增对话框-->
    <el-dialog
        v-model="addRoleVisible"
        width="35%"
        title="新增角色"
        :close-on-click-modal="false"
        @close="addHandleClose(addFormRef)">

      <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="100px"
          >

        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="addForm.code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="addForm.statu">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitAddForm(addFormRef)">立即创建</el-button>
          <el-button @click="resetAddForm(addFormRef)">重置</el-button>
          <el-button @click="addRoleVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <!--编辑对话框-->
    <el-dialog
        v-model="editRoleVisible"
        width="35%"
        title="编辑角色"
        :close-on-click-modal="false"
        @close="editHandleClose(editFormRef)">

      <el-form
          ref="editFormRef"
          :model="editForm"
          :rules="addFormRules"
          label-width="100px"
      >

        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitEditForm(editFormRef)">提交更新</el-button>
          <el-button @click="editRoleVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
<!--    分配权限-->
    <el-dialog
        v-model="permDialogVisible"
        title="分配权限"
        width="35%"
        :close-on-click-modal="false"
        @close="permHandleClose"
    >

        <el-tree
            ref="treeRef"
            :data="permTreeData"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="permTree"
            :props="defaultProps"
        >
        </el-tree>


      <span slot="footer">
        <el-button @click="permDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPermFormHandle('permForm')">确 定</el-button>
			</span>

    </el-dialog>

  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from 'vue'
import api from '@/axios/index'
import {ElMessageBox} from "element-plus";
const { ElMessage } = require('element-plus')






//------ 页面函数 -------

const total = ref(0)
const size = ref(10)
const current = ref(1)

const tableData = ref()

onBeforeMount( () => {
  getRolesList()
  getPermTreeData()
})

const getRolesList = async () => {
  const {data : res} = await api.get("sys/role/list",{
    params: {
      name: roleName.value,
      current: current.value,
      size: size.value
    }
  })
  if (res.status !== 200){
    ElMessage.error(res.msg)
  }
  tableData.value = res.obj.records
  total.value = res.obj.total
  size.value = res.obj.size
  current.value = res.obj.current
}

const permTreeData = ref()

const getPermTreeData = async () => {
  const {data:res} = await api.get('/sys/menu/list')
  if (res.status !== 200){
    ElMessage.error(res.msg)
  }
  permTreeData.value = res.obj
}

const handleSelectionChange = (val) =>{
  console.log("勾选")
  console.log(val)
  delBtlStatu.value = val;
}

const delBtlStatu = ref()

//批量删除
const delBtlRoles = () => {
  if(delBtlStatu.value.length > 0 ){
    ElMessageBox.confirm(
        '是否批量删除选定角色？',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
    )
        .then(async () => {
          let Ids = []
          delBtlStatu.value.forEach(item =>{
            Ids.push(item.id)
          })
          const { data: res } = await api.post('sys/role/delete/', Ids)
          if (res.status !== 200) return ElMessage.error(res.msg)
          ElMessage.success(res.msg)
          await getRolesList()

        })
        .catch(() => {
          ElMessage.info('未执行删除操作')
        })
  }
}

//删除角色函数
const removedHandle = (id) => {
  ElMessageBox.confirm(
      '是否删除该角色？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
  )
      .then(async () => {
        const { data: res } = await api.post('sys/role/delete/', [id])
        if (res.status !== 200) return ElMessage.error(res.msg)
        ElMessage.success(res.msg)
        await getRolesList()
      })
      .catch(() => {
        ElMessage.info('未执行删除操作')
      })
}

const handleCurrentChange = (val) => {
  // console.log(`当前页: ${val}`);
  this.current = val
  getRolesList()
}

const handleSizeChange = ( val) => {
  // console.log(`每页 ${val} 条`);
  this.size = val
  getRolesList()
}

//----搜索------
const roleName = ref()

const searchRoleList = async () => {
  const {data:res} = await api.get("sys/role/list", {
    params: {
      name: roleName.value,
      current: current.value,
      size: size.value
    }
  })
  if (res.status !== 200){
    ElMessage.error(res.msg)
  }
  tableData.value = res.obj.records
  total.value = res.obj.total
  size.value = res.obj.size
  current.value = res.obj.current
}
// ---------新增角色 ------------

const addFormRef = ref()
const addRoleVisible = ref(false)

// 弹窗关闭清空表单
const addHandleClose = (formEl) => {
  formEl.resetFields()
}

const addForm = reactive({
  name:'',
  code:"",
  remark:'',
  statu:0,
})

const addFormRules = reactive({
  name: [
    {required: true, message: '请输入角色名称', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入唯一编码', trigger: 'blur'}
  ],
  statu: [
    {required: true, message: '请选择状态', trigger: 'blur'}
  ]
})

const resetAddForm = (formEl) => {
  formEl.resetFields()
}

const submitAddForm = async (formEl) => {
  if (!formEl) return
  formEl.validate( async (valid) => {
    if (valid) {
      console.log(addForm.statu)
      const {data:res} = await api.post('/sys/role/save',addForm)
      if (res.status !== 200){
        ElMessage.error(res.msg)
      }
      await getRolesList()
      addRoleVisible.value = false
    }
  })
}
//------编辑角色 -------

const editRoleVisible = ref(false)
const editFormRef = ref()

const editForm = reactive({
  id:-1,
  name:"",
  code:"",
  remark:"",
  statu:0
})

const editHandle = async (id) => {
  const {data:res} = await api.get('/sys/role/info/'+id)
  console.log(res)
  editForm.id = res.obj.id
  editForm.name = res.obj.name
  editForm.code = res.obj.code
  editForm.remark = res.obj.remark
  editForm.statu = res.obj.statu
  editRoleVisible.value = true
}

const editHandleClose = (formEl) => {
  formEl.resetFields()
}

const submitEditForm = (formEl) => {
  if (!formEl) return
  formEl.validate( async (valid) => {
    if (valid) {
      const {data:res} = await api.post('/sys/role/update',editForm)
      if (res.status !== 200){
        ElMessage.error(res.msg)
      }
      await getRolesList()
      editRoleVisible.value = false
    }
  })
}

//----分配权限-----
const permDialogVisible = ref(false)
let permTree = ref([])

const permHandleClose =() => {
  permTree.value.length = 0
  console.log(3,permTree)
  permForm.value = ''
}

const treeRef = ref()

const permHandle =  async (id) => {
  const {data:res} = await api.get('/sys/role/info/'+id)
  permTree.value = res.obj.menuIds
  permForm.value = res.obj
  permDialogVisible.value = true


}

const permForm = ref()
const defaultProps = reactive({
  children: 'children',
  label: 'name'
})

</script>

<style lang="less" scoped>
.table-btn{
  margin-top: 15px;
}
.el-table{
  margin-top: 5px;
}
.el-tree{
  margin-bottom: 10px;
}
</style>
