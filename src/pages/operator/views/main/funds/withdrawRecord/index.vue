<template>
  <div id="withdrawRecord">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
       <div>
        <el-button size="small" type="primary" @click = "exportFile">导出</el-button>
      </div>
      <v-table :tableData = "tableData"  @on-reload = 'loadTableData'></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import vTable from './components/table'
import api from '@operator/service/api/'
export default {
  name: 'withdrawRecord',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    vTable
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      page: 1,
      start: '',
      end: ''
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    exportFile() {
      if (this.tableData.length < 1) {
        this.$message.warning('导出订单为空，请重新查询！')
      } else {
        if (this.start) {
          if (((this.end - this.start) / 60 / 60 / 24) > 31) {
            this.$message.warning('导出订单时间范围必须小于等于31天，请重新设置')
          } else {
            let params = {
              page: this.page,
              pageSize: this.pageSize,
              ...this.searchData
            }
            this.$service.operatorWithdrawExport(
              params,
              this.$store.getters.token,
              '提现记录.xlsx',
              api.OPERATOR_WITHDRAW_EXPORT)
          }
        } else {
          this.$message.warning('请设置导出时间范围！')
        }
      }
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      if (searchData.create && searchData.create.length) {
        searchData.dateStart = handleDate(searchData.create[0], 'day')
        searchData.dateEnd = handleDate(searchData.create[1], 'day')
        this.start = Date.parse(searchData.create[0]) / 1000
        this.end = Date.parse(searchData.create[1]) / 1000
        searchData.dateType = 'create'
      }
      if (searchData.success && searchData.success.length) {
        searchData.dateStart = handleDate(searchData.success[0], 'day')
        searchData.dateEnd = handleDate(searchData.success[1], 'day')
        this.start = Date.parse(searchData.success[0]) / 1000
        this.end = Date.parse(searchData.success[1]) / 1000
        searchData.dateType = 'success'
      }
      delete searchData.create
      delete searchData.success
      // searchData = handleSubmitSearchData(searchData)
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      this.$service.withdrawList(this.searchData, this.page).then(res => {
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
