<template>
  <el-card class="table-box">
    <div slot="header">
      <v-search :searchSettings="searchSettings" @search="handleSearch" :labelWidth="labelWidth"></v-search>
    </div>

    <div class="table-operator" style="margin-top:10px;">
      <el-button type="primary" size="small" @click="createEmployees()">添加员工</el-button>
    </div>

    <div class="table-container">
      <el-table :data="tableData" height="100%">
        <el-table-column label="用户编号" min-width="120px">
          <template slot-scope="scope">
            <span v-if="!scope.row.userId">未知</span>
            <el-button type="text" v-else @click="handleDetail(scope.row.userId)">{{scope.row.userId}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="用户信息" min-width="150px">
          <template slot-scope="scope">
            <div>
              <div>{{scope.row.userName}}</div>
              <div>{{scope.row.userPhone}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cityName" label="城市" min-width="120px"></el-table-column>
        <!-- <el-table-column prop="cityNameBelongTo" label="所属城市" min-width="120px"></el-table-column> -->
        <el-table-column prop="userMoney" label="余额" min-width="200px">
          <template slot-scope="scope">
            <div>
              <div>充值余额：{{scope.row.userMoney}}</div>
              <!-- <div>赠送余额：{{scope.row.userMoneyPresentation}}</div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="statusCode" label="是否启用" min-width="150px">
          <template slot-scope="scope">
              <span v-if="scope.row.statusCode === 0">禁用</span>
              <span v-else-if="scope.row.statusCode === 1">启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyRole" label="是否管理员" min-width="150px">
          <template slot-scope="scope">
            <popSwitch v-model="scope.row.statusRoleCode" trueText="确定将该员工解除企业管理员吗？确定后该账号将没有企业管理权限，请谨慎操作。" falseText="确定将该员工设为企业管理员吗？确定后该账号将拥有企业管理权限，请谨慎操作。" @confirm="handleConfirmSwitch(scope.row)" @cancel="handleCancelSwitch"></popSwitch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="140">
            <template slot-scope="scope">
              <el-button type="text" @click="removeEmployees(scope.row)">移除</el-button>
              <el-button type="text" @click="resetPassword(scope.row)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-table>
    </div>

    <div class='table-page'>
      <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
      </el-pagination>
    </div>

    <v-customer-details :userId="userId" :btnVisible="btnVisible" :visible.sync="detailVisible" @closePage="closePage" @update="update"></v-customer-details>

    <employee-add :visible.sync="employeeAddVisible" :sn="sn" @close="close"></employee-add>
  </el-card>
</template>
<script>
import searchSettings from './components/searchSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleSubmitSearchData } from '@/utils/common.js'
import popSwitch from '@/components/pop-switch'
import vCustomerDetails from '../../../../customer/customer-list/components/customer-details'
import employeeAdd from './components/employee-add'

export default {
  name: 'employee-list',
  mixins: [searchHistoryMixin, paginationMixin],
  components: {
    popSwitch,
    vCustomerDetails,
    employeeAdd
  },
  props: {
    sn: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      labelWidth: '150px',
      searchSettings: searchSettings,
      tableData: [],
      userId: null,
      btnVisible: true,
      detailVisible: false,
      employeeAddData: {},
      employeeAddVisible: false
    }
  },
  created() {
    console.log(this.sn)
    if (this.sn !== '') {
      this.loadTableData()
    }
  },
  methods: {
    close() {
      this.loadTableData()
    },
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      // if (searchData.cityId) {
      //   searchData.cityType = 'register'
      // }
      // if (searchData.cityIdBelongTo) {
      //   searchData.cityId = searchData.cityIdBelongTo
      //   searchData.cityType = 'belongTo'
      //   delete searchData.cityIdBelongTo
      // }
      if (searchData.registerTime && searchData.registerTime.length) {
        searchData.startDate = searchData.registerTime[0] * 1000
        searchData.endDate = searchData.registerTime[1] * 1000
        searchData.dateType = 1
      }
      if (searchData.userUploadTime && searchData.userUploadTime.length) {
        searchData.startDate = searchData.userUploadTime[0] * 1000
        searchData.endDate = searchData.userUploadTime[1] * 1000
        searchData.dateType = 4
      }
      if (
        searchData.timeShareRechargeFirstTime &&
        searchData.timeShareRechargeFirstTime.length
      ) {
        searchData.startDate = searchData.timeShareRechargeFirstTime[0] * 1000
        searchData.endDate = searchData.timeShareRechargeFirstTime[1] * 1000
        searchData.dateType = 5
      }
      if (
        searchData.timeShareOrderFirstTime &&
        searchData.timeShareOrderFirstTime.length
      ) {
        searchData.startDate = searchData.timeShareOrderFirstTime[0] * 1000
        searchData.endDate = searchData.timeShareOrderFirstTime[1] * 1000
        searchData.dateType = 6
      }
      delete searchData.registerTime
      delete searchData.userUploadTime
      delete searchData.timeShareRechargeFirstTime
      delete searchData.timeShareOrderFirstTime
      searchData = handleSubmitSearchData(searchData)
      this.searchData = searchData
      this.page = 1
      this.loadTableData()
    },
    loadTableData() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        companySn: this.sn,
        ...this.searchData
      }
      this.$service.getEmployeesList(params).then(res => {
        this.tableData = res.data.data.records
        this.tableData.forEach(item => {
          if (item.companyRole === 'manager') {
            item.statusRoleCode = true
          } else if (item.statusRoleCode === 'general') {
            item.statusRoleCode = false
          }
        })
        this._changePageTotal(res.data.data.totalElements)
      })
    },
    handleDetail(userId) {
      this.userId = userId
      this.detailVisible = true
    },
    // 添加员工
    createEmployees() {
      this.employeeAddVisible = true
    },
    handleConfirmSwitch(row) {
      if (row.statusRoleCode === true) row.companyRole = 'general'
      else row.companyRole = 'manager'
      let params = {
        staffId: row.companyStaffId,
        role: row.companyRole,
        companySn: row.companySn
      }
      this.$service.switchEmployeesRole(params).then(res => {
        if (res.data.code == '0') {
          this.loadTableData()
          row.statusRoleCode = !row.statusRoleCode
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }
      })
    },
    handleCancelSwitch() {},
    removeEmployees(row) {
      this.$confirm('确定移除该员工?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          staffId: row.companyStaffId,
          companySn: row.companySn
        }
        this.$service.removeEmployees(params).then(res => {
          if (res.data.code == '0') {
            this.loadTableData()
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetPassword(row) {
      let params = {
        staffId: row.companyStaffId,
        companySn: row.companySn
      }
      this.$service.employeesResetPassword(params).then(res => {
        if (res.data.code == '0') {
          this.$confirm(`用户密码为： ${res.data.data.password}`, '重置成功', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'success'
          })
        }
      })
    },
    closePage() {
      this.loadTableData()
    },
    update(userId) {
      this.handleDetail(userId)
    }
  }
}
</script>
<style lang="scss">
</style>
