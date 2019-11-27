<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="站点编号" min-width="200"  show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDetail(scope.row)">{{scope.row.stationSn}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="站点名称" min-width="180">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.stationName" placement="top">
                <div slot="content" v-html="scope.row.stationName"></div>
                <p v-if="scope.row.stationName.length > 10" v-html="scope.row.stationName.substr(0,10)+'...'" ></p>
                <p v-else v-html="scope.row.stationName"></p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="operatorName" label="运营商" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column label="城市" prop="cityName" min-width="120"></el-table-column>
          <el-table-column prop="user_feedback_problem" label="充电桩" min-width="150">
            <template slot-scope="scope">
              <div>
                <div>快充：{{scope.row.fastPileNum}}</div>
                <div>慢充：{{scope.row.slowPileNum}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="地址" min-width="200">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.address" placement="top">
                <div slot="content" v-html="scope.row.address"></div>
                <p v-if="scope.row.address.length > 10" v-html="scope.row.address.substr(0,10)+'...'" ></p>
                <p v-else v-html="scope.row.address"></p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="createdOn" label="创建时间" min-width="180">
            <template slot-scope="scope">
              {{scope.row.createdOn | timeFilter}}
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="100">
            <template slot-scope="scope">
              <popSwitch v-model="scope.row.enabled"
                trueText="确定禁用充电站吗？"
                falseText="确定启用充电站吗？"
                 @confirm="submitChangeChargPileNetworkStatus(scope.row)"
                ></popSwitch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="170">
            <template slot-scope="scope">
              <el-button type="text"  @click = "jumpChargeRecord(scope.row)">查看充电记录</el-button>
              <el-button type="text"  @click = "edit(scope.row)" v-if = "scope.row.source === 'input'">编辑</el-button>
            </template>
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
    },
    edit (row) {
      this.$emit('editStation', row)
    },
    submitChangeChargPileNetworkStatus (row) {
      this.$service.closeBranch({ id: row.id, enabled: !row.enabled }).then((res) => {
        this.$message.success('修改成功')
        this.$emit('on-reload')
      })
    },
    jumpChargeRecord (data) {
      this.$store.commit('sendToTab', {
        name: 'chargingOrder',
        params: {
          stationId: data.id,
          stationName: data.stationName
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
