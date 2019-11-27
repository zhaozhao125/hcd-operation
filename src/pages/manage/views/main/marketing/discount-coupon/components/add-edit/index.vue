<template>
  <div id="coupon-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>{{handelType === 'addCoupon' ? '添加优惠券' : '编辑优惠券'}}</h3>
      </div>
          <v-form ref="form" slot="content" :formSettings="formSettings" :showButton="false" class="edit_add_form" @typeChange = "typeChange" @useTypeChange = "useTypeChange" :formData="formDatas" label-width = "180px">
            <el-form-item slot="bottom-slot">
              <el-button type="primary"  @click="save()">保存</el-button>
            </el-form-item>
          </v-form>
    </v-page>
  </div>
</template>
<script>
import formSettings from './formSetting.js'
import { handleDate } from '@/utils/date-filter'
export default {
  name: 'add-company',
  props: {
    visible: {
      type: Boolean
    },
    handelType: {
      default: 'addCoupon',
      type: String
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      formSettings: formSettings,
      formDatas: {}
      // formData: null
    }
  },
  mounted () {
  },
  watch: {
    handelType (val) {
      if (val === 'addCoupon') {
        this.formDatas = null
        this.$nextTick(() => {
          this.formSettings[0].items.find(item => item.name == 'money').hidden = true
          this.formSettings[0].items.find(item => item.name == 'useMoneyCondition').hidden = true
          this.formSettings[0].items.find(item => item.name == 'discount').hidden = true
          this.formSettings[0].items.find(item => item.name == 'useMoneyTop').hidden = true
          this.formSettings[1].items.find(item => item.name == 'relativeDayNum').hidden = true
          this.formSettings[1].items.find(item => item.name == 'absoluteTime').hidden = true
        })
      } else {
      }
    },
    visible (val) {
      if (val && this.id) {
        this.formDatas = {}
        this.$service.couponDetail({ id: this.id }).then((res) => {
          if (res.data.data.cityId) {
            if (res.data.data.cityId.split(',').length) {
              this.formDatas.cityId = res.data.data.cityId.split(',').map((ele) => {
                return parseInt(ele)
              })
            } else {
              this.formDatas.cityId = []
            }
          }
          this.formDatas = Object.assign(res.data.data, this.formDatas)
          this.formDatas.publishTime = [this.formDatas.redeemStartTime, this.formDatas.redeemEndTime]
          if (this.formDatas.type == 1) {
            this.$nextTick(() => {
              this.formSettings[0].items.find(item => item.name == 'money').hidden = false
              this.formSettings[0].items.find(item => item.name == 'useMoneyCondition').hidden = false
              this.formSettings[0].items.find(item => item.name == 'discount').hidden = true
              this.formSettings[0].items.find(item => item.name == 'useMoneyTop').hidden = true
              this.$refs.form.setData('discount', undefined)
              this.$refs.form.setData('useMoneyTop', 0)
              this.$refs.form.updateRule()
            })
          } else {
            this.$nextTick(() => {
              this.formSettings[0].items.find(item => item.name == 'money').hidden = true
              this.formSettings[0].items.find(item => item.name == 'useMoneyCondition').hidden = true
              this.formSettings[0].items.find(item => item.name == 'discount').hidden = false
              this.formSettings[0].items.find(item => item.name == 'useMoneyTop').hidden = false
              this.$refs.form.setData('money', undefined)
              this.$refs.form.setData('useMoneyCondition', 0)
              this.$refs.form.updateRule()
            })
          }
          if (this.formDatas.relativeTime) {
            this.$nextTick(() => {
              this.formSettings[1].items.find(item => item.name == 'relativeDayNum').hidden = false
              this.formSettings[1].items.find(item => item.name == 'absoluteTime').hidden = true
              this.$refs.form.setData('absoluteTime', null)
              this.$refs.form.updateRule()
            })
          } else {
            this.$nextTick(() => {
              this.formSettings[1].items.find(item => item.name == 'relativeDayNum').hidden = true
              this.formSettings[1].items.find(item => item.name == 'absoluteTime').hidden = false
              this.$refs.form.setData('absoluteTime', [this.formDatas.startDate, this.formDatas.endDate])
              this.$refs.form.setData('relativeDayNum', undefined)
              this.$refs.form.updateRule()
            })
          }
        })
      }
    }
  },
  methods: {
    typeChange (val) {
      if (val == '1') {
        this.formSettings[0].items.find(item => item.name == 'money').hidden = false
        this.formSettings[0].items.find(item => item.name == 'useMoneyCondition').hidden = false
        this.formSettings[0].items.find(item => item.name == 'discount').hidden = true
        this.formSettings[0].items.find(item => item.name == 'useMoneyTop').hidden = true
      } else {
        this.formSettings[0].items.find(item => item.name == 'money').hidden = true
        this.formSettings[0].items.find(item => item.name == 'useMoneyCondition').hidden = true
        this.formSettings[0].items.find(item => item.name == 'discount').hidden = false
        this.formSettings[0].items.find(item => item.name == 'useMoneyTop').hidden = false
      }
      this.$refs.form.updateRule()
    },
    useTypeChange (val) {
      if (val) {
        this.formSettings[1].items.find(item => item.name == 'relativeDayNum').hidden = false
        this.formSettings[1].items.find(item => item.name == 'absoluteTime').hidden = true
      } else {
        this.formSettings[1].items.find(item => item.name == 'relativeDayNum').hidden = true
        this.formSettings[1].items.find(item => item.name == 'absoluteTime').hidden = false
      }
      this.$refs.form.updateRule()
    },
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    },
    save () {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        let msg
        if (this.handelType === 'addCoupon') {
          msg = '添加成功'
        } else {
          msg = '编辑成功'
          data.id = this.formDatas.id
        }
        if (data.publishTime && data.publishTime.length) {
          data.redeemStartTime = handleDate(data.publishTime[0])
          data.redeemEndTime = handleDate(data.publishTime[1])
        }
        if (data.absoluteTime && data.absoluteTime.length) {
          data.startDate = handleDate(data.absoluteTime[0])
          data.endDate = handleDate(data.absoluteTime[1])
        }
        if (data.cityId) {
          data.cityId = data.cityId.join(',')
        }
        delete data.publishTime
        delete data.absoluteTime
        this.$service[this.handelType](data).then((res) => {
          this.$emit('update:visible', false)
          this.$emit('closePage')
          let msg = this.handelType === 'addCoupon' ? '添加成功' : '编辑成功'
          this.$message.success(msg)
        })
      }).catch(err => {
        console.log('====err====', err)
      })
    }
  }
}
</script>

<style lang="scss">
#coupon-details {
   form {
     .el-input {
       input {
         text-align: left;
       }
     }
   }
}
</style>
