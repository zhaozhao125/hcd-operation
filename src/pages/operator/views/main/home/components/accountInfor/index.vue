<template>
  <div class = "account-infor">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>账户信息</h3>
      </div>
      <div  class="detail-content" slot="content" >
      <v-form ref="form"  :formSettings="formSettings"  class="edit_add_form" label-width = "100px" :formData="accountInfor" @save = "save">
      </v-form>
      </div>
    </v-page>
  </div>
</template>
<script>
import { completeSetting } from '../formSetting.js'
// let amapManager = new AMapManager();
export default {
  components: {
    // siteMap
  },
  props: {
    id: {
      type: Number
    },
    visible: {
      type: Boolean
    },
  },
  data() {
    return {
      accountInfor: {},
      formSettings: completeSetting
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.bankInformation()
      }
    }
  },
  methods: {
    bankInformation () {
      this.$service.bankInformation({ operatorId: this.$store.state.user.user.operatorId }).then((res) => {
        this.accountInfor = res.data.data
        // this.accountInfor =
        // this.accountMoney = 1000000
        // // res.data.data.bankAccountName = ''
        // this.accountInfor = res.data.data
        // this.accountInfor.money = 100
      })
    },
    save (data) {
      data.operatorId = this.$store.state.user.user.operatorId
      this.$service.complateInformation(data).then((res) => {
        this.$message.success('保存成功')
        this.$emit('closePage')
        this.$emit('update:visible', false)
        this.$emit('updateInfor')
      })
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
