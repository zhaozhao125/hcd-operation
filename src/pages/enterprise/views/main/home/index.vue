<template>
  <div class="dashboard-container">
    <h2 class="dashboard-title">{{enterpriseInfo.name}}</h2>
    <!-- <h4>企业动态</h4> -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <h5 class="dashboard-title-item">资产速览</h5>
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <img src="~@/assets/img/fund.svg" class="card-panel-icon" style="width:48px">
          </div>
          <div class="card-panel-description" @click="handleTab('enterpriseFlow')">
            <div>
              <span class="card-panel-text">充值余额</span>
              <span class="card-panel-num num-pl" v-if='enterpriseInfo.companyMoneyDTO'>{{enterpriseInfo.companyMoneyDTO.companyMoney}}</span>元
            </div>
            <div>
              <span class="card-panel-text">赠送余额</span>
              <span class="card-panel-num num-pl" v-if='enterpriseInfo.companyMoneyDTO'>{{enterpriseInfo.companyMoneyDTO.companyMoneyPresentation}}</span>元
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <h5 class="dashboard-title-item">员工速览</h5>
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <img src="~@/assets/img/user.svg" class="card-panel-icon" style="width:48px">
          </div>
          <div class="card-panel-description" @click="handleTab('employees')">
            <div class="card-panel-text">员工总数</div>
            <div>
              <span class="card-panel-num">{{enterpriseInfo.staffsCount}}</span>人
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <h5 class="dashboard-title-item">订单速览</h5>
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <img src="~@/assets/img/order.svg" class="card-panel-icon" style="width:48px">
          </div>
          <div class="card-panel-description" @click="handleTab('order')">
            <div class="card-panel-text">企业订单</div>
            <div>
              <span class="card-panel-num">{{enterpriseInfo.orderCount}}</span>个
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      enterpriseInfo: {},
    }
  },
  mounted () {
    this.getEnterpriseInfo()
  },
  methods: {
    getEnterpriseInfo() {
      let params = {
        userId: this.$store.getters.user.userId
      }
      console.log(params)
      this.$service.getEnterpriseInfo(params).then(res => {
        if (res.data.code == '0') {
          this.enterpriseInfo = res.data.data
        }
      })
    },
    handleTab(type) {
      console.log(type)
      this.$store.commit('sendToTab', {
        name: type
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .dashboard-title {
    padding: 100px 0 32px;
  }
  .panel-group {
    margin-top: 18px;
    .dashboard-title-item {
      padding: 10px 0;
    }
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      // &:hover {
      //   .card-panel-icon-wrapper {
      //     color: #fff;
      //   }
      //   .icon-people {
      //     background: #40c9c6;
      //   }
      //   .icon-message {
      //     background: #36a3f7;
      //   }
      //   .icon-money {
      //     background: #f4516c;
      //   }
      // }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        cursor: pointer;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
        .num-pl {
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
