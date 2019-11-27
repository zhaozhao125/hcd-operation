<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>{{formData?'编辑活动':'添加活动'}}</h3>
      </div>
      <div class="detail-content" slot="content">
        <v-form :formSettings="formSettings" ref="vform" :formData="formData" :showButton="showButton" @save="saveActivity">
          <template slot-scope="scope" slot="priceCfg">
            <div><br />
              <el-row>
                <el-col :span="4"><span style="color:red">*</span>充值满（元）</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="4"><span style="color:red">*</span>显示文案</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="10"><span style="color:red">*</span>送优惠券包</el-col>
                <el-col :span="1"></el-col>
                <el-col :span="3" :center="true">操作</el-col>
              </el-row>
              <hr style="border:1px solid #ebeef5" />
              <!-- 循环的定义默认的配置项 -->
              <el-row v-for="(item, itemIdx) in items" :key="itemIdx">
                <el-row>
                  <el-col :span="4">
                    <el-input v-model="item.cloumn1" placeholder="请输入内容" @blur="blurValue(item.cloumn1)"></el-input>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="4">
                    <el-input v-model="item.cloum5" placeholder="显示文案" @blur="blurValue(item.cloum5)"></el-input>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="10">
                    <el-button type="text" @click="addCouponsRow(itemIdx, item.id)">添加优惠券</el-button>
                    <el-row v-if="item.cloumn2.length">
                      <el-row v-for="(rowCoupon, idRowCoupon) in item.cloumn2" :key="idRowCoupon">
                        <el-col :span="15">{{rowCoupon.couponName}}</el-col>
                        <el-col :span="4">{{rowCoupon.couponCount}}张</el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="2">
                          <el-button type="text" @click="delCouponsRow(itemIdx, idRowCoupon)">删除</el-button>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                      </el-row>
                    </el-row>
                  </el-col>
                  <el-col :span="1"></el-col>
                  <el-col :span="3" :center="true">
                    <el-button type="text" @click="delPriceRow(itemIdx)">删除</el-button>
                    <el-button type="text" v-if="itemIdx == (items.length -1)" @click="addPriceRow">添加</el-button>
                  </el-col>
                </el-row>
                <hr style="border:1px solid #ebeef5" />
              </el-row>
            </div>
          </template>
          <template slot="rewardWay" slot-scope="scope">
            <el-row>充送</el-row>
          </template>
        </v-form>
      </div>
    </v-page>
    <!-- 对应的优惠券添加 -->
    <el-dialog :visible.sync='addCoupons' v-if="addCoupons" width='35%'>
      <div class="v-form">
        <v-form :formSettings="addCoupoonsformSettings" @save="couponsSave" @cancel="addCoupons=false">
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
  name: 'customer-details',
  components: {
    layoutDetail,
    websiteSelect,
    vForm
  },
  props: {
    visible: {
      type: Boolean
    },
    formData: {
      type: Object
    },
    showButton: {
      type: Boolean
    }
  },
  data() {
    return {
      idRule: 0,
      itemsIdx: 0,
      addCoupoonsformSettings: addCoupoonsformSettings,
      addCoupons: false,
      detailData: null,
      detailSettings: detailSettings,
      items: [{
        cloumn1: '',
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
        cloumn5: ''
      }],
      itemsbak: [{
        cloumn1: 100,
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
        cloumn5: ''
      }, {
        cloumn1: 200,
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
        cloumn5: ''
      }, {
        cloumn1: 300,
        cloumn2: [],
        cloumn3: [],
        cloumn4: '',
        cloumn5: ''
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
          value: '充送',
          disabled: true
        }, {
          label: '阶梯配置',
          type: 'slot',
          name: 'priceCfg',
          value: '',
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
    // 初始化显示数据
    initShowData(idActivity = 0) {
      if (idActivity) {
        this.$service.detialFullReturn({ id: idActivity }).then(res => {
          if (res.data.code == 0) {
            this.formData = this.$service.detialRechargingFormate(res.data.data)
            this.formData.activityTime = [this.formData.startTime, this.formData.endTime]
            this.items = this.formData.rules
          }
        })
      } else {
        if (this.formData && this.formData.startTime) {
          console.dir('编辑页面')
          console.log(this.formData)
          console.log('---')
          // this.formData.activityTime = [this.formData.startTime, this.formData.endTime]
          this.items = this.formData.rules
        }
      }
    },
    _validateCoupons() {
      let idx = 0
      let counter = this.items.length
      let flag = false
      let counterJ = 0
      let counterJLength = 0
      for (; idx < counter; idx++) {
        if (this.items[idx].cloum5 && this.items[idx].cloumn1 && this.items[idx].cloumn2.length > 0) {
          // 验证优惠券的方法
          counterJLength = this.items[idx].cloumn2.length
          counterJ = 0
          for (; counterJ < counterJLength; counterJ++) {
            if (this.items[idx].cloumn2[counterJ].couponCount && this.items[idx].cloumn2[counterJ].couponName) {} else {
              flag = true
              break
            }
          }
        } else {
          flag = true
          break
        }
      }
      if (flag) {
        this.$message.error('阶梯配置设置不能为空')
        return false
      } else {
        return true
      }
    },
    saveActivity(row) {
      // 优惠券验证
      if (!this._validateCoupons()) {
        return false
      }
      // 满返活动添加
      if (row.activityTime) {
        row.startTime = this.$service.changeDateToString(new Date(row.activityTime[0]))
        row.endTime = this.$service.changeDateToString(new Date(row.activityTime[1]))
      }
      console.log(this.items)
      console.log('---over')
      row.rules = this.$service.formateRules(this.items)
      row.activityType = 'recharge_gift'
      // 优惠券
      row.id = ''
      if (this.formData) {
        row.id = this.formData.id
        this.$service.activityEdit(row).then(res => {
          if (res.data.code == 0) {
            this.$message.success('编辑成功')
            this.$emit('saveAndReload')
          }
        })
      } else {
        this.$service.addFullReturnRow(row).then(res => {
          if (res.data.code == 0) {
            this.$message.success('添加成功')
            this.$emit('saveAndReload')
          }
        })
      }
    },
    blurValue(value) {
      // console.dir(typeof value)
      if (!value) {
        this.$message.error('必填字段不能为空')
        return false
      }
    },
    delCouponsRow(itemIdx, idRowCoupon) {
      this.items[itemIdx].cloumn2.splice(idRowCoupon, 1)
      let res = this.items.map((ele) => {
        return ele
      })
      this.$set(this, 'items', res)
    },
    couponsSave(row) {
      console.dir(row)
      if (parseInt(row.couponCount)) {
        let tmp = row.couponName.split('|')
        let amount = parseInt(tmp[2])
        let userGainTimes = parseInt(tmp[3])
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
        row.couponsNameNew = tmp[0]
        row = {
          'ruleId': this.idRule,
          'couponId': tmp[1],
          'couponCode': tmp[4],
          'couponName': tmp[0],
          'couponCount': row.couponCount
        }
        console.info('---优惠券添加入库参数')
        console.dir(row)
        console.info('---')
        this.items[this.itemsIdx].cloumn2.push(row)
        this.$forceUpdate()
        this.addCoupons = false
      } else {
        this.$message.error('添加优惠券不能为空')
        return false
      }
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
      this.items[this.itemsIdx].cloumn2.push(rowCoupons)
      this.items[this.itemsIdx].cloumn3.push(rowCoupons.couponsnumber)
      this.addCoupons = false
      this.$refs.form.resetFields()
    },
    addCouponsRow(idx, idRule = 0) {
      console.dir('活动配置添加优惠券')
      this.addCoupons = true
      this.itemsIdx = idx
      this.idRule = idRule
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
      // 规则删除
      // this.$service.delRuleCoupons(row).then(res => {
      //   if (res.data.code == 0) {
      //     this.initShowData(this.formData.id)
      //   }
      // })
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
