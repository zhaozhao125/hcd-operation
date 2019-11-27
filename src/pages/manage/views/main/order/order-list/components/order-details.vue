<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>订单详情</h3>
        <div class="buttons" v-if="detailData">
          <el-button  v-if="detailData.orderStatusCode === 'CHARGING'" size="small" type="primary" @click="dialogVisible = true">结束订单</el-button>
        </div>
      </div>
      <div class="detail-content" slot="content" v-if="detailData">
        <layout-detail :detailData="detailData" :detailSettings="detailSettings">
          <template slot-scope="scope" slot="startTime">
            <span>{{detailData.startTime | timeFilter}}</span>
          </template>
           <template slot-scope="scope" slot="endTime">
            <span>{{detailData.endTime | timeFilter}}</span>
          </template>
          <template slot-scope="scope" slot="payDate">
            <span>{{detailData.payDate | timeFilter}}</span>
          </template>
           <template slot-scope="scope" slot="discountTyep">
            <span v-if = "detailData.discountAmount">优惠券</span>
          </template>
          <!-- <template slot-scope="scope" slot="payDate">
            <span>{{detailData.payDate | timeFilter}}</span>
          </template> -->
        </layout-detail>
        <el-dialog title="结束订单" :visible.sync="dialogVisible" width="400px"  :modal-append-to-body="false">
          <el-form :model="validateForm" ref="validateForm" label-width="50px">
            <el-form-item label="备注" prop="remark" :rules="[{ required: true, message: '备注不能为空'}]">
              <el-input type="textarea" :rows="4" v-model="validateForm.remark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('validateForm')" size = "small">提交</el-button>
              <el-button @click="cancelForm('validateForm')" size = "small">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
    orderSn: {
      type: String
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      detailData: null,
      detailSettings: detailSettings,
      dialogVisible: false,
      validateForm: {
        remark: ''
      }
    }
  },
  watch: {
    visible(val) {
      if (val && this.orderSn) {
        this.getDetails()
      }
    },
    dialogVisible (val) {
      console.log(val)
      if (val) {
        this.validateForm.remark = ''
      }
    }
  },
  methods: {
    getDetails() {
      if (this.orderSn) {
        this.$service.orderInfo(this.orderSn).then(res => {
          let obj = {
            totalPower: '',
            totalElecMoney: '',
            totalServiceMoney: '',
            parkingMoney: '',
            totalMoney: '',
            discountAmount: '',
            needPay: '',
            actualPay: '',
          }
          this.detailData = res.data.data
          for (let key in obj) {
            if (this.detailData[key]) {
              if (key == 'totalPower') {
                this.detailData[key] = this.detailData[key] + '度'
              } else if (key == 'discountAmount') {
                this.detailData[key] = this.detailData[key] + '元' + '  ' + this.detailData.couponName
              } else if (key == 'parkingMoney') {
                this.detailData[key] = this.detailData[key] + '元' + '（1小时）'
              } else {
                this.detailData[key] = this.detailData[key] + '元'
              }
            }
          }
        })
      }
    },
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$service.closeOrder({ orderSn: this.orderSn, ...this.validateForm }).then(res => {
            this.dialogVisible = false
            this.getDetails()
            this.$message.success('操作成功')
          })
        } else {
          return false
        }
      })
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
</style>
