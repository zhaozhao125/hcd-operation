<template>
  <div id="discount-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <div class="table-operator">
        <el-button  size="small" type="primary" @click = "addCoupon">添加优惠券</el-button>
      </div>
      <v-table :tableData = "tableData" @showDetail ="showDetail" @showPublishList = "showPublishList" @on-edit = "edit" @on-reload = 'loadTableData'></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <coupon-details :id="id" :visible.sync="detailVisible" @closePage="closePage" ></coupon-details>
      <publish-list :visible.sync="publishListVisible" @closePage="closePage" :couponsId = "couponsId">
      </publish-list>
      <add-edit :visible.sync="addVisible" @closePage="closePage" :handelType = "handelType" :id = "couponRow.id"> </add-edit>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import couponDetails from './components/coupon-details'
import publishList from './components/publish-list'
import addEdit from './components/add-edit/'

import vTable from './components/table'
export default {
  name: 'discountList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    couponDetails,
    vTable,
    addEdit,
    publishList
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      publishListVisible: false,
      addVisible: false,
      id: null,
      page: 1,
      couponsId: null,
      handelType: 'addCoupon',
      informationData: null,
      couponRow: {}
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    showDetail (val) {
      this.detailVisible = true
      this.id = val.id
    },
    showPublishList (row) {
      this.publishListVisible = true
      this.couponsId = row.id
    },
    addCoupon () {
      this.addVisible = true
      this.handelType = 'addCoupon'
      this.informationData = null
      this.couponRow = {}
    },
    edit (row) {
      this.addVisible = true
      this.handelType = 'editCoupon'
      this.couponRow = row
      // this.$service.couponDetail({ id: row.id }).then((res) => {
      //   this.informationData = res.data.data
      // })
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      if (searchData.selectDate && searchData.selectDate.length) {
        searchData.datemin = handleDate(searchData.selectDate[0], 'day')
        searchData.datemax = handleDate(searchData.selectDate[1], 'day')
      }
      delete searchData.selectDate
      // searchData = handleSubmitSearchData(searchData)
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      this.$service.couponList(this.searchData, this.page).then(res => {
        this.tableData = res.data.data.records
        this._changePageTotal(res.data.data.totalElements)
      })
    },
    closePage() {
      this.loadTableData()
    }
  }
}
</script>
<style lang="scss">

</style>
