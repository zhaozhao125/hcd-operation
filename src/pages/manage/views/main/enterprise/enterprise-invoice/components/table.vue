<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="流水号" min-width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="!scope.row.sn">未知</span>
              <el-button type="text" v-else @click="showDetail(scope.row.sn)">{{scope.row.sn}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" min-width="200px"  prop="userName" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="money" label="开票金额" min-width="120px"></el-table-column>
          <el-table-column prop="userMoney" label="时间信息" min-width="220px">
             <template slot-scope="scope">
               <div>开票时间：{{scope.row.handleTime | timeFilter}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="operatorCn" label="处理人" min-width="200px" show-overflow-tooltip>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
import popSwitch from '@/components/pop-switch'
export default {
  name: 'order-table',
  components: {
    popSwitch
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
    showDetail (row) {
      this.$emit('showDetail', row)
    }
  }
}
</script>
<style lang="scss">
</style>
