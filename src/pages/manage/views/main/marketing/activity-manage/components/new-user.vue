<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>{{formData?'编辑活动':'添加活动'}}</h3>
      </div>
      <div class="detail-content" slot="content">
        <v-form :formSettings="formSettings" ref="vform" :formData="formData" @save='addNewUser' :showButton="showButton" @registeCodeChange="registeCodeChange">
          <template slot-scope="scope" slot="priceCfg">
            <el-button type="text" @click="addCouponsRow">添加优惠券</el-button>
            <el-row v-if="couponRows.length >= 1">
              <el-row>
                <el-col :span="8">优惠券</el-col>
                <el-col :span="8">数量</el-col>
                <el-col :span="8">操作</el-col>
              </el-row>
              <el-row v-for="(item ,itemIdx) in couponRows" :key="itemIdx">
                <el-row>
                  <el-col :span="8">{{item.couponName}}</el-col>
                  <el-col :span="8">{{item.couponCount}}</el-col>
                  <el-col :span="8">
                    <el-button type="text" @click="delCouponsRow(itemIdx)">删除</el-button>
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
          </template>
          <!-- 订单满 -->
          <template slot="orderPrice" slot-scope="scope">
            <el-input style="width: 160px" v-model="scope.model.orderPrice">
              <template slot="append">元</template>
            </el-input>
          </template>
          <template slot="rewardWay" slot-scope="scope">
            <el-row>新用户注册</el-row>
          </template>
        </v-form>
      </div>
    </v-page>
    <!-- 对应的优惠券添加 -->
    <el-dialog :visible.sync='addCoupons' v-if="addCoupons" width='35%'>
      <div class="v-form">
        <v-form :formSettings="addCoupoonsformSettings" @save="couponsSave" @cancel="addCoupons = false">
          <template slot="couponName" slot-scope="scope">
            <div class="select-content">
              <website-select ref="website" v-model="scope.model.couponName" placeholder="请输入优惠券"></website-select>
            </div>
          </template>
          <template slot="couponCount" slot-scope="scope">
            <el-input v-model="scope.model.couponCount">
              <template slot="append">张</template>
            </el-input>
          </template>
        </v-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import layoutDetail from '@/components/detail/layout-detail'
