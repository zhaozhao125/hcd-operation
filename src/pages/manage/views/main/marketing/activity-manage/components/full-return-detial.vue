<template>
  <div id="station-details">
    <v-page :visible.sync="visibleShow" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>活动详情</h3>
      </div>
      <div class="detail-content" slot="content">
        <detail-basic :detailSettings='detailSettings' :detailData="detailData" :data="detailData">
          <template slot="activityType"> 满返 </template>
          <template slot="coupons" slot-scope="scope"><br>
            <el-table :data="scope.model.coupons" style="width: 60%">
              <el-table-column prop="couponName" label="优惠券"></el-table-column>
              <el-table-column prop="couponCount" label="数量"></el-table-column>
            </el-table>
          </template>
        </detail-basic>
      </div>
    </v-page>
  </div>
</template>
<script>
import { detailSettings } from './rechargingDetailSettings.js'
import detailBasic from '@/components/detail/vDetail'
export default {
  name: 'full-return-detial',
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

.v-detail .detail-block { border-bottom: 0px }


</style>
