<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="流水号" min-width="200px" prop="accountRecordSn" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              <span v-if="!scope.row.userId">未知</span>
              <el-button type="text" v-else @click="showDetail(scope.row.userId)">{{scope.row.userId}}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column prop="actionCodeText" label="科目" min-width="120px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="amount" label="金额" min-width="120px"></el-table-column>
          <el-table-column prop="userMoney" label="发生前余额" min-width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>充值余额：{{scope.row.userMoneyBefore}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userMoney" label="发生后余额" min-width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>充值余额：{{scope.row.userMoney}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userPhone" label="用户手机号" min-width="120px"></el-table-column>
          <el-table-column prop="paymentTypeText" label="支付方式" min-width="120px"></el-table-column>
          <el-table-column prop="paymentTypeText" label="凭证" min-width="200px" show-overflow-tooltip>
             <template slot-scope="scope">
               <span v-html="scope.row.evidenceNote"></span>
            </template>
          </el-table-column>
          <el-table-column   prop="createdOn" label="发生时间" min-width="180px">
            <!-- <template slot-scope="scope">
              <el-button type="text"  >编辑</el-button>
            </template> -->
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
