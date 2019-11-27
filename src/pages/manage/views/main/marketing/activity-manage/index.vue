<template>
  <div id="customer-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <div class="table-operator">
        <el-button size="small" type="primary" @click="activityType">添加活动</el-button>
      </div>
      <v-table :tableData="tableData" @showDetail="showDetail" @on-reload='loadTableData' @editFullReturn='fullReturnShowFun' @editnewUserFun='newUserFun' @editRecharging='showDetail' @detialFullReturn='detialFullReturn' @detialNewUser="detialNewUser" @detialRecharging='detialRecharging'></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <!-- 充送 -->
      <customer-details v-if="detailVisible" :visible.sync="detailVisible" @closePage="closePage" :formData="formData" :showButton="showButton" @saveAndReload="saveAndReload"></customer-details>
      <detial-recharging :visible.sync="detialRechargingV" @closePage="closePage" :visibleShow="detialRechargingV" :detailData="formData"></detial-recharging>
      <!-- 满返 -->
      <full-return v-if="fullReturnShow" :visible.sync="fullReturnShow" @closePage="closePage" :showButton="showButton" :formData="formData" @saveAndReload="saveAndReload"></full-return>
      <full-return-detial :visible.sync="fullReturnDetialShow" @closePage="closePage" :detailData="formData" :visibleShow="fullReturnDetialShow"></full-return-detial>
      <!-- 新用户注册 -->
      <new-user v-if="newUserShow" :visible.sync="newUserShow" @closePage="closePage" :showButton="showButton" :formData="formData" @saveAndReload="saveAndReload"></new-user>
      <detial-new-user :visible.sync="detialNewUserV" @closePage="closePage" :visibleShow="detialNewUserV" :detailData="formData"></detial-new-user>
    </el-card>
    <v-page :visible.sync="activityTypeShow">
      <div class="detail-content" slot="content">
        <el-row>
          <el-col :span="8" style="width:382px; height:100px;background: #F8F8F8;border-radius: 1px; margin: 10px; padding: 15px; cursor: pointer;">
            <div @click="activityTypeNext('charging')">
              <el-col :span="4">
                <img src="~@/assets/img/charging.png" style="width: 70px; height: 70px;border-radius: 8.08px;">
            </el-col>
                <el-col :span="20" style="padding: 10px 20px;">
                  <div style="font-family: PingFangSC-Medium;font-size: 18px;color: #262626;letter-spacing: 0;">充送</div>
                  <div style="font-family: PingFangSC-Medium;font-size: 14px;color: #BBB9BA;letter-spacing: 0;">根据充值金额赠送优惠券</div>
                </el-col>
            </div>
          </el-col>
          <el-col :span="8" style="width:400px; height:100px;background: #F8F8F8;border-radius: 1px; margin: 10px; padding: 15px; cursor: pointer;">
            <div @click="activityTypeNext('fullReturn')">
              <el-col :span="4">
                <img src="~@/assets/img/fullReturn.png" style="width: 70px; height: 70px;border-radius: 8.08px;">
            </el-col>
                <el-col :span="20" style="padding: 10px 20px;">
                  <div style="font-family: PingFangSC-Medium;font-size: 18px;color: #262626;letter-spacing: 0;">满返</div>
                  <div style="font-family: PingFangSC-Medium;font-size: 14px;color: #BBB9BA;letter-spacing: 0;">订单在一个消费周期内满一定金额返优惠券</div>
                </el-col>
            </div>
          </el-col>
          <el-col :span="8" style="width:382px; height:100px;background: #F8F8F8;border-radius: 1px; margin: 10px; padding: 15px; cursor: pointer;">
            <div @click="activityTypeNext('newUser')">
              <el-col :span="4">
                <img src="~@/assets/img/newUser.png" style="width: 70px; height: 70px;border-radius: 8.08px;">
            </el-col>
                <el-col :span="20" style="padding: 10px 20px;">
                  <div style="font-family: PingFangSC-Medium;font-size: 18px;color: #262626;letter-spacing: 0;">新用户注册</div>
                  <div style="font-family: PingFangSC-Medium;font-size: 14px;color: #BBB9BA;letter-spacing: 0;">新用户注册赠送优惠券</div>
                </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
    </v-page>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import customerDetails from './components/customer-details'
import fullReturn from './components/full-return'
import newUser from './components/new-user'
import fullReturnDetial from './components/full-return-detial'
import detialRecharging from './components/detial-recharging'
import detialNewUser from './components/detial-new-user'
import vTable from './components/table'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    customerDetails,
    fullReturn,
    newUser,
    vTable,
    fullReturnDetial,
    detialRecharging,
    detialNewUser
  },
  data() {
    return {
      showButton: false,
      formData: {},
      newUserShow: false,
      fullReturnShow: false,
      fullReturnDetialShow: false,
      activityTypeVal: '',
      activityTypeShow: false,
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      detailVShow: false,
      detialRechargingV: false,
      detialNewUserV: false,
      userId: null,
      btnVisible: true,
      page: 1
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    saveAndReload() {
      console.dir('满返活动添加')
      this.fullReturnShow = false
      this.newUserShow = false
      this.detailVisible = false
      this.activityTypeVal = ''
      this.loadTableData()
    },
    detialRecharging(row) {
      this.detialRechargingV = true
      this.formData = row.item
    },
    detialNewUser(row) {
      this.detialNewUserV = true
      this.formData = row.item
    },
    detialFullReturn(row) {
      this.fullReturnDetialShow = true
      this.formData = row.item
    },
    activityTypeNext(value) {
      console.dir(value)
      console.dir(this.activityTypeVal)
      this.activityTypeShow = false
      switch (value) {
        case 'charging':
          this.showDetail({}, true)
          break
        case 'fullReturn':
          this.fullReturnShowFun({}, true)
          break
        case 'newUser':
          this.newUserFun({}, true)
          break
      }
    },
    activityType() {
      console.dir('选择活动类型')
      this.activityTypeShow = true
      this.activityTypeVal = ''
      this.formData = {}
    },
    showDetail(row, showButton = false) {
      console.log(row)
      if (row.item) {
        showButton = true
      }
      this.detailVisible = true
      this.formData = row.item
      this.showButton = showButton
    },
    // 满返 编辑和添加
    fullReturnShowFun(row, showButton = false) {
      if (row.item) {
        showButton = true
      }
      this.fullReturnShow = true
      this.showButton = showButton
      this.formData = row.item
    },
    newUserFun(row, showButton = false) {
      if (row.item) {
        showButton = true
        this.formData = row.item
      } else {
        this.formData = {}
      }
      this.newUserShow = true
      this.formData = row.item
      this.showButton = showButton
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      this.searchData.page = this.page
      this.searchData.pageSize = 20
      this.$service.getActivityList(this.searchData).then(res => {
        if (res.code == 0 && res.data.data.totalElements == 0) {
          this._changePageTotal(0)
          this.tableData = []
        } else {
          this._changePageTotal(res.data.totalElements)
          this.tableData = this.$service.formateListRow(res.data.data.content)
          this._changePageTotal(res.data.data.totalElements)
        }
      })
    },
    closePage() {
      this.loadTableData()
    }
  }
}

</script>
<style lang="scss">
.transition-box {
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: #409EFF;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.activityTypeClass {
  width: 150px;
  height: 150px;
}

.el-radio-button {
  position: relative;
  display: inline-block;
  outline: none;
  margin-left: 10px;
  border: 1px solid;
  color: #CCCCCC;
}

.activityTypeClassDiv {}

</style>
