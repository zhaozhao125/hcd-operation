<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>{{handelType === 'addCompany' ? '新增运营商账户' : '编辑运营商账户'}}</h3>
      </div>
          <v-form ref="form" slot="content" :formSettings="formSettings" :showButton="false" class="edit_add_form" :formData="formDatas" label-width = "180px">
            <el-form-item slot="bottom-slot">
              <el-button type="primary"  @click="save()">保存</el-button>
            </el-form-item>
          </v-form>
    </v-page>
  </div>
</template>
<script>
import formSettings from './formSetting.js'
export default {
  name: 'add-company',
  props: {
    visible: {
      type: Boolean
    },
    handelType: {
      default: 'addCompany',
      type: String
    },
    formDatas: {
      type: Object
    }
  },
  data() {
    formSettings[0].items[4].rule = [{
      validator: this.emailCheck,
      trigger: 'blur',
    }]
    formSettings[0].items[3].rule = [{
      validator: this.phoneCheck,
      required: true,
      trigger: 'blur'
    }]
    return {
      formSettings: formSettings
      // formData: null
    }
  },
  mounted () {
    console.log(this.handelType)
  },
  watch: {
    visible (val) {
      if (val) {
        this.allCompanyList()
      }
    },
    handelType (val) {
      if (val === 'add') {
        this.formData = null
      } else {
        this.formData = {
          parkingName: '测试'
        }
      }
    }
  },
  methods: {
    emailCheck (rule, value, callback) {
      let res = (/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value))
      if (value) {
        if (res) {
          callback()
        } else {
          callback(new Error('请输入正确邮箱'))
        }
      } else {
        callback()
      }
    },
    phoneCheck (rule, value, callback) {
      let res = (/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(value))
      if (value) {
        if (res) {
          callback()
        } else {
          callback(new Error('请输入正确手机号'))
        }
      } else {
        callback(new Error('请输入手机号'))
      }
    },
    allCompanyList () {
      this.$service.allCompanyList().then((res) => {
        this.$nextTick(() => {
          this.formSettings[0].items[5].options = res.data.data.map((ele) => {
            return {
              label: ele.name,
              value: ele.id
            }
          })
        })
      })
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
        console.log(data)
        // let msg
        // if (this.handelType === 'addCompany') {
        //   msg = '添加成功'
        // } else {
        //   msg = '编辑成功'
        //   data.id = this.formDatas.id
        // }
        this.$service.accountCreate(data).then((res) => {
          this.$emit('update:visible', false)
          this.$emit('closePage')
          // let msg = this.handelType === 'addCompany' ? '添加成功' : '编辑成功'
          this.$message.success('添加成功')
        })
      }).catch(err => {
        console.log('====err====', err)
      })
    }
  }
}
</script>

<style lang="scss">

</style>
