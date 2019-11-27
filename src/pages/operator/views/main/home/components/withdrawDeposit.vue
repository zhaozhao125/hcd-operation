<template>
  <el-dialog
    title="提现"
    :visible.sync="visible"
    width="450px"
    :before-close="handleClose">
    <v-form ref="form"  :formSettings="formSettings" :showButton="false" class="edit_add_form withdraw" label-width = "100px" :formData="accountInfor">
       <template slot-scope="scope" slot = "bankName">
          {{accountInfor.bankAccountName}}
       </template>
       <template slot-scope="scope" slot = "companymoney">
           {{accountInfor.bankAccountNumber}}
       </template>
       <template slot-scope="scope" slot = "bankName111">
           {{accountInfor.bankName}}
       </template>
       <template slot-scope="scope" slot = "accountMoney">
          <span>{{operatorMoney}}</span>
          <span v-if = "operatorMoney">元</span>
          <el-button type = "text" @click = "withdrawAll" class = "ml-10">全部提现</el-button>
       </template>
    </v-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)" size = "small">取 消</el-button>
      <el-button type="primary" @click="confirm" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { withdrawSetting } from './formSetting.js'
export default {
  data () {
    return {
      formSettings: withdrawSetting,
      accountInfor: {}
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String
    },
    width: {
      type: String
    },
    information: {
      type: Object
    },
    operatorMoney: {
      type: Number
    },
    operatorSn: {
      type: String
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.accountInfor = this.information
        this.$nextTick(() => {
          // this.accountInfor.applyAmount = undefined
          this.$refs.form.formModel.applyAmount = undefined
        })
      }
    }
  },
  methods: {
    withdrawAll () {
      this.$refs.form.formModel.applyAmount = this.operatorMoney
    },
    handleClose () {
      this.$emit('update:visible', false)
    },
    confirm () {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        this.confirmWithdraw(data)
      }).catch(err => {
        console.log('====err====', err)
      })
    },
    confirmWithdraw (data) {
      this.$service.peopleTransfer({ applyAmount: data.applyAmount }).then((res) => {
        this.$emit('update:visible', false)
        this.$emit('updateInfor')
        this.$message.success('提现成功')
      })
    }
  }
}
</script>
<style lang = "scss">
  .withdraw {
     form {
       input {
         text-align: left !important;
       }
       .el-input-number {
         width:120px !important;
       }
     }
  }
</style>
