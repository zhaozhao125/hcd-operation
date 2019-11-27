<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="充电桩编号" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="!scope.row.operatorEquipmentId">未知</span>
              <el-button type="text" v-else @click="showDetail(scope.row.id)">{{scope.row.operatorEquipmentId}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="接口状态" min-width="120px">
            <!-- <template slot-scope="scope">
              <span :class="getCheckDataStatus(scope.row.connectors[0].status)">{{checkDataStatusText[scope.row.connectors[0].status]}}</span>
            </template> -->
            <template slot-scope="scope">
              <div v-for="(ele,index) in scope.row.connectors" :key="index" :class="getCheckDataStatus(ele.status)">
                <span >{{ele.connectorName}}</span> &nbsp;&nbsp;
                <span> {{checkDataStatusText[ele.status]}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="operatorName" label="运营商" min-width="120px"></el-table-column>
          <el-table-column prop="cityName" label="城市" min-width="120px"></el-table-column>
          <el-table-column prop="stationName" label="所属站点" min-width="200px" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="createdOn" label="创建时间" min-width="200px">
            <template slot-scope="scope">
              <div>
                {{scope.row.createdOn | timeFilter}}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="160">
            <template slot-scope="scope">
              <!-- <el-button type="text"  @click = "jumpChargeRecord(scope.row)">查看充电记录</el-button> -->
              <el-button type="text"  @click = "$emit('on-edit', scope.row)" v-if = "scope.row.equipmentSource === '平台录入'">编辑</el-button>
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
    showDetail (id) {
      this.$emit('showDetail', id)
    },
    getCheckDataStatus(state) {
      switch (state) {
        case 'OFFLINE':
          return 'state-gray'
        case 'IDLE':
          return 'state-green'
        case 'USED_UNCHARGE':
          return 'state-yellow'
        case 'PARKING':
          return 'state-yellow'
        case 'USED_CHARGING':
          return 'state-blue'
        case 'ERROR':
          return 'state-red'
      }
    },
    jumpChargeRecord (data) {
      this.$store.commit('sendToTab', {
        name: 'chargingOrder',
        params: {
          // stationId: data.id,
          // stationName: data.stationName
          operatorEquipmentId: data.operatorEquipmentId
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
