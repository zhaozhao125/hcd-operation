<template>
  <div id="customer-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <div class="table-operator">
        <el-button  size="small" type="primary" @click = 'addAccount'>添加账号</el-button>
      </div>
      <v-table :tableData = "tableData" @on-edit = "editAccount"></v-table>
      <add-edit ref = "add" @on-success = 'loadTableData'></add-edit>
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
import { handleSubmitSearchData } from '@/utils/common.js'
import branchDetails from './components/branch-details'

import vTable from './components/table'
import addEdit from './components/addEditAccount/index'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    branchDetails,
    vTable,
    addEdit
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      page: 1
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    editAccount (row) {
      this.$refs.add.show(row)
    },
    addAccount () {
      this.$refs.add.show()
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      this.$service.getAccountList(this.searchData, this.page).then(res => {
        // this.tableData = res.data.data.content
        this.tableData = res.data.data.content.map((ele) => {
          return Object.assign({}, ele.adminRole, ele.adminUser)
        })
        console.log(this.tableData)
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
