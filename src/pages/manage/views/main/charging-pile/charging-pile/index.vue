<template>
  <div id="customer-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth" @operationChange = "operationChange">
          <template slot="stationId" slot-scope="scope">
            <website-select ref="website" v-model="scope.model.stationId"  placeholder="请输入站点名称" isRequest  :open='false' :isStationRemote = true  ></website-select>
          </template>
        </v-search>
      </div>
      <div class="table-operator">
        <el-button
          size="small" type="primary" @click = "addPile">添加</el-button>
        <el-button size="small"  @click="exportFile">导出</el-button>
      </div>
      <v-table :tableData = "tableData" @showDetail ="showDetail" @on-edit = "editPile"></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <pile-details :id="id" :visible.sync="detailVisible" @closePage="closePage" ></pile-details>
      <add-edit ref = "addEditPile" @on-success = "loadTableData"></add-edit>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import pileDetails from './components/pile-details'

import addEdit from './components/add-edit/index'
import vTable from './components/table'
import websiteSelect from '@/components/website-select'
import api from '@manage/service/api/'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    pileDetails,
    vTable,
    addEdit,
    websiteSelect
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      id: null,
      btnVisible: true,
      page: 1,
      operationLists: null,
      operatorId: this.$store.state.user.operatorId,
      startCreatedOn: '',
      endCreatedOn: ''
    }
  },
  mounted () {
    this.loadTableData()
    this.allCompanyList()
  },
  methods: {
    getSelectItemId () {

    },
    operationChange (val) {
      this.operatorId = val
    },
    addPile () {
      this.$refs.addEditPile.show()
    },
    editPile (val) {
      this.$refs.addEditPile.show(val)
    },
    showDetail (id) {
      this.detailVisible = true
      this.id = id
    },
    allCompanyList () {
      this.$service.allCompanyList().then((res) => {
        this.$nextTick(() => {
          this.searchSettings[4].options = res.data.data.map((ele) => {
            console.log(ele)
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
            this.$service.pileExport(
              params,
              this.$store.getters.token,
              '充电桩列表.xlsx',
              api.PILE_EXPORT)
          }
        } else {
          this.$message.warning('请设置导出时间范围！')
        }
      }
    },
    loadTableData() {
      this.$service.pileList(this.searchData, this.page).then(res => {
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
