<template>
  <div id="customer-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth">
          <template slot="stationName" slot-scope="scope">
            <website-select ref="website" v-model="scope.model.stationName"  placeholder="请输入站点名称" isRequest  :open='false' :isStationRemote = true  :operatorId = "operatorId"></website-select>
          </template>
        </v-search>
      </div>
      <div class="table-operator">
        <el-button  size="small" type="primary" @click = "addBranchs">添加</el-button>
        <el-button  size="small"  @click = "exportFile">导出</el-button>
      </div>
      <v-table :tableData = "tableData" @showDetail ="showDetail" @editStation = "editStation" @on-reload = "loadTableData"></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <branch-details :id="id" :visible.sync="detailVisible" @closePage="closePage" ></branch-details>
      <add-branch :visible.sync="addVisible" @closePage="closePage" :companyList = "searchSettings[1].options"  :id="id"></add-branch>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import { handleSubmitSearchData } from '@/utils/common.js'
import branchDetails from './components/branch-detail/index.vue'
import addBranch from './components/add-branch/index.vue'

import vTable from './components/table'
import websiteSelect from '@/components/website-select'
import api from '@operator/service/api/'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    branchDetails,
    vTable,
    addBranch,
    websiteSelect
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      addVisible: false,
      id: null,
      btnVisible: true,
      page: 1,
      operatorId: this.$store.state.user.operatorId,
      startCreatedOn: '',
      endCreatedOn: ''
    }
  },
  mounted () {
    this.loadTableData()
    // this.allCompanyList()
  },
  methods: {
    addBranchs () {
      this.addVisible = true
      this.detailVisible = false
    },
    editStation (row) {
      this.addVisible = true
      this.detailVisible = false
      console.log(row)
      this.id = row.id
    },
    showDetail (row) {
      this.detailVisible = true
      this.addVisible = false
      this.id = row.id
    },
    allCompanyList () {
      this.$service.allCompanyList().then((res) => {
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
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      if (searchData.datetimerange && searchData.datetimerange.length) {
        searchData.startCreatedOn = handleDate(searchData.datetimerange[0], 'day')
        searchData.endCreatedOn = handleDate(searchData.datetimerange[1], 'day')
        this.startCreatedOn = Date.parse(searchData.datetimerange[0]) / 1000
        this.endCreatedOn = Date.parse(searchData.datetimerange[1]) / 1000
      } else {
        this.startCreatedOn = ''
        this.endCreatedOn = ''
      }
      delete searchData.datetimerange
      this.searchData = searchData
      this.loadTableData()
    },
    exportFile() {
      let obj = this.searchData
      if (this.tableData.length < 1) {
        this.$message.warning('导出订单为空，请重新查询！')
      } else {
        if (this.startCreatedOn) {
          if (((this.endCreatedOn - this.startCreatedOn) / 60 / 60 / 24) > 31) {
            this.$message.warning('导出订单时间范围必须小于等于31天，请重新设置')
          } else {
            let params = {
              page: this.page,
              pageSize: this.pageSize,
              ...this.searchData
            }
            this.$service.branchExport(
              params,
              this.$store.getters.token,
              '充电站列表.xlsx',
              api.BRANCH_EXPORT)
          }
        } else {
          this.$message.warning('请设置导出时间范围！')
        }
      }
    },
    loadTableData() {
      this.$service.branchList(this.searchData, this.page).then(res => {
        this.tableData = res.data.data.records
        this._changePageTotal(res.data.data.totalElements)
      })
    },
    closePage() {
      this.loadTableData()
      this.id = null
    }
  }
}
</script>
<style lang="scss">

</style>
