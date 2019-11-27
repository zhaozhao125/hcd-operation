<template>
  <div id="customer-list">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth" @operationChange = "operationChange" ref= "vSearch">
           <template slot="stationId" slot-scope="scope">
            <website-select ref="website" v-model="scope.model.stationId"  placeholder="请输入站点名称" isRequest  :open='false' :isStationRemote = true ></website-select>
          </template>
        </v-search>
      </div>
      <v-table :tableData = "tableData" @showDetail ="showDetail"></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <charge-details :userId="userId" :visible.sync="detailVisible" @closePage="closePage" ></charge-details>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import { handleSubmitSearchData } from '@/utils/common.js'
import chargeDetails from './components/charge-details'
import websiteSelect from '@/components/website-select'
import vTable from './components/table'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    chargeDetails,
    vTable,
    websiteSelect
  },
  props: [
    'params'
  ],
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '100px',
      tableData: [],
      detailVisible: false,
      userId: null,
      btnVisible: true,
      page: 1,
      operatorId: this.$store.state.user.operatorId,
      searchData: {}

    }
  },
  mounted () {
    this.loadTableData()
    this.allCompanyList()
    console.log(1111)
    // this.searchSettings[4].stationId = ''
    // this.$refs.vSearch.updateForm()
    console.log(this.params)
    if (this.params) {
    } else {
       this.searchSettings[4].default = ''
       this.searchSettings[0].default = ''
       this.$refs.vSearch.updateForm()
    }
  },
  watch: {
    params(data) {
      this.loadTableData()
      console.log(222)
      console.log(this.params)
    }
  },
  methods: {
    operationChange (val) {
      this.operatorId = val
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
    showDetail (id) {
      this.detailVisible = true
      this.userId = id
    },
    handleSearch(data) {
      console.log(data)
      let searchData = Object.assign({}, data)

      if (searchData.selectDate && searchData.selectDate.length) {
        searchData.startEndTime = handleDate(searchData.selectDate[0], 'day')
        searchData.endEndTime = handleDate(searchData.selectDate[1], 'day')
      }
      delete searchData.selectDate
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      if (this.params) {
        this.searchData = Object.assign(this.searchData, this.params)
        this.searchSettings[4].default = this.params.stationName
        this.searchSettings[0].default = this.params.operatorEquipmentId
        this.$refs.vSearch.updateForm()
      } else {

      }
      this.$service.chargingOrder(this.searchData, this.page).then(res => {
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
