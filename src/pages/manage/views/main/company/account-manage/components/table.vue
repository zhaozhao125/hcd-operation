<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="用户名" min-width="120px" prop="username">
          </el-table-column>
          <el-table-column prop="cnName" label="姓名" min-width="120px"></el-table-column>
          <el-table-column prop="mobilePhone" label="手机号" min-width="120px"></el-table-column>
          <el-table-column prop="operator" label="所属运营商" min-width="200px">
          </el-table-column>
          <el-table-column label="状态" min-width="160">
            <template slot-scope="scope">
              <popSwitch v-model="scope.row.status"
                trueText="确定禁用运营商账户？"
                falseText="确定启用运营商账户？"
                 @confirm="submitChangeChargPileNetworkStatus(scope.row)"
                ></popSwitch>
            </template>
          </el-table-column>
          <el-table-column  label="操作" min-width="160">
            <template slot-scope="scope">
              <!-- <el-button type="text"  @click = "resetPassword(scope.row)">重置密码</el-button> -->
               <el-popover class="confirm-popover" placement="bottom" width="160" :ref="'resetPopper' + scope.$index">
                <el-button slot="reference" type="text">重置密码</el-button>
                <p>确定要重置密码吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="handleResetCancel(scope.$index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleResetConfirm(scope.row, scope.$index)">确定</el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import popSwitch from '@/components/pop-switch'
export default {
  name: 'account-table',
  components: {
    popSwitch
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleResetConfirm(data, index) {
      this.$refs['resetPopper' + index].showPopper = false
      this.$service.companyResetPassword({ id: data.id }).then(res => {
        this.$alert(`用户密码为： ${res.data.msg}`, '重置成功', {
          confirmButtonText: '确定',
          type: 'success',
          callback: action => {

          }
        })
      })
    },
    handleResetCancel(index) {
      this.$refs['resetPopper' + index].showPopper = false
    },
    resetPassword(data) {
      this.currentData = data
      this.resetPasswordVisible = true
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: val => {
          if (!val) {
            return '密码不能为空'
          }
        }
      })
        .then(({ value }) => {
          this.$service
            .companyResetPassword(this.currentData.userId, value)
            .then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            })
        })
        .catch(e => {
          console.log('====e====', e)
        })
    },
    showDetail (row) {
      this.$emit('showDetail', row)
    },
    submitChangeChargPileNetworkStatus (row) {
      let params = {}
      params.id = row.id
      if (row.status) {
        params.status = 'invalid'
      } else {
        params.status = 'valid'
      }
      this.$service.accountSetting(params).then((res) => {
        this.$message.success('设置成功')
        this.$emit('on-reload')
      })
    }
  }
}
</script>
<style lang="scss">
</style>
