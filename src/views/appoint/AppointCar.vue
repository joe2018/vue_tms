<template>
  <div>
    <el-card>
      <!--      头部区域-->
      <el-row>
        <el-col :span="8">
          <span class="select-title">受理状态：</span>
          <el-select v-model="selectValue" class="m-2" placeholder="Select">
            <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="appoint-title">短驳派车单</span>
          <span class="sub-title" v-text="subName"></span>
        </el-col>
        <el-col :span="8" class="printer-select">
          <span class="printer-select-title">选择打印机：</span>
          <el-select v-model="printerSelectValue" class="m-2" placeholder="请选择打印机">
            <el-option
                v-for="item in printerSelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <!--      信息区-->
      <el-row class="documents-info">
        <el-col :span="6">
          <div>
            <el-radio v-model="documentsType" label="1" size="large">接货</el-radio>
            <el-radio v-model="documentsType" label="2" size="large">送货</el-radio>
          </div>
        </el-col>
        <el-col :span="6">
          <span> 派车单号：</span>
          <span class="documentsNub"> {{documentsNub}}</span>
        </el-col>
        <el-col :span="8">
          <span> 选择开单时间：</span>
          <el-date-picker
              v-model="documentsTime"
              type="datetime"
              placeholder="请选择开单时间"
          />
        </el-col>
        <el-col :span="4">
          <span> 业务员：</span>
          <span class="documentsNub"> {{salesman}}</span>
        </el-col>
      </el-row>
      <!--主要表单区-->
      <div class="doc-table">
        <el-row>
          <el-col :span="12">
            <div class="doc-table-col-left">
              <el-row>
                <el-col :span="12">客户名称：</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="doc-table-col-right">
              <el-row>
                <el-col :span="12">车牌号：</el-col>
                <el-col :span="12">车属单位：</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="doc-table-col-left">
              <el-row>
                <el-col :span="12">货物名称：</el-col>
                <el-col :span="12">货物件数：</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="doc-table-col-right">
              <el-row>
                <el-col :span="12">司机姓名：</el-col>
                <el-col :span="12">司机电话：</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="doc-table-col-left">
              <el-row>
                <el-col :span="12">详细地址：</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="doc-table-col-right">
              <el-row>
                <el-col :span="12">驾驶证号：</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="doc-table-col-left">
              <el-row>
                <el-col :span="12">联系人：</el-col>
                <el-col :span="12">联系电话：</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="doc-table-col-right">
              <el-row>
                <el-col :span="12">住址：</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="doc-table-col-left">
              <el-row>
                <el-col :span="12">派车网点：</el-col>
                <el-col :span="12">到站：</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="doc-table-col-right">
              <el-row>
                <el-col :span="12">发车时间：</el-col>
                <el-col :span="12">预到时间：</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="doc-table-col-left">
              <el-row>
                <el-col :span="12">重量：</el-col>
                <el-col :span="12">体积：</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="doc-table-col-right">
              <el-row>
                <el-col :span="12">车费：</el-col>
                <el-col :span="12">预付：</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="doc-table-col-left">
              <el-row>
                <el-col :span="12">结算方式：</el-col>
                <el-col :span="12">代收费用：</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="doc-table-col-right">
              <el-row>
                <el-col :span="12">叫车人：</el-col>
                <el-col :span="12">联系电话：</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="doc-table-col-left-end">
              <el-row>
                <el-col :span="12">随车凭证：</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="doc-table-col-right-end">
              <el-row>
                <el-col :span="12">关联单号：</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--备注-->
      <div class="doc-table-comment">
        <span class="doc-comment"> 备注：</span>
      </div>
      <!--      尾部-->
      <el-row>
        <el-col :span="12">
          <el-checkbox v-model="checkSMS" label="发送短信给司机" size="large"/>
          <el-checkbox v-model="checkeWX" label="微信推送" size="large"/>
        </el-col>
        <el-col :span="12" class="operator-col">
          <span> 制单人：</span>
          <span class="documentsNub"> {{operatorName}}</span>
        </el-col>
      </el-row>
      <!--      按钮-->
      <div class="documents-btn">
        <el-button type="primary">保存</el-button>
        <el-button>保存并打印</el-button>
        <el-button>新增</el-button>
        <el-button>重置</el-button>
        <el-button>退出</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {ref} from "vue";

// const documentsForm = reactive({
//
// })


// 受理状态选择项
const selectOptions = [
  {
    value: '0',
    label: '待处理',
  },
  {
    value: '1',
    label: '处理中',
  },
  {
    value: '2',
    label: '已完成',
  }
]

// 选择器值
const selectValue = ref('0')

// 分公司编号名字
const subName = ref('No. XXXXX分公司 234342352534')

// 打印机选择器默认选择
const printerSelectValue = ref('')

// 打印机列表
const printerSelectOptions = [
  {
    value: '0',
    label: 'XKJJKDHGF-30030',
  },
  {
    value: '1',
    label: 'XKJJKDHGF-4000',
  }
]

// 派车单类型
const documentsType = ref('1')

// 派车单号
const documentsNub = ref('1001202204160001')

// 业务员
const salesman = ref('张三')

//下单时间
const documentsTime = ref()

// 是否发送短信
const checkSMS = ref()

// 是否发送微信
const checkeWX = ref()

// 制单人
const operatorName = ref('李四')


</script>

<style lang="less" scoped>
.select-title {
  font-size: 13px;
}

.appoint-title {
  display: flex;
  justify-content: center;
  font-size: 23px;
}

.sub-title {
  display: flex;
  justify-content: center;
  font-size: 14px;
}

.printer-select {
  display: flex;
  justify-content: flex-end;
}

.printer-select-title {
  font-size: 13px;
  margin-top: 8px;
}

.documents-info {
  align-items: center;
  padding: 10px;
  font-size: 14px;
}

.documentsNub {
  color: blue;
}

.doc-table {
  border-style: solid;
  border-color: dimgray;
  border-width: 1px;

}

.doc-table-col-right {
  border-bottom-style: dashed;
  border-left-style: dashed;
  border-color: dimgray;
  border-width: 1px;
  font-size: 14px;
  padding-left: 10px;
}

.doc-table-col-left {
  border-bottom-style: dashed;
  border-color: dimgray;
  border-width: 1px;
  font-size: 14px;
  margin-left: 10px;
}

.doc-table-col-left-end {
  border-color: dimgray;
  border-width: 1px;
  font-size: 14px;
  margin-left: 10px;
}

.doc-table-col-right-end {
  border-left-style: dashed;
  border-color: dimgray;
  border-width: 1px;
  font-size: 14px;
  padding-left: 10px;
}

.doc-table-comment {
  border-style: solid;
  border-color: dimgray;
  border-width: 1px;
  margin-top: 5px;
  height: 100px;
  font-size: 14px;

  .doc-comment {
    margin: 10px;
  }
}

.operator-col {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin-top: 10px;
}

.documents-btn {
  display: flex;
  justify-content: center;
}
</style>
