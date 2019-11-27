<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
      <el-table-column label="订单编号" min-width="250px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="!scope.row.sn">未知</span>
          <el-button type="text" v-else @click="handleDetails(scope.row)">{{scope.row.sn}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" min-width="100px">
        <template slot-scope="scope">
          <span v-if="!scope.row.orderStatus">未知</span>
          <span v-else :class="getStateStyle(scope.row.orderStatusCode)">{{scope.row.orderStatus}}</span>
        </template>
      </el-table-column>
       <el-table-column label="订单类型" min-width="100px" prop='orderType'>
      </el-table-column>
      <el-table-column prop="operatorEquipmentId" label="充电桩编号" min-width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="operatorName" label="运营商" min-width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cityName" label="城市" min-width="100px"></el-table-column>
      <el-table-column prop="stationName" label="站点名称" min-width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="userMoney" label="时间信息" min-width="240px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>开始时间：{{scope.row.startTime | timeFilter}}</span><br/>
          <span>结束时间：{{scope.row.endTime | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userMoney" label="订单资金" min-width="200px">
        <template slot-scope="scope">
          <span>订单金额：{{scope.row.totalMoney}}</span><br/>
          <span>应付金额：{{scope.row.needPay}}</span><br/>
          <span>实付金额：{{scope.row.actualPay}}</span><br/>
          <el-button v-if="scope.row.orderStatusCode === 'CHARGING'" type="text" @click="handleCurrentFree(scope.row)">查看实时计费</el-button>
        </template>
      </el-table-column>
    </el-table>
    <current-free ref="free" :visible.sync="currentFreeVisible" :orderSn="orderSn"></current-free>
  </div>
</template>

<script>
import currentFree from './currentFree'
export default {
  name: 'order-table',
  components: {
    currentFree
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      orderSn: null,
      currentFreeVisible: false
    }
  },
  methods: {
    getStateStyle(state) {
      switch (state) {
        case 'CHARGING':
          return 'state-green'
        case 'COMPLETED':
          return 'state-blue'
        case 'UN_PAY':
          return 'state-purple'
      }
    },
    handleDetails(row) {
      this.$emit('showDetails', row.sn)
    },
    handleCurrentFree(row) {
      this.currentFreeVisible = true
      this.orderSn = { orderSn: row.sn }
    }
  }
}
</script>
<style lang="scss">
</style>
