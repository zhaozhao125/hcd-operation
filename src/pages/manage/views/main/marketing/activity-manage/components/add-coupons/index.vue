<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
   >
    <v-form ref="form"  :formSettings="formSettings" :showButton="false" class="edit_add_form" labelWidth = "100px">
      <el-form-item slot="bottom-slot">
        <el-button   @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"  @click="save()">保存</el-button>
      </el-form-item>
    </v-form>
  </el-dialog>
</template>
<script>
import formSettings from './formSetting.js'
import websiteSelect from '@/components/website-select'
export default {
  components: {
    websiteSelect
  },
  data () {
    return {
      dialogVisible: false,
      formSettings: formSettings,
      AccountInfor: {},
      title: '',
      type: '',
      row: null
    }
  },
  methods: {
    show (val) {
      this.row = val
      this.dialogVisible = true
      this.AccountInfor = {}
      // this.allCompanyList()
      if (val) {
        this.title = '编辑充电桩'
        this.pileInfor(val.id)
        this.type = 'editPile'
      } else {
        this.title = '添加充电桩'
        this.AccountInfor = {}
        this.type = 'addPile'
      }
    },
    allCompanyList () {
      this.$service.allCompanyList().then((res) => {
        this.$nextTick(() => {
          this.formSettings[0].items[2].options = res.data.data.map((ele) => {
            return {
              label: ele.name,
              value: ele.operatorId
            }
          })
          if (this.$store.state.user.operatorId == '0') {
          } else {
            this.$refs.form.setData('operatorId', this.$store.state.user.operatorId)
            this.formSettings[0].items[2].disabled = true
          }
         })
      })
    
    },
    pileInfor(id) {
      this.$service.pileInfor({id: id}).then((res) => {
        this.AccountInfor = res.data.data
        this.AccountInfor.stationName = this.row.stationName
      })
    },
    changeStationName(){
      this.AccountInfor.stationName = ''
    },
    save() {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        if (this.$store.state.user.operatorId == '0') {
        } else {
          data.operatorId = this.$store.state.user.operatorId
        }
        //  let msg = this.title === '编辑充电桩' ? '编辑成功' : '添加成功'
        let msg
        if (this.type === 'addPile') {
          msg = '添加成功'
        } else {
          msg = '编辑成功'
          data.id = this.row.id
        }
        this.$service[this.type](data).then((res) => {
          this.$message.success(msg)
          this.$emit('on-success')
          this.dialogVisible = false
        })
      }).catch(err => {
        console.log('====err====', err)
      })
    },
  }
}
</script>