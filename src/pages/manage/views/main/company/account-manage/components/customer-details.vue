<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>用户详情</h3>
      </div>
      <div  class="detail-content" slot="content" v-if = "detailData">
        <layout-detail :detailData = "detailData" :detailSettings = "detailSettings">
          <template slot-scope="scope" slot="lastLoginTime">
              <span>{{detailData.lastLoginTime | timeFilter}}</span>
          </template>
           <template slot-scope="scope" slot="registerTime">
              <span>{{detailData.registerTime | timeFilter}}</span>
          </template>
           <template slot-scope="scope" slot="rechargeFirstTime">
              <span>{{detailData.rechargeFirstTime | timeFilter}}</span>
          </template>
           <template slot-scope="scope" slot="orderFirstTime">
              <span>{{detailData.orderFirstTime | timeFilter}}</span>
          </template>
          <template slot-scope="scope" slot="statusCode">
              <span>{{detailData.statusCode ? '启用' : '禁用'}}</span>
          </template>
          <template slot-scope="scope" slot="virtualMoney">
              <span>1111</span>
              <el-button type = "text" class = "ml-10" @click = "lookCoupon">查看</el-button>
              <el-button type= "text" @click = "sendCouponVisible = true">发放优惠券</el-button>
          </template>
        </layout-detail>
      </div>
    </v-page>
    <common-dialog :visible.sync="sendCouponVisible" :title = "sendCouponTitle" :width = "sendCouponWidth" @confirm = "dialogConfirm" @clearCheck = "dialogClearCheck" :isClearCheck = true>
      <template slot = "form" slot-scope="slot">
        <v-form ref="form" :formSettings="dialogFormSettings" :formData="dialogFormData" :showButton="false" class="edit_add_form" labelWidth = "100px">
        </v-form>
      </template>
    </common-dialog>
    <common-dialog :visible.sync="lookCouponVisible" :title = "lookCouponTitle" :width = "lookCouponWidth" :showButton = false>
      <template slot = "searchTable" slot-scope="search">
        <el-card class="table-box">
          <div slot="header">
            <v-search :searchSettings="dialogSearchSettings" @search="dialogHandleSearch" class = "coupon"></v-search>
          </div>
          <div class="table-container">
            <el-table
              v-loading="loading"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </template>
    </common-dialog>
  </div>
</template>
<script>
import layoutDetail from '@/components/detail/layout-detail'
import commonDialog from './dialog/commonDialog'
import { detailSettings } from './detailSettings'
import dialogFormSettings from './dialog/formSetting.js'
import dialogSearchSettings from './dialog/searchSettings.js'
import { Loading } from 'element-ui'
export default {
  name: 'v-details',
  components: {
    layoutDetail,
    commonDialog
  },
  props: {
    userId: {
      type: Number
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      detailData: null,
      detailSettings: detailSettings,
      sendCouponVisible: false,
      lookCouponVisible: false,
      sendCouponTitle: '发放优惠券',
      lookCouponTitle: '查看优惠券',
      sendCouponWidth: '500px',
      lookCouponWidth: '80%',
      dialogFormSettings: dialogFormSettings,
      dialogSearchSettings: dialogSearchSettings,
      dialogFormData: {},
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      loading: false
    }
  },
  watch: {
    visible(val) {
      if (val && this.userId) {
        this.getDetails()
      }
    }
  },
  methods: {
    lookCoupon () {
      this.lookCouponVisible = true
      this.loading = true
      // Loading.service({
      //   target: '.tabs>.el-tabs__content .el-dialog__body',
      //   fullscreen: false
      // })
    },
    dialogHandleSearch () {},
    dialogClearCheck () {
      this.dialogFormData = {}
    },
    dialogConfirm () {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        console.log(data)
        this.sendCouponVisible = false
      }).catch(err => {
        console.log('====err====', err)
      })
    },
    getDetails() {
      if (this.userId) {
        this.$service.customerInfor({ userId: this.userId }).then(res => {
          this.detailData = res.data.data
        })
      }
    },
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    }
  }
}
</script>

<style lang="scss">
</style>
