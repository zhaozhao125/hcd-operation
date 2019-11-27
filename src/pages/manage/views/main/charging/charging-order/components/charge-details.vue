<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>充电记录详情</h3>
      </div>
      <div  class="detail-content" slot="content" v-if = "detailData">
        <layout-detail :detailData = "detailData" :detailSettings = "detailSettings">
          <template slot-scope="scope" slot="startTime">
              <span>{{detailData.startTime | timeFilter}}</span>
          </template>
           <template slot-scope="scope" slot="endTime">
              <span>{{detailData.endTime | timeFilter}}</span>
          </template>
        </layout-detail>
      </div>
    </v-page>
  </div>
</template>
<script>
import layoutDetail from '@/components/detail/layout-detail'
import { detailSettings } from './detailSettings'
export default {
  name: 'v-details',
  components: {
    layoutDetail
  },
  props: {
    userId: {
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
      if (val && this.userId) {
        this.getDetails()
      }
    }
  },
  methods: {
    getDetails() {
      if (this.userId) {
        this.$service.charingInfor({id: this.userId}).then(res => {
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

</style>
