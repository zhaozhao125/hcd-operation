<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>发票详情</h3>
      </div>
      <div  class="detail-content" slot="content" v-if = "detailData">
        <detail-basic :detailData = "detailData" :detailSettings = "detailSettings">
          <template slot-scope="scope" slot="applyTime">
              <span>{{detailData.applyTime | timeFilter}}</span>
          </template>
           <template slot-scope="scope" slot="handleTime">
              <span>{{detailData.handleTime | timeFilter}}</span>
          </template>
          <template slot-scope="scope" slot="money">
              <span>{{detailData.money}}元</span>
              <el-button type = "text" class = "ml-10" @click = "loadTableData" size = "medium">充值流水信息</el-button>
          </template>
        </detail-basic>
      </div>
    </v-page>
    <common-dialog :visible.sync="accountFlowVisible" :title = "accountFlowTitle" :width = "accountFlowWidth" :showButton = false>
      <template slot = "searchTable" slot-scope="search">
        <el-card class="table-box">
          <div class="table-container">
            <el-table
              v-loading="loading"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="orderSn"
                show-overflow-tooltip
                label="流水号"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="invoiceMoney"
                label="充值金额（元）"
                show-overflow-tooltip
                min-width="100">
              </el-table-column>
              <el-table-column
                min-width="180"
                prop="payTime"
                label="支付时间">
                 <template slot-scope="scope">
                  <div>申请时间：{{scope.row.payTime | timeFilter}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class='table-page'>
            <el-pagination :current-page="page" :page-size="10" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
            </el-pagination>
          </div>
        </el-card>
      </template>
    </common-dialog>
  </div>
</template>
<script>
import detailBasic from '@/components/detail/vDetail'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import commonDialog from '../../../customer/customer-list/components/dialog/commonDialog'
import { detailSettings } from './detailSettings'
export default {
  name: 'v-details',
  components: {
    detailBasic,
    commonDialog
  },
  mixins: [searchHistoryMixin, paginationMixin],
  props: {
    sn: {
      type: String
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      detailData: null,
      detailSettings: detailSettings,
      accountFlowVisible: false,
      accountFlowTitle: '充值流水信息',
      accountFlowWidth: '50%',
      page: 1,
      tableData: [],
      loading: false
    }
  },
  watch: {
    visible(val) {
      if (val && this.sn) {
        this.getDetails()
      }
    }
  },
  methods: {
    loadTableData () {
      this.accountFlowVisible = true
      this.$service.manageEnterpriseFlowList({ sn: this.sn }, this.page, 10).then(res => {
        this.tableData = res.data.data.records
        this.loading = false
        this._changePageTotal(res.data.data.totalElements)
      })
    },
    getDetails() {
      if (this.sn) {
        this.$service.manageEnterpriseInvoiceInfor({ sn: this.sn }).then(res => {
          this.detailData = res.data.data
        })
      }
    },
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    }
  }
}
</script>

<style lang="scss">
</style>
