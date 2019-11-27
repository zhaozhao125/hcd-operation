<template>
  <div id="customer-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <div class="table-operator">
        <el-button size="small" type="primary" @click = "exportFile">导出</el-button>
      </div>

      <div class="car-summary table-operator">
        <ul>
          <li>收支总计:{{sum}} </li>
        </ul>
      </div>
      <v-table :tableData = "tableData" @showDetail ="showDetail"></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <branch-details :userId="userId" :visible.sync="detailVisible" @closePage="closePage" ></branch-details>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import { handleSubmitSearchData } from '@/utils/common.js'
import branchDetails from './components/branch-details'

import vTable from './components/table'
import api from '@manage/service/api/'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    branchDetails,
    vTable
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      userId: null,
      btnVisible: true,
      page: 1,
      sum: '',
      startCreatedOn : '',
      endCreatedOn : ''
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    showDetail (userId) {
      this.detailVisible = true
      this.userId = userId
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      if (searchData.selectDate && searchData.selectDate.length) {
        searchData.dateStart = handleDate(searchData.selectDate[0], 'day')
        searchData.dateEnd = handleDate(searchData.selectDate[1], 'day')
        this.startCreatedOn = Date.parse(searchData.selectDate[0])/1000
        this.endCreatedOn = Date.parse(searchData.selectDate[1])/1000
      } else {
        this.startCreatedOn = ''
        this.endCreatedOn = ''
      }
      searchData.dateType = "create"
      delete searchData.selectDate
      this.searchData = searchData
      this.loadTableData()
    },
     exportFile() {
      let obj = this.searchData
      if (this.tableData.length < 1) {
        this.$message.warning('导出订单为空，请重新查询！')
        } else {
          if (this.startCreatedOn) {
            if (((this.endCreatedOn - this.startCreatedOn)/60/60/24) > 31) {
              this.$message.warning('导出订单时间范围必须小于等于31天，请重新设置')
            } else {
                    let params = {
                        page: this.page,
                        pageSize: this.pageSize,
                        ...this.searchData
                      }
                this.$service.refundBillExport(
                params,
                this.$store.getters.token,
                '收款对账单列表.xlsx',
                api.REFUND_BILL_EXPORT)
            }
          } else {
            this.$message.warning('请设置导出时间范围！')
          }
        }
    },
    loadTableData() {
      this.$service.refundBile(this.searchData, this.page).then(res => {
        if (res.data.data.pageData) {
          this.tableData = res.data.data.pageData.rows
          this._changePageTotal(res.data.data.pageData.total)
          this.sum =res.data.data.sum
          // this.$service.subMoney(this.searchData, this.page).then((res) => {
          // this.sum =res.data.data.sum
          // })
        }
        else {
          this.tableData = []
          this.sum = 0
          this._changePageTotal(0)
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

</style>
