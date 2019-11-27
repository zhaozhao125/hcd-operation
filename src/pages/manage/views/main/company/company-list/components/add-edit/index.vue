<template>
  <div id="customer-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>{{handelType === 'addCompany' ? '添加运营商' : '编辑运营商'}}</h3>
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
    return {
      formSettings: formSettings
      // formData: null
    }
  },
  mounted () {
    console.log(this.handelType)
  },
  watch: {
    handelType (val) {
      console.log(val)
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
        if (this.handelType === 'addCompany') {
          msg = '添加成功'
        } else {
          msg = '编辑成功'
          data.id = this.formDatas.id
        }
        this.$service[this.handelType](data).then((res) => {
          this.$emit('update:visible', false)
          this.$emit('closePage')
          let msg = this.handelType === 'addCompany' ? '添加成功' : '编辑成功'
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

</style>
