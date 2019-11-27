<template>
  <div id="station-details">
    <v-page :visible.sync="visibleShow" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>活动详情</h3>
      </div>
      <div class="detail-content" slot="content">
        <detail-basic :detailSettings='detailSettings' :detailData="detailData">
          <template slot-scope="scope" slot="rules"><br />
            <el-table :data="scope.model.rules" style="width: 660px;">
              <el-table-column prop="stepAmount" label="充值满（元）" width="180px;">
              </el-table-column>
              <el-table-column prop="content" label="显示文案" width="180px;">
              </el-table-column>
              <el-table-column prop="coupons" label="优惠券包" width="300px;">
                <template slot-scope="props">
                  <el-row v-for="itemCoupons in props.row.coupons" style="width: 100%;">
                    <el-col :span="18">{{itemCoupons.couponName}}</el-col>
                    <el-col :span="6">{{itemCoupons.couponCount}}张</el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </detail-basic>
      </div>
    </v-page>
  </div>
</template>
<script>
import { detailSettings } from './detailRechargingSettings.js'
import detailBasic from '@/components/detail/vDetail'
export default {
  name: 'detial-recharging',
  components: {
    detailBasic,
  },
  props: {
    visibleShow: {
      type: Boolean
    },
    detailData: {
      type: Object
    }
  },
  data() {
    return {
      detailSettings: detailSettings,
    }
  },
  methods: {
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    }
  }
}

</script>
<style lang="scss">
#station-details {
  .charge_fee_list {
    // margin-left:0 !important;
    // margin-right:0 !important;
    margin-left: 60px !important;

    .el-col {
      padding-left: 0px !important;
    }
  }

  .geo-info {
    img {
      width: 30px;
    }
  }
}

.v-detail .detail-block {
  border-bottom: 0px
}

</style>
