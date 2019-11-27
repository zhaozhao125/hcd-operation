<template>
  <div id="publish-list">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>发行列表</h3>
      </div>
      <div  class="publish-list-content" slot="content" >
        <el-card class="table-box">
          <div slot="header">
             <v-search :searchSettings="publishSearchSettings" @search = "handleSearch"></v-search>
          </div>
          <div class="table-container">
            <el-table :data="tableData" height="100%" :highlight-current-row = true>
              <el-table-column label="优惠券编码" min-width="180px"  prop="code" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="couponsName" label="优惠券名" min-width="180px" show-overflow-tooltip></el-table-column>
              <el-table-column prop="userName" label="姓名" min-width="120px"></el-table-column>
              <el-table-column prop="userPhone" label="手机号" min-width="120px">
              </el-table-column>
              <el-table-column prop="isUsed" label="优惠券状态" min-width="120px">
                <template slot-scope="scope">
                  <span v-if = "scope.row.isUsed == '0'">未使用</span>
                  <el-tooltip v-if="scope.row.isUsed == '1' " class="item" effect="dark" :content="scope.row.addTime" placement="top">
                    <span>已使用</span>
                  </el-tooltip>
                  <span v-if = "scope.row.isUsed == '2'">已过期</span>
                </template>
              </el-table-column>
              <el-table-column prop="addTime" label="领取时间" min-width="180px"></el-table-column>
              <el-table-column prop="contact" label="使用有效期" min-width="200px">
                <template slot-scope="scope">
                  开始：<span>{{scope.row.beginDate}}</span><br/>
                  结束：<span>{{scope.row.expireDate}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="voucher" label="发券人" min-width="120px">
                <template slot-scope="scope">
                  <el-tooltip  class="item" effect="dark" :content="scope.row.voucher" placement="top" v-if = "scope.row.voucher && scope.row.acountName">
                    <span>{{scope.row.acountName}}</span>
                  </el-tooltip>
                  <span v-else>{{scope.row.acountName}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class='table-page'>
             <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal"    @current-change="_handlePageChange">
             </el-pagination>
          </div>
        </el-card>
      </div>
    </v-page>
  </div>
</template>
<script>
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
export default {
  name: 'publish-list',
  mixins: [searchHistoryMixin, paginationMixin],
  props: {
    visible: {
      type: Boolean
    },
    couponsId: {
      type: Number
    }
  },
  data() {
    return {
      page: 1,
      searchData: {},
      tableData: [],
      publishSearchSettings: [
        {
          type: 'text',
          label: '用户手机号',
          placeholder: '请输入用户手机号',
          name: 'userPhone',
          optionValue: 'name',
          visible: true
        }
      ]
    }
  },
  watch: {
    visible(val) {
      if (val && this.couponsId) {
        this.loadTableData()
      }
    }
  },
  methods: {
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      this.searchData.couponsId = this.couponsId
      this.$service.publishList(this.searchData, this.page).then(res => {
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
#publish-list {
  .publish-list-content {
    height:100%;
  }
}
</style>
