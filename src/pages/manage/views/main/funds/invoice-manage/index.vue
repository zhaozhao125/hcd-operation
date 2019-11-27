<template>
  <div >
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <v-table :tableData="tableData" @showDetail ="showDetail" @on-reload='loadTableData'></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <invoice-details :sn="sn" :visible.sync="detailVisible" @closePage="closePage" ></invoice-details>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import invoiceDetails from './components/invoice-details'

import vTable from './components/table'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    invoiceDetails,
    vTable
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      sn: null,
      btnVisible: true,
      page: 1
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    showDetail (sn) {
      this.detailVisible = true
      this.sn = sn
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      if (searchData.applyTime && searchData.applyTime.length) {
        searchData.startTime = handleDate(searchData.applyTime[0], 'day')
        searchData.endTime = handleDate(searchData.applyTime[1], 'day')
        searchData.timeQueryType = 'apply'
      }
      if (searchData.handleTime && searchData.handleTime.length) {
        searchData.startTime = handleDate(searchData.handleTime[0], 'day')
        searchData.endTime = handleDate(searchData.handleTime[1], 'day')
        searchData.timeQueryType = 'handle'
      }
      delete searchData.applyTime
      delete searchData.handleTime
      this.searchData = searchData
      console.log(this.searchData)
      this.loadTableData()
    },
    loadTableData() {
      console.log('====loadTableData====')
      this.$service.manageInvoiceList(this.searchData, this.page).then(res => {
        this.tableData = res.data.data.records.map((ele) => {
          return ele
        })
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
