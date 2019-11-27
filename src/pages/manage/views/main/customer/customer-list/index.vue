<template>
  <div id="customer-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <v-table :tableData="tableData" @showDetail ="showDetail" @on-reload='loadTableData'></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <customer-details :userId="userId" :visible.sync="detailVisible" @closePage="closePage" ></customer-details>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import customerDetails from './components/customer-details'

import vTable from './components/table'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    customerDetails,
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
      page: 1
    }
  },
  mounted () {
    this.loadTableData()
    let arr = [{ id: 1, name: 'aa' }, { id: 2, name: 'bb' }]
    // let res = arr.filter(ele => ele.id === 1)
    let res = arr.filter((ele) => {
      return ele.id === 1
    })
    res[0].name = 'ccc'
    // a.push(res)
    console.log(arr)
    console.log(res)
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
      }
      delete searchData.selectDate
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      console.log('====loadTableData====')
      this.$service.customerList(this.searchData, this.page).then(res => {
        this.tableData = res.data.data.rows.map((ele) => {
          return ele
        })
        this.tableData.forEach((ele) => {
          ele.statusCode = !!ele.statusCode
        })
        this._changePageTotal(res.data.data.total)
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
