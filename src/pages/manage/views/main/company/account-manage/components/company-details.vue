<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>运营商详情</h3>
      </div>
      <div  class="detail-content" slot="content" v-if = "detailData">
        <v-detail :data = "detailData" :detailSettings = "detailSettings" :labelWidth = 180>
          <template slot="enabled">
            {{detailData.enabled ? '是' : '否'}}
          </template>
          <template slot="createdOn">
            {{detailData.createdOn | timeFilter}}
          </template>
           <template slot="modifiedOn">
            {{detailData.modifiedOn | timeFilter}}
          </template>
        </v-detail>
      </div>
    </v-page>
  </div>
</template>
<script>
import vDetail from '@/components/detail/v-detail'
import detailSettings  from './detailSettings'
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
        this.$service.companyInfor({id: this.id}).then(res => {
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
