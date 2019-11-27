<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>用户详情</h3>
      </div>
      <div class="detail-content" slot="content" v-if="detailData">
        <layout-detail :detailData="detailData" :detailSettings="detailSettings">
          <template slot-scope="scope" slot="lastLoginTime">
            <span>{{detailData.lastLoginTime | timeFilter}}</span>
          </template>
          <template slot-scope="scope" slot="registerTime">
            <span>{{detailData.registerTime | timeFilter}}</span>
          </template>
          <template slot-scope="scope" slot="rechargeFirstTime">
            <span>{{detailData.rechargeFirstTime | timeFilter}}</span>
          </template>
          <template slot-scope="scope" slot="orderFirstTime">
            <span>{{detailData.orderFirstTime | timeFilter}}</span>
          </template>
          <template slot-scope="scope" slot="statusCode">
            <span>{{detailData.statusCode ? '启用' : '禁用'}}</span>
          </template>
          <template slot-scope="scope" slot="userName">
            <editInput :name="userName" :value="detailData.userName" :type="typeText" @updateVal="updateDetails" ref="editInput"></editInput>
          </template>
        </layout-detail>
      </div>
    </v-page>
  </div>
</template>
<script>
import editInput from '@/components/edit-input'
import layoutDetail from '@/components/detail/layout-detail'
import { detailSettings } from './detailSettings'
export default {
  name: 'v-details',
  components: {
    editInput,
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
      detailSettings: detailSettings,
      userName: 'userName',
      typeText: 'text'
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
        this.$service.employeesDetails({ userId: this.userId }).then(res => {
          this.detailData = res.data.data
        })
      }
    },
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    },
    updateDetails(name, updateVal) {
      let obj = {}
      obj[name] = updateVal
      obj.userId = this.userId
      this.$service.updateDetails(obj).then(res => {
        if (res.data.code === '0') {
          this.$message({ message: '操作成功', type: 'success' })
        }
        this.detailData[name] = updateVal
        this.$emit('update', this.userId)
      })
    },
  }
}
</script>

<style lang="scss">
</style>
