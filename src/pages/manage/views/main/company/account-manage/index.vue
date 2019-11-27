<template>
  <div id="account-manage">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
      </div>
      <div class="table-operator">
        <el-button  size="small" type="primary" @click = "addCompany">添加</el-button>
      </div>
      <v-table :tableData = "tableData" @showDetail ="showDetail" @on-edit = "edit" @on-reload = 'loadTableData'></v-table>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
      <company-details :id="id" :visible.sync="detailVisible" @closePage="closePage" ></company-details>
      <add-edit :visible.sync="addVisible" @closePage="closePage" :handelType = "handelType" :formDatas = "informationData"> </add-edit>
    </el-card>
  </div>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleDate } from '@/utils/date-filter'
import companyDetails from './components/company-details'
import addEdit from './components/add-edit/'

import vTable from './components/table'
export default {
  name: 'accountManage',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    companyDetails,
    vTable,
    addEdit
  },
  data() {
    return {
      searchSettings: searchSettings,
      labelWidth: '120px',
      tableData: [],
      detailVisible: false,
      addVisible: false,
      id: null,
      page: 1,
      handelType: 'addCompany',
      informationData: null
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
          this.searchSettings[2].options = res.data.data.map((ele) => {
            return {
              label: ele.name,
              value: ele.id
            }
          })
        })
      })
    },
    showDetail (id) {
      this.detailVisible = true
      this.id = id
    },
    addCompany () {
      this.addVisible = true
      this.handelType = 'addCompany'
      this.informationData = null
    },
    edit (row) {
      this.addVisible = true
      this.handelType = 'editCompany'
      this.$service.companyInfor({ id: row.id }).then((res) => {
        this.informationData = res.data.data
      })
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      if (searchData.selectDate && searchData.selectDate.length) {
        searchData.startCreatedOn = handleDate(searchData.selectDate[0], 'day')
        searchData.endCreatedOn = handleDate(searchData.selectDate[1], 'day')
      }
      delete searchData.selectDate
      this.searchData = searchData
      this.loadTableData()
    },
    loadTableData() {
      this.$service.companyAccountList(this.searchData, this.page).then(res => {
        this.tableData = res.data.data.content
        this.tableData.forEach((ele) => {
          if (ele.status == 'valid') {
            ele.status = true
          } else {
            ele.status = false
          }
        })
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
