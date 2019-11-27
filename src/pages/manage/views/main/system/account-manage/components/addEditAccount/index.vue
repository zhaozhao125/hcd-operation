<template>
  <el-dialog
    :title="type === 'add_account' ? '添加账号' : '编辑账号'"
    :visible.sync="dialogVisible"
    width="500px"
    class = "system_account"
   >
    <v-form ref="form"  :formSettings="formSettings" :showButton="false" class="edit_add_form" labelWidth = "100px" :formData="AccountInfor">
      <template slot="operatorId" slot-scope="scope">
          <el-select v-model="scope.model.operatorId" placeholder="请选择">
            <el-option
              v-for="(item, index) in roleOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-input-number v-model="scope.model.amount" :controls=false placeholder="套餐金额"></el-input-number> -->
          <span  class = "role_mark">注：和充电管理员拥有后台所有菜单权限，运营商管理员只拥有部分菜单权限且只能看到该运营商的相关数据</span>
      </template>
      <el-form-item slot="bottom-slot">
        <el-button   @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"  @click="save()">保存</el-button>
      </el-form-item>
    </v-form>
  </el-dialog>
</template>
<script>
import formSettings  from './formSetting.js'
export default {
  data () {
    formSettings[0].items[0].rule = [{
      validator: this.accountCheck,
      trigger: 'blur',
      required: true
    }]
    formSettings[0].items[1].rule = [{
      validator: this.passwordCheck,
      trigger: 'blur',
      required: true
    }]
    formSettings[0].items[4].rule = [{
      validator: this.telphoneCheck,
      trigger: 'blur',
      required: true
    }]
    return {
      dialogVisible: false,
      formSettings: formSettings,
      AccountInfor: {},
      type: 'add_account',
      accountInfor: {},
      roleOptions: [
      ]
    }
  },
  methods: {
    allCompanyList () {
      this.$service.allCompanyList().then((res) => {
        this.$nextTick(() => {
          this.roleOptions = res.data.data.map((ele) => {
            return {
              label: ele.name + '管理员',
              value: ele.operatorId
            }
          })
          this.roleOptions.unshift({
            label: '和充电管理员',
            value: '0'
          })
         })
      })
    },
    show (val) {
      this.allCompanyList()
      this.accountInfor = val
      this.dialogVisible = true
      this.AccountInfor = {}
      if (val) {
        this.type = 'edit_account'
        this.formSettings = [{
        label: '',
        items: [
          {
            label: '用户角色',
            name: 'operatorId',
            required: true,
            type: 'slot',
            placeholder: '请选择'
          },{
            label: '是否启用',
            name: 'status',
            type: 'switch',
            activeValue: 1,
            inactiveValue: 0
          }
        ]
      }]
      this.$nextTick(() => {
        this.$refs.form.setData('status', val.statusVal)
        this.$refs.form.setData('operatorId', val.operatorId)
      })
      } else {
        this.AccountInfor = {}
        this.formSettings = formSettings
        this.type = 'add_account'
      }
    },
    // 账户名校验
    accountCheck (rule, value, callback) {
      let reg = /[\u4e00-\u9fa5]/
      if (!value) {
        callback(new Error('请输入用户名'))
      } else if (reg.test(value)){
        callback(new Error('请输入字母、数字或字符'))
      } else {
        callback()
      }
    },
    passwordCheck (rule, value, callback) {
      let reg = /[\u4e00-\u9fa5]/
      if (value.length < 6 || value.length > 20) {
        callback(new Error('请输入6-20位字母、数字或字符'))
      } else if (reg.test(value)) {
        callback(new Error('请输入6-20位字母、数字或字符'))
      } else {
         callback()
      }
    },
    telphoneCheck (rule, value, callback) {
      let reg = /^((1[3-8][0-9])+\d{8})$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('手机号不合法'))
      }
    },
    save() {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        let tip
        if (this.type === 'add_account') {
          tip = '添加成功'
        } else {
          tip = '编辑成功'
          data.userId = this.accountInfor.userId
        }
        this.$service[this.type](data).then((res) => {
          this.$emit('on-success')
          this.$message.success(`${tip}`)
          this.dialogVisible = false
        })
      }).catch(err => {
        console.log('====err====', err)
      })
    },
  }
}
</script>
<style lang = "scss">
  .system_account {
    & .v-form {
      .role_mark {
        color: #606266; 
        line-height: 22px !important;
        margin-top: 12px;
        display: inline-block;
      }
    }
  }
</style>
