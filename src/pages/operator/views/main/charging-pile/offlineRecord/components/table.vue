<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="桩编号" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="!scope.row.operatorEquipmentId">未知</span>
              <el-button type="text" v-else >{{scope.row.operatorEquipmentId}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="类别" min-width="120px">
            <template slot-scope="scope">
              <span>{{checkDataStatusText[scope.row.connectors[0].status]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operatorName" label="运营商" min-width="120px"></el-table-column>
          <el-table-column prop="stationName" label="设备商" min-width="200px" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="createdOn" label="操作时间" min-width="200px">
            <template slot-scope="scope">
              <div>
                {{scope.row.createdOn | timeFilter}}
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
      checkDataStatusText: {
        'OFFLINE': '离线',
        'IDLE': '空闲',
        'USED_UNCHARGE': '占用未充电',
        'USED_CHARGING': '充电中',
        'PARKING': '待拔枪',
        'USED_RESERVED': '预约锁定',
        'ERROR': '故障'
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>
