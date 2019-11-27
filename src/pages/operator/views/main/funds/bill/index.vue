<template>
  <div id="bill-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <div class="table-operator">
        <el-button size="small" type="primary" @click = "exportFile">导出</el-button>
      </div>
      <div class="car-summary table-operator">
        <ul>
          <li>收支总计: {{operatorSum}} </li>
        </ul>
      </div>
      <v-table :tableData = "tableData" @on-reload = 'loadTableData'></v-table>
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
  name: 'bill',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    vTable,
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      page: 1,
      searchData: {},
      operatorSum: '',
      start: '',
      end: ''
    }
  },
  mounted () {
    this.loadTableData()
    this.sublectList()
    this.operatorMoneySum()
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
            this.$service.operatorBillExport(
              params,
              this.$store.getters.token,
              '运营商余额流水.xlsx',
              api.OPERATOR_BILL_EXPORT)
          }
        } else {
          this.$message.warning('请设置导出时间范围！')
        }
      }
    },
    sublectList () {
      this.$service.subjectListManage({ operatorMoneyType: 'balance' }).then((res) => {
        this.$nextTick(() => {
          this.searchSettings[1].options = res.data.data.map((ele) => {
            return {
              label: ele.operatorMoneyTypeText,
              value: ele.operatorMoneyType
            }
          })
        })
      })
    },
    operatorMoneySum () {
      this.$service.operatorMoneySum(this.searchData).then(res => {
        if (res.data.data) {
          this.operatorSum = res.data.data.sum
        } else {
          this.operatorSum = 0
        }
      })
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      if (searchData.selectDate && searchData.selectDate.length) {
        searchData.dateStart = handleDate(searchData.selectDate[0], 'day')
        searchData.dateEnd = handleDate(searchData.selectDate[1], 'day')
        this.start = Date.parse(searchData.selectDate[0]) / 1000
        this.end = Date.parse(searchData.selectDate[1]) / 1000
      } else {
        this.start = ''
        this.end = ''
      }
      delete searchData.selectDate
      if (searchData.actionCodes) {
        searchData.actionCodes = [searchData.actionCodes]
      }
      this.searchData = searchData
      this.loadTableData()
      this.operatorMoneySum()
    },
    loadTableData() {
      this.$service.balanceFlowList(this.searchData, this.page).then(res => {
        this.tableData = res.data.data.records
        this._changePageTotal(res.data.data.totalElements)
      })
    },
    closePage() {
      this.loadTableData()
      this.operatorMoneySum()
    }
  }
}
</script>
<style lang="scss">

</style>