import { detailSettings } from './detailSettings'
import vForm from '@/components/form/vForm'
import addCoupoonsformSettings from './add-coupons/formSetting.js'
import websiteSelect from './add-coupons/coupons-list-select.vue'
export default {
  name: 'new-user',
  components: {
    layoutDetail,
    websiteSelect,
    vForm
  },
  props: {
    formData: {
      type: Object
    },
    visible: {
      type: Boolean
    },
    showButton: {
      type: Boolean
    }
  },
  data() {
    return {
      couponRows: [],
      itemsIdx: 0,
      addCoupoonsformSettings: addCoupoonsformSettings,
      addCoupons: false,
      detailData: null,
      detailSettings: detailSettings,
      items: [{
        cloumn1: 100,
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
      }, {
        cloumn1: 200,
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
      }, {
        cloumn1: 300,
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
      }, {
        cloumn1: 500,
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
      }, {
        cloumn1: 1000,
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
      }],
      formSettings: [{
        label: '',
        items: [{
          label: '活动名称',
          name: 'name',
          type: 'text',
          placeholder: '',
          required: true
        }, {
          label: '活动时间',
          name: 'activityTime',
          type: 'daterange',
          required: true,
          defaultTime: ['00:00:00', '23:59:59']
        }, {
          label: '活动类型',
          type: 'slot',
          name: 'rewardWay',
          value: '新用户注册',
        }, {
          label: '是否设置邀请码',
          type: 'radio',
          name: 'useInvitationCode',
          value: true,
          options: [{
            label: '是',
            value: true
          }, {
            label: '否',
            value: false
          }],
          events: {
            change: 'registeCodeChange'
          }
        }, {
          label: '邀请码',
          type: 'text',
          placeholder: '请输入不少于6位的字母或数字',
          name: 'invitationCode',
          value: '',
          disabled: false
        }, {
          label: '优惠券包',
          type: 'slot',
          name: 'priceCfg',
          value: [],
          required: true
        }, {
          label: '备注',
          name: 'remark',
          type: 'textarea'
        }]
      }],
    }
  },
  mounted() {
    this.initShowData()
  },
  methods: {
    initShowData(idActivity = 0) {
      console.info('新用户注册')
      console.dir(this.formData)
      console.info('-----')
      if (idActivity) {
        this.$service.detialFullReturn({ id: idActivity }).then(res => {
          if (res.data.code == 0) {
            this.formData = this.$service.detialFullReturnFormate(res.data.data)
            this.formData.activityTime = [this.formData.startTime, this.formData.endTime]
            this.couponRows = this.formData.coupons
            this.formData.priceCfg = this.formData.coupons
          }
        })
      } else {
        if (this.formData) {
          this.couponRows = this.formData.coupons
          if (!this.formData.useInvitationCode) {
            // 设置成disableed
            this.formSettings[0].items[4].disabled = true
            let tmp = this.formSettings
            this.$set(this, 'formSettings', tmp)
          }
        }
      }
    },
    registeCodeChange(newValue) {
      // false 不显示邀请码
      if (!newValue) {
        this.formSettings[0].items[4].disabled = true
      } else {
        this.formSettings[0].items[4].disabled = false
      }
    },
    delCouponsRow(itemIdx) {
      console.dir(itemIdx)
      this.couponRows.splice(itemIdx, 1)
      this.$refs.vform.formModel.priceCfg = this.couponRows
    },
    couponsSave(row) {
      let tmp = []
      tmp = row.couponName.split('|')
      console.dir(tmp)
      let amount = parseInt(tmp[2])
      let userGainTimes = parseInt(tmp[3])
      if (!parseInt(row.couponCount)) {
        this.$message.error('输入大于0的整数')
        return false
      }
      if (row.couponCount <= 0) {
        this.$message.error('输入大于0的整数')
        return false
      }
      if (amount && amount <= row.couponCount) {
        this.$message.error('必须小于发行量')
        return false
      }
      if (userGainTimes && userGainTimes < row.couponCount) {
        this.$message.error('必须小等于限领张数')
        return false
      }
      row = {
        'couponId': tmp[1],
        'couponCode': tmp[4],
        'couponName': tmp[0],
        'couponCount': row.couponCount
      }
      this.couponRows.push(row)
      this.$refs.vform.formModel.priceCfg = this.couponRows
      this.addCoupons = false
    },
    handleSelect(item) {
      console.dir(item)
    },
    querySearchAsync(keyword, cb) {
      console.dir(keyword)
      // cb({ name: '员工7月优惠券', couponsid: 11 })
    },
    saveAddCoupons() {
      console.dir('saveAddCoupons 保存 优惠券设置项')
      let rowCoupons = this.$refs.form.formModel
      console.dir(this.items[this.itemsIdx])
      console.dir(rowCoupons)
      this.items[this.itemsIdx].cloumn2.push(rowCoupons.couponsid)
      this.items[this.itemsIdx].cloumn3.push(rowCoupons.couponsnumber)
      this.addCoupons = false
      this.$refs.form.resetFields()
    },
    addCouponsRow(idx) {
      console.dir('活动配置添加优惠券')
      this.addCoupons = true
      this.itemsIdx = idx
    },
    addPriceRow() {
      // 添加阶梯价格
      let priceRow = {
        cloumn1: '',
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
      }
      console.dir(priceRow)
      this.items.push(priceRow)
      console.dir(this.items)
    },
    delPriceRow(idx) {
      if (this.items.length == 1) {
        this.$message.error('配券不能为空')
        return false
      }
      // 删除
      this.items.splice(idx, 1)
    },
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    },
    addNewUser(row) {
      // 满返活动添加
      if (row.activityTime) {
        row.startTime = this.$service.changeDateToString(new Date(row.activityTime[0]))
        row.endTime = this.$service.changeDateToString(new Date(row.activityTime[1]))
      }
      // 优惠券
      row.newUserCoupons = row.priceCfg
      row.id = ''
      row.activityType = 'new_user'
      // 邀请码的限制
      if (row.useInvitationCode && row.invitationCode.length < 6) {
        this.$message.error('邀请码设置不小于6位')
        return false
      }
      if (!row.useInvitationCode) {
        row.invitationCode = ''
      }
      if (this.formData) {
        row.id = this.formData.id
        this.$service.activityEdit(row).then(res => {
          if (res.data.code == 0) {
            this.$message.success('编辑成功')
            this.$emit('saveAndReload')
          }
        })
      } else {
        row.activityType = 'new_user'
        this.$service.addFullReturnRow(row).then(res => {
          if (res.data.code == 0) {
            this.$message.success('添加成功')
            this.$emit('saveAndReload')
          }
        })
      }
    }
  }
}

</script>
<style lang="scss">
</style>
