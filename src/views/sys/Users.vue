<template>
  <div>
    <!--搜索框-->
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-input
            v-model="searchForm.username"
            placeholder="名称"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button>搜索</el-button>
        <el-button type="primary" @click="dialogFormVisible = true" v-if="hasAuth('sys:user:save')">新增</el-button>
        <el-popconfirm title="确定要删除这些记录吗？" @confirm="delHandle(null)" style="margin-left: 10px;" v-if="hasAuth('sys:user:delete')">
          <el-button type="danger" slot="reference" :disabled="delBtnStu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
        ref="multipleTable"
        border
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          label="头像"
          width="50">
        <template slot-scope="scope">
          <el-avatar size="small"
                     :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="120">
      </el-table-column>
      <el-table-column
          label="角色名称"
          width="180">
        <template slot-scope="scope">
          <el-tag style="margin-right: 5px;" size="small" type="info" v-for="item in scope.row.roles" :key="item.id">{{item.name}} </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号">
      </el-table-column>
      <el-table-column
          label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.statu === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else-if="scope.row.statu === 1" size="small" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="created"
          label="创建时间"
          width="200">
      </el-table-column>
      <el-table-column
          width="260px"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="roleHandle(scope.row.id)" v-if="hasAuth('sys:user:role')">分配角色</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="repassHandle(scope.row.id, scope.row.username)" v-if="hasAuth('sys:user:repass')">重置密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.id)" v-if="hasAuth('sys:user:update')">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="delHandle(scope.row.id)" v-if="hasAuth('sys:user:delete')">
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--页码-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
          <el-alert
              title="初始密码为888888"
              :closable="false"
              type="info"
              style="line-height: 12px;"
          ></el-alert>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号"  prop="phone" label-width="100px">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" width="600px" @closed="resetForm('roleForm')">
      <el-form :model="roleForm" ref="roleForm">
        <el-tree
            :data="roleTreeData"
            show-checkbox
            ref="roleTree"
            node-key="id"
            :default-expand-all=true
            :props="defaultProps">
        </el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('roleForm')">取 消</el-button>
        <el-button type="primary" @click="submitRoleForm('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import api from '@/axios/index'
// const { ElMessage } = require('element-plus')

</script>

<style scoped>

</style>
