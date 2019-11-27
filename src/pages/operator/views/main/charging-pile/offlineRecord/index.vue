<template>
  <div>
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth">
          <template slot="stationId" slot-scope="scope">
            <website-select ref="website" v-model="scope.model.stationId"  placeholder="请输入站点名称" isRequest  :open='false' :isStationRemote = true  ></website-select>
          </template>
        </v-search>
      </div>
      <v-table :tableData = "tableData"></v-table>
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
import vTable from './components/table'
import websiteSelect from '@/components/website-select'
import api from '@manage/service/api/'
export default {
  name: 'customerList',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    vTable,
    websiteSelect
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      page: 1,
      startCreatedOn: '',
      endCreatedOn: ''
    }
  },
  mounted () {
    this.loadTableData()
    this.allCompanyList()
  },
  methods: {
    allCompanyList () {
      this.$service.allCompanyList().then((res) => {
        this.$nextTick(() => {
          this.searchSettings[3].options = res.data.data.map((ele) => {
            console.log(ele)
            return {
              label: ele.name,
              value: ele.operatorId
            }
          })
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
