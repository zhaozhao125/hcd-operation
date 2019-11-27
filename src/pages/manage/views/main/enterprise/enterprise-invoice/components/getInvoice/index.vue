<template>
  <div class="add-invoice">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>开发票</h3>
      </div>
      <v-form ref="form" slot="content" :formSettings="formSettings" :showButton="false" class="edit_add_form" label-width = "180px" @change = "typeChange">
        <template slot="companyName" slot-scope="scope">
          <!-- <div class = "company-info">
            <el-input v-model="scope.model.companyName" placeholder="请输入企业名称"></el-input>
          </div> -->
           <website-select ref="remoteCompany" v-model="scope.model.companyName"  placeholder="请输入站点名称" isRequest  :open='false' :isCopmpanyRemote = true  @change="companyChange"></website-select>
           <div v-if = "selectCompany && $refs.form.formModel.companyName" class = "invoice-mount">
             <span>已开票金额</span>
             <span class = "money">{{selectCompany[0].invoicedMoney}}元</span>
            </div>
        </template>
        <template slot="content" slot-scope="scope">
           <span>充电服务费</span>
        </template>
        <template slot="orderIds" slot-scope="scope">
          <div>
            <el-button type="text" @click = "loadTableData">选择流水号</el-button>
          </div>
        </template>
        <el-form-item slot="bottom-slot">
          <el-button type="primary" @click = "save">保存</el-button>
        </el-form-item>
      </v-form>
    </v-page>
    <common-dialog :visible.sync="flowListVisible" :title = "flowListTitle" :width = "flowListWidth" @confirm = "confirmChooose">
      <template slot = "searchTable" slot-scope="search">
        <el-card >
          <div class="list-scroll">
            <el-table
              v-loading="loading"
              :data="tableData"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
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
                  <div>{{scope.row.orderTime | timeFilter}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class='table-page'>
            <el-pagination :current-page="page" :page-size="100" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
            </el-pagination>
          </div>
        </el-card>
      </template>
    </common-dialog>
  </div>
</template>
<script>
import commonDialog from '../../../../customer/customer-list/components/dialog/commonDialog'
import formSettings from './formSettings.js'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import websiteSelect from '@/components/website-select'
export default {
  name: 'get-invoice',
  components: {
    commonDialog,
    websiteSelect
  },
  mixins: [searchHistoryMixin, paginationMixin],
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    formSettings[1].items[0].rule = [{
      validator: this.invoiceOrder,
      required: true,
      trigger: 'change',
    }]
    formSettings[1].items[1].rule = [{
      validator: this.invoiceMoney,
      required: true,
    }]
    formSettings[1].items[6].rule = [{
      validator: this.emailCheck,
      required: true,
      trigger: 'blur',
    }]
    return {
      formSettings: formSettings,
      flowListVisible: false,
      flowListTitle: '选择流水号',
      flowListWidth: '50%',
      loading: false,
      tableData: [],
      page: 1,
      selectCompany: [],
      multipleSelection: [],
      copyMultipleSelection: [],
      sum: 0
      // formData: null
    }
  },
  mounted () {
  },
  watch: {
    handelType (val) {
      console.log(val)
      if (val === 'add') {
        this.formData = null
      } else {
        this.formData = {
          parkingName: '测试'
        }
      }
    },
    visible (val) {
      if (val) {
        this.formSettings[1].items.find(item => item.name == 'taxNumber').hidden = false
      }
    }
  },
  methods: {
    typeChange (val) {
      if (val == 'company') {
        this.formSettings[1].items.find(item => item.name == 'taxNumber').hidden = false
      } else {
        this.formSettings[1].items.find(item => item.name == 'taxNumber').hidden = true
      }
      this.$refs.form.updateRule()
    },
    emailCheck (rule, value, callback) {
      let res = (/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value))
      if (value) {
        if (res) {
          callback()
        } else {
          callback(new Error('请输入正确邮箱'))
        }
      } else {
        callback(new Error('请输入邮箱'))
      }
    },
    invoiceOrder (rule, value, callback) {
      if (this.multipleSelection.length) {
        callback()
      } else {
        callback(new Error('请选择开票充值单'))
      }
    },
    invoiceMoney (rule, value, callback) {
      if (this.$refs.form.formModel.inputInvoiceMoney) {
        // this.$refs.form.formModel.inputInvoiceMoney = this.$refs.form.formModel.inputInvoiceMoney + ''
        // console.log(this.$refs.form.formModel.inputInvoiceMoney)
        // console.log(this.sum)
        if (this.$refs.form.formModel.inputInvoiceMoney <= 0) {
          callback(new Error('开票金额大于0'))
        } else if (this.$refs.form.formModel.inputInvoiceMoney > this.sum) {
          callback(new Error('开票金额不能大于已选订单金额'))
        } else if (this.$refs.form.formModel.inputInvoiceMoney == 'undefined') {
          callback(new Error('请输入开票金额'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入开票金额'))
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length) {
        this.copyMultipleSelection = this.multipleSelection.map((ele) => {
          return ele
        })
      } else {
        this.copyMultipleSelection = []
      }
    },
    confirmChooose () {
      this.sum = 0
      this.multipleSelection.forEach((ele) => {
        this.sum += ele.invoiceMoney
      })
      this.$nextTick(() => {
        this.$refs.form.formModel.inputInvoiceMoney = this.sum
      })
      this.flowListVisible = false
      this.$store.commit('chooseFlow', this.multipleSelection)
    },
    companyChange (val) {
      this.selectCompany = this.$refs.remoteCompany.newListData.filter((ele) => {
        return ele.value == val
      })
      this.$store.commit('chooseFlow', null)
      this.$refs.form.formModel.inputInvoiceMoney = undefined
    },
    loadTableData () {
      let params = {}
      if (!(this.selectCompany[0])) {
        this.$message.warning('请选择企业名称')
        return
      } else {
        params = {
          uid: this.selectCompany[0].value,
          orderType: 'company'
        }
      }
      this.flowListVisible = true
      this.loading = true
      let chooseIndex = []
      this.$service.manageEnbleInvoice(params, this.page, 100).then(res => {
        chooseIndex = []
        this.tableData = res.data.data.records
        if (this.$store.getters.invoiceFlowList) {
          this.tableData.forEach((ele, index) => {
            this.$store.getters.invoiceFlowList.forEach((son) => {
              if (ele.id == son.id) {
                chooseIndex.push(index)
              }
            })
          })
        }
        this.loading = false
        this.$nextTick(() => {
          if (chooseIndex.length) {
            chooseIndex.forEach((ele) => {
              this.$refs.multipleTable.toggleRowSelection(this.tableData[ele])
            })
          }
        })
        this._changePageTotal(res.data.data.totalElements)
      })
    },
    handleBeforeClose() {
      this.$store.commit('chooseFlow', null)
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    },
    save () {
      // this.$refs.form.formModel.inputInvoiceMoney = this.$refs.form.formModel.inputInvoiceMoney + ''
      this.$refs.form.formModel.content = '充电服务费'
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        data.uid = this.selectCompany[0].value
        data.orderIds = this.multipleSelection.map((ele) => {
          return ele.id
        }).join(',')
        data.money = this.sum
        data.orderType = 'company'
        data.type = 'electronic'
        delete data.companyName
        delete data.companymoney
        if (data.titleType == 'personal') {
          delete data.taxNumber
        }
        this.$service.manageGetInvoice(data).then((res) => {
          this.$emit('update:visible', false)
          this.$emit('closePage')
          this.$message.success('开票成功')
        })
      }).catch(err => {
        console.log('====err====', err)
      })
    }
  }
}
</script>

<style lang="scss">
.add-invoice {
  .company-info {
    display: flex;
    .search {
      margin-left:20px;
    }
  }
  .invoice-mount {
    .money {
      margin-left:5px;
      color: #F56C6C;
    }
  }
  .el-form {
    .form-section {
      .el-input-number {
        input {
          text-align: left;
        }
      }
    }
  }
  .el-card {
    .el-card__body {
      .list-scroll {
        max-height: 550px;
        overflow-y: scroll;
      }
    }
  }
}
</style>
