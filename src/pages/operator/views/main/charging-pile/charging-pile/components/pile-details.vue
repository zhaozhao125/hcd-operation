<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>充电桩详情</h3>
      </div>
      <div  class="detail-content" slot="content" v-if = "detailData">
        <v-detail :data = "detailData" :detailSettings = "detailSettings">
          
          <template slot-scope="slot" slot = "equipmentType">
             {{detailData.equipmentType === 'DC' ? '快充' : '慢充'}}
          </template>
          <template slot-scope="slot" slot = "createdOn">
            {{detailData.createdOn | timeFilter}}
          </template>
          <template slot-scope="slot" slot = "operatorEquipmentId">
             {{detailData.connectorId}}
          </template>
          <template slot-scope="slot" slot = "status">
            {{detailData.connectorStatus}}
          </template>
          <template slot-scope="slot" slot = "createdBy">
            {{ detailData.createdBy}}
          </template>
          <template slot-scope="slot" slot = "connectorList">
             <div v-for="(ele,index) in detailData.connectorList" :key="index">
               <span>{{ele.connectorId}}</span> &nbsp;&nbsp;
               <span>{{checkDataStatusText[ele.status]}}</span>
             </div>
          </template>
        </v-detail>
      </div>
    </v-page>
  </div>
</template>
<script>
import vDetail from '@/components/detail/v-detail'
import detailSettings from './detailSettings'
export default {
  name: 'v-details',
  components: {
    vDetail
  },
  props: {
    id: {
      type: [Number, String]
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      detailData: null,
      detailSettings: detailSettings,
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
  watch: {
    visible(val) {
      if (val && this.id) {
        this.getDetails()
      }
    }
  },
  methods: {
    getDetails() {
      if (this.id) {
        this.$service.pileInfor({id: this.id}).then((res) => {
          this.detailData = res.data.data
        })
        // this.$service.getCustomerDetail({id: this.id}).then(res => {
        //   this.detailData = res.data.data
        // })
      }
    },
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    }
  }
}
</script>

<style lang="scss">

</style>
