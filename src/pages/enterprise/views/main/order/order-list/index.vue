<template>
  <div id="customer-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth" @operationChange="operationChange">
          <template slot="stationId" slot-scope="scope">
            <website-select ref="website" v-model="scope.model.stationId" placeholder="请输入站点名称" isRequest :open='false' :isEnterpriseStationRemote = true></website-select>
          </template>
        </v-search>
      </div>
      <div class="table-operator">
        <el-button :loading="exportLoading" size="small" type="primary" @click="exportFile">导出订单</el-button>
      </div>

      <vTable :tableData="tableData" @showDetails="showDetails"></vTable>

      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <order-details :orderSn="orderSn" :visible.sync="detailVisible" @closePage="closePage"></order-details>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import { handleSubmitSearchData } from '@/utils/common.js'
import vTable from './components/table'
import orderDetails from './components/order-details'
import websiteSelect from '@/components/website-select'
import api from '@manage/service/api/'
export default {
  name: 'orderList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    vTable,
    orderDetails,
    websiteSelect
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '130px',
      searchData: {},
      tableData: [],
      detailVisible: false,
      orderSn: null,
      btnVisible: true,
      page: 1,
      exportLoading: false,
      operatorId: this.$store.state.user.operatorId,
      startCreatedOn: '',
      endCreatedOn: ''
    }
  },
  mounted () {
    this.loadTableData()
    this.allOperators()
  },
  methods: {
    allOperators () {
      this.$service.allOperators().then((res) => {
        this.$nextTick(() => {
          this.searchSettings[1].options = res.data.data.map((ele) => {
            return {
              label: ele.name,
              value: ele.operatorId
            }
          })
        })
      })
    },
    operationChange (val) {
      this.operatorId = val
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      if (searchData.selectDate && searchData.selectDate.length) {
        searchData.startCreatedOn = handleDate(searchData.selectDate[0], 'day')
        searchData.endCreatedOn = handleDate(searchData.selectDate[1], 'day')
        this.startCreatedOn = Date.parse(searchData.selectDate[0]) / 1000
        this.endCreatedOn = Date.parse(searchData.selectDate[1]) / 1000
      } else {
        this.startCreatedOn = ''
        this.endCreatedOn = ''
      }
      delete searchData.selectDate
      searchData = handleSubmitSearchData(searchData)
      this.searchData = searchData
      this.page = 1
      this.loadTableData()
    },
    loadTableData() {
      let params = {
        companySn: this.$store.getters.user.companySn,
        page: this.page,
        pageSize: this.pageSize,
        ...this.searchData
      }
      this.$service.orderList(params).then(res => {
        this.tableData = res.data.data.records
        this._changePageTotal(res.data.data.totalElements)
      })
    },
    closePage() {
      this.loadTableData()
    },
    showDetails(orderSn) {
      console.log(orderSn)
      this.orderSn = orderSn
      this.detailVisible = true
    },
    exportFile() {
      if (this.tableData.length < 1) {
        this.$message.warning('导出订单为空，请重新查询！')
      } else {
        if (this.startCreatedOn) {
          if (((this.endCreatedOn - this.startCreatedOn) / 60 / 60 / 24) > 31) {
            this.$message.warning('导出订单时间范围必须小于等于31天，请重新设置')
          } else {
            let params = {
              companySn: this.$store.getters.user.companySn,
              page: this.page,
              pageSize: this.pageSize,
              ...this.searchData
            }
            this.$service.orderExport(
              params,
              this.$store.getters.token,
              '订单列表.xlsx',
              api.ORDER_EXPORT)
          }
        } else {
          this.$message.warning('请设置导出时间范围！')
        }
      }
    }
  }
}
</script>
<style lang="scss">
</style>
