<template>
  <div class="system-log">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch"></v-search>
      </div>
      <div class="table-container">
        <el-table :data="tableData" height="100%">
          <el-table-column prop="operatorName" label="操作人" min-width="140">
          </el-table-column>
          <el-table-column prop="opeModelType" label="操作模块" min-width="120">
          </el-table-column>
          <el-table-column prop="content" label="操作内容" min-width="180">
          </el-table-column>
          <el-table-column prop="ip" label="IP" min-width="120">
          </el-table-column>
          <el-table-column prop="createTime" label="操作时间" min-width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="table-page">
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import searchSettings from './searchSettings'
export default {
  mixins: [searchHistoryMixin, paginationMixin],

  data() {
    return {
      tableData: [],
      searchSettings,
      // 搜索数据
      searchData: {},
    }
  },

  mounted() {
    this.loadTableData()
  },

  methods: {
    loadTableData() {
      this.$service.getSystemLog(this.page, this.searchData).then(res => {
        let data = res.data.data.content
        this._changePageTotal(res.data.data.totalElements)
        this.tableData = data
      })
    },
    handleSearch(data) {
      this.searchData = data
      if (data.operatorName) {
        this._saveSearchHistory(data.operatorName, 'operatorName')
      }
      this.loadTableData()
    }
  }
}
</script>

<style lang="scss">
</style>
