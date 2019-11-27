<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>用户详情</h3>
      </div>
      <div  class="detail-content" slot="content" v-if = "detailData">
        <layout-detail :detailData = "detailData" :detailSettings = "detailSettings">
          <template slot-scope="scope" slot="userName">
            <editInput  :value="detailData.userName" type="text" @updateVal="updateinfor" name="userName"></editInput>
          </template>
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
              <span>{{couponNum}}张</span>
              <el-button type = "text" class = "ml-10" @click = "loadTableData">查看</el-button>
              <el-button type= "text" @click = "sendCouponVisible = true">发放优惠券</el-button>
          </template>
        </layout-detail>
      </div>
    </v-page>
    <common-dialog :visible.sync="sendCouponVisible" :title = "sendCouponTitle" :width = "sendCouponWidth" @confirm = "dialogConfirm" @clearCheck = "dialogClearCheck" :isClearCheck = true>
      <template slot = "form" slot-scope="slot">
        <v-form ref="form" :formSettings="dialogFormSettings" :formData="dialogFormData" :showButton="false" class="edit_add_form" labelWidth = "100px">
             <template slot="couponsId" slot-scope="scope">
               <website-select ref="remoteCoupon" v-model="scope.model.couponsId"  placeholder="请输入优惠券名称" isRequest  :open='false' :isCouponsRemote = true  :counponsUserId = 'userId'></website-select>
             </template>
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
                prop="couponsCode"
                label="券码"
                show-overflow-tooltip
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="couponsName"
                show-overflow-tooltip
                label="优惠券名称"
                min-width="180">
              </el-table-column>
              <el-table-column prop="isUsed" label="使用状态" min-width="120px">
                <template slot-scope="scope">
                  <span v-if = "scope.row.isUsed == '0'">未使用</span>
                  <el-tooltip v-if="scope.row.isUsed == '1' " class="item" effect="dark" :content="scope.row.addTime" placement="top">
                    <span>已使用</span>
                  </el-tooltip>
                  <span v-if = "scope.row.isUsed == '2'">已过期</span>
                </template>
              </el-table-column>
             <el-table-column prop="money" label="金额/折扣" min-width="180px">
              <template slot-scope="scope">
                <div v-if="scope.row.type === 1">
                  {{ scope.row.money }}元
                  <span v-if="scope.row.useMoneyCondition > 0">（满{{ scope.row.useMoneyCondition }}元可用）</span>
                </div>
                <div v-else-if="scope.row.type === 2">
                  {{ scope.row.discount/10 }}折
                  <span v-if="scope.row.useMoneyTop > 0">（最高可抵{{ scope.row.useMoneyTop }}元）</span>
                </div>
              </template>
            </el-table-column>
               <el-table-column
                prop="couponsCode"
                label="有效期"
                min-width="180">
                <template slot-scope="scope">
                   <span>{{scope.row.beginDate}}</span> <br/>
                   <span>{{scope.row.expireDate}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="发券人"
                show-overflow-tooltip
                min-width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.voucher">
                    {{scope.row.voucher}}
                    <span v-if="scope.row.acountName">({{scope.row.acountName}})</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="180"
                prop="addTime"
                label="发券时间">
              </el-table-column>
              <el-table-column
                prop="remark"
                min-width="180"
                show-overflow-tooltip
                label="发券原因">
              </el-table-column>
               <el-table-column
                prop="address"
                min-width="100"
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                   <el-button type="text" @click = "deleteCoupon(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class='table-page'>
            <el-pagination :current-page="page" :page-size="10" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
            </el-pagination>
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
import websiteSelect from '@/components/website-select'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import editInput from '@/components/edit-input'
import { Loading } from 'element-ui'
export default {
  name: 'v-details',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    layoutDetail,
    commonDialog,
    websiteSelect,
    editInput
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
      lookCouponWidth: '70%',
      dialogFormSettings: dialogFormSettings,
      dialogSearchSettings: dialogSearchSettings,
      dialogFormData: {},
      page: 1,
      tableData: [],
      loading: false,
      couponNum: 0,
      searchData: {}
    }
  },
  watch: {
    visible(val) {
      if (val && this.userId) {
        this.getDetails()
        this.userCouponAmount()
        this.sendCouponVisible = false
        this.lookCouponVisible = false
      }
    }
  },
  methods: {
    updateinfor (name, updateVal) {
      let obj = {}
      obj[name] = updateVal
      obj.userId = this.detailData.userId
      this.$service.resetUserName(obj).then((res) => {
        this.$message.success('修改成功')
        this.getDetails()
      })
    },
    deleteCoupon (val) {
      this.$service.deleteUserCoupon({ userCouponsId: val.id }).then((res) => {
        this.$message.success('删除成功')
        this.loadTableData()
        this.userCouponAmount()
      })
    },
    userCouponAmount () {
      this.$service.userCouponAmount({ userId: this.userId, userCouponStatus: 0 }).then((res) => {
        this.couponNum = res.data.data.count
      })
    },
    loadTableData() {
      this.lookCouponVisible = true
      this.loading = true
      this.searchData.userId = this.userId
      this.$service.userCouponList(this.searchData, this.page, 10).then(res => {
        this.loading = false
        this.tableData = res.data.data.records.map((ele) => {
          return ele
        })
        this._changePageTotal(res.data.data.totalElements)
      })
    },
    dialogHandleSearch (data) {
      let searchData = Object.assign({}, data)
      this.searchData = searchData
      this.loadTableData()
    },
    dialogClearCheck () {
      this.dialogFormData = {}
    },
    dialogConfirm () {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        data.userId = this.userId
        this.$service.sendCoupon(data).then((res) => {
          this.$message.success('发送优惠券成功')
          this.sendCouponVisible = false
          this.getDetails()
          this.userCouponAmount()
        })
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
