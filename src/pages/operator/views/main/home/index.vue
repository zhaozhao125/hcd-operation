<template>
  <div class="operator-home">
    <div class = "dashboard-title">
       <h2>{{accountInfor.name}}</h2>
       <el-button type="text" size = "medium" class="account-infor-btn" @click = "lookAccount">账户信息</el-button>
    </div>
    <!-- <h4>企业动态</h4> -->
    <el-card class="box-card operator-card">
      <el-row :gutter="40" class = "operator-account">
      <el-col :span="12" class = "ta-c">
         <h5>账户余额</h5>
         <div class = "mt-30 money-color">{{operatorMoney}} <span v-if = "operatorMoney">元</span></div>
      </el-col>
      <el-col :span="12"  class = "ta-c">
         <div>
            <el-button  size = "small" type = "primary" class = "cash" @click = "withdraw">提现</el-button>
         </div>
         <div class = "mt-20">
           <el-button  size = "small" type = "text" @click = "balanceFlow">余额流水明细</el-button>
         </div>
      </el-col>
    </el-row>
    </el-card>
    <withdraw-deposit :visible.sync = "withdrawVisible" :information = "accountInfor"  @updateInfor = "moneyInformation" :operatorMoney = "operatorMoney" :operatorSn = "operatorSn"></withdraw-deposit>
    <account-infor  :visible.sync="accountVisible" :information = "accountInfor" @updateInfor = "getInformation" ></account-infor>
  </div>
</template>

<script>
import withdrawDeposit from './components/withdrawDeposit'
import accountInfor from './components/accountInfor'
export default {
  components: {
    withdrawDeposit,
    accountInfor
  },
  data () {
    return {
      withdrawVisible: false,
      accountVisible: false,
      accountMoney: '',
      accountInfor: {},
      operatorMoney: null,
      operatorSn: ''
    }
  },
  mounted () {
    this.getInformation()
    this.moneyInformation()
  },
  methods: {
    moneyInformation () {
      this.$service.moneyInformation({}).then((res) => {
        this.operatorMoney = res.data.data.operatorMoney
        this.operatorSn = res.data.data.operatorSn
      })
    },
    getInformation () {
      this.$service.operatorInfor({ id: this.$store.state.user.user.operatorSequenceId }).then((res) => {
        this.accountInfor = res.data.data
      })
    },
    balanceFlow () {
      this.$store.commit('sendToTab', {
        name: 'bill'
      })
    },
    lookAccount () {
      this.accountVisible = true
    },
    withdraw () {
      if (this.accountInfor.bankAccountName && this.accountInfor.bankAccountNumber && this.accountInfor.bankName) {
        this.withdrawVisible = true
      } else {
        this.$confirm('请先补充账户信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.accountVisible = true
        }).catch(() => {
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.operator-home {
  padding: 32px;
  // background-color: rgb(240, 242, 245);
  .dashboard-title {
    display: flex;
    align-items: center;
    margin-top:50px;
    margin-left:50px;
    // padding: 50px 0 32px;
  }
  .account-infor-btn {
    &.el-button--medium {
      font-size: 16px;
      margin-left:10px;
      padding-top:15px;
    }
  }
  .operator-account {
    margin-top:15px;
    // margin-bottom:30px;
  }
  .operator-card {
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width:444px;
    margin-top:100px;
    margin-left:50px;
    .el-card__body {
      padding:0 !important;
    }
    .cash {
      width:100px;
    }
  }
  .money-color {
    color: #F56C6C;
  }
}
</style>
