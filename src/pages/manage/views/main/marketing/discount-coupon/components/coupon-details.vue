<template>
  <div id="coppon-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>优惠券详情</h3>
      </div>
      <div  class="detail-content" slot="content" v-if = "detailData">
        <v-detail :data = "detailData" :detailSettings = "detailSettings" :labelWidth = 180>
          <template slot="type">
            <div v-if="detailData.type == 1">
              <div>金额</div>
              <div>{{detailData.money}}元
                <span v-if="detailData.useMoneyCondition != 0">（满{{detailData.useMoneyCondition}}元可用）</span>
              </div>
            </div>
           <div v-if="detailData.type == 2">
             <div>折扣</div>
             <div>{{detailData.discount/10}}折
               <span v-if="detailData.useMoneyTop != 0">（最高可抵{{detailData.useMoneyTop}}元）</span>
            </div>
           </div>
          </template>
          <template slot="amount">
            {{detailData.amount ? detailData.amount + '张' : '不限制'}}
          </template>
           <template slot="userGainTimes">
            {{detailData.userGainTimes ? detailData.userGainTimes + '张' : '不限制'}}
          </template>
           <template slot="publishTime">
            {{detailData.redeemStartTime}} 至 {{detailData.redeemEndTime}}
          </template>
           <template slot="city">
            {{detailData.city ? detailData.city : '不限制' }}
          </template>
           <template slot="useTime">
             <div v-if="detailData.relativeTime">
                {{detailData.relativeDayNum}}天
              </div>
              <div v-else>
                {{detailData.startDate}} 至 {{detailData.endDate}}
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
import { handleDate } from '@/utils/date-filter'
export default {
  name: 'v-details',
  components: {
    vDetail
  },
  props: {
    id: {
      type: Number
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      detailData: null,
      detailSettings: detailSettings
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) {
        this.getDetails()
        console.log(val)
      }
    }
  },
  methods: {
    getDetails() {
      if (this.id) {
        this.$service.couponDetail({ id: this.id }).then(res => {
          this.detailData = res.data.data
        })
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
  #coppon-details {
    .z-detail{
      .detail-section{
        .detail-item{
          align-items:flex-start;
        }
      }
    }
  }
</style>
