<template>
  <div >
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <div class="table-operator">
        <el-button  size="small" type="primary" @click = "getInvoice">开发票</el-button>
      </div>
      <v-table :tableData="tableData" @showDetail ="showDetail" @on-reload='loadTableData'></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <invoice-details :sn="sn" :visible.sync="detailVisible" @closePage="closePage" ></invoice-details>
      <get-invoice :visible.sync="getVisible" @closePage="closePage"> </get-invoice>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import invoiceDetails from './components/invoice-details'
import getInvoice from './components/getInvoice'
import vTable from './components/table'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    invoiceDetails,
    vTable,
    getInvoice
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      sn: null,
      btnVisible: true,
      page: 1,
      getVisible: false
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    getInvoice () {
      this.getVisible = true
      this.$store.commit('chooseFlow', null)
    },
    showDetail (sn) {
      this.detailVisible = true
      this.sn = sn
    },
    handleSearch(data) {
      console.log(data)
      let searchData = Object.assign({}, data)
      if (searchData.selectDate && searchData.selectDate.length) {
        searchData.startTime = handleDate(searchData.selectDate[0], 'day')
        searchData.endTime = handleDate(searchData.selectDate[1], 'day')
        searchData.timeQueryType = 'handle'
      }
      delete searchData.selectDate
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      console.log('====loadTableData====')
      this.$service.manageEnterpriseInvoiceList(this.searchData, this.page).then(res => {
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
