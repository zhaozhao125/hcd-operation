<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="流水号" min-width="120px" prop="recordSn" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="actionCodeText" label="科目" min-width="120px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="amount" label="金额" min-width="120px">
          </el-table-column>
          <el-table-column prop="operatorMoneyBefore" label="发生前余额" min-width="120px"></el-table-column>
          <el-table-column prop="operatorMoney" label="发生后余额" min-width="120px"></el-table-column>
          <el-table-column prop="evidenceNote" label="凭证" min-width="180px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createdOn" label="发生时间" min-width="180px">
            <template slot-scope="scope">
              <div>
                <div>{{scope.row.addTime | timeFilter}}</div>
              </div>
            </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'bill-table',
  components: {
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
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>
