<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="编号" min-width="120px">
            <template slot-scope="scope">
              <span v-if="!scope.row.id">未知</span>
              <el-button type="text" v-else @click="showDetail(scope.row.id)">{{scope.row.id}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="operatorEquipmentId" label="充电桩信息" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="power" label="充电度数" min-width="120px"></el-table-column>
          <el-table-column prop="operatorName" label="运营商" min-width="120px"></el-table-column>
          <el-table-column prop="cityName" label="城市" min-width="120px"></el-table-column>
          <el-table-column prop="stationName" label="站点信息" min-width="120px"></el-table-column>
          <el-table-column label="时间信息" min-width="200px">
            <template slot-scope="scope">
              <div>
                <div>开始：{{scope.row.startTime | timeFilter}}</div>
                <div>结束：{{scope.row.endTime | timeFilter}}</div>
              </div>
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
    showDetail (id) {
      this.$emit('showDetail', id)
    }
  }
}
</script>
<style lang="scss">
</style>
