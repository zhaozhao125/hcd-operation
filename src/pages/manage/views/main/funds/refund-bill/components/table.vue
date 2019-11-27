<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="收款单号" min-width="250px" prop ='sn' show-overflow-tooltip >
            <!-- <template slot-scope="scope">
              <span v-if="!scope.row.userId">未知</span>
              <el-button type="text" v-else @click="showDetail(scope.row.userId)">{{scope.row.userId}}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column label="金额" min-width="120px" prop = "amount">
          </el-table-column>
          <el-table-column prop="payerUserPhone" label="用户手机号" min-width="120px"></el-table-column>
          <el-table-column prop="paymentMethod" label="支付方式" min-width="120px"></el-table-column>
          <el-table-column prop="cityName" label="发生时间" min-width="180px">
            <template slot-scope="scope">
               {{scope.row.createDate | timeFilter}}
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  name: 'order-table',
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
    }
  },
  methods: {
    showDetail (row) {
      this.$emit('showDetail', row)
    }
  }
}
</script>
<style lang="scss">
</style>
