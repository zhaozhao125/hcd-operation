<template>
  <el-dialog title="订单计费" :visible.sync="visible" :before-close="handleBeforeClose" width="500px" class="current_free">
    <div class="ta-r mt-30">
      <el-button type="primary" size='small' @click="getCurrentFree">刷新</el-button>
    </div>
    <div class="content-table">
      <v-detail :detailSettings="formDetailSettings" :detailData="detailData">
         <template slot-scope="slot" slot = "price">
           <span>电费{{detailData.prices ? detailData.prices[0].elecPrice : '0'}}元/度,</span>
           <span>服务费{{detailData.prices ? detailData.prices[0].servicePrice : '0'}}元/度</span>
        </template>
         <template slot-scope="slot" slot = "connectorId">
          <span>{{detailData.connectorId}}</span>
          <span v-if = detailData.online style = "color:#3498db">在线</span>
          <span v-else style = "color: #F56C6C">离线</span>
        </template>
        <template slot-scope="slot" slot = "endTime">
           {{detailData.endTime | timeFilter}}
        </template>

        <template slot-scope="slot" slot = "totalMoney">
          <span style = "color: #F56C6C">{{detailData.totalMoney}}</span>
        </template>
      </v-detail>
    </div>
  </el-dialog>
</template>
<script>
import { formDetailSettings } from './detailSettings.js'
import vDetail from '@/components/detail/vDetail'
export default {
  components: {
    vDetail
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    orderSn: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      formDetailSettings: formDetailSettings,
      detailData: {}
    }
  },
  watch: {
    visible(k) {
      if (k && this.orderSn) {
        this.getCurrentFree()
      }
    }
  },
  methods: {
    handleBeforeClose() {
      this.$emit('update:visible', false)
    },
    getCurrentFree() {
      this.$service.chargeStatus(this.orderSn).then(res => {
        this.detailData = res.data.data
        if (this.detailData.voltageA) {
          this.detailData.voltageA = this.detailData.voltageA + 'V'
        }
        if (this.detailData.currentA) {
          this.detailData.currentA = this.detailData.currentA + 'A'
        }
        if (this.detailData.power) {
          this.detailData.power = this.detailData.power + 'W'
        }
        if (this.detailData.elecMoney) {
          this.detailData.elecMoney = this.detailData.elecMoney + '元'
        }
        if (this.detailData.totalMoney) {
          this.detailData.totalMoney = this.detailData.totalMoney + '元'
        }
        if (this.detailData.totalPower) {
          this.detailData.totalPower = this.detailData.totalPower + '度'
        }
        // if (this.detailData.elecMoney) {
        //   this.detailData.elecMoney = this.detailData.elecMoney + '元'
        // }
        if (this.detailData.serviceMoney) {
          this.detailData.serviceMoney = this.detailData.serviceMoney + '元'
        }
        if (this.detailData.parkingPrice) {
          this.detailData.parkingPrice = this.detailData.parkingPrice + '元'
        }
      })
    }
  }
}
</script>
<style lang = "scss">
.current_free {
  .ta-r {
    text-align: right;
  }
  .mt-30 {
    margin-top: -30px;
  }
}
</style>
