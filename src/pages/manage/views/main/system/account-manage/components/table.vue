<template>
  <div class="table-container account_list">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column prop="roleId" label="账号编号" min-width="120px"></el-table-column>
          <el-table-column prop="username" label="账号名" min-width="100px"></el-table-column>
          <el-table-column prop="cnName" label="姓名" min-width="100px"></el-table-column>
          <el-table-column prop="operatorName" label="所属运营商" min-width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
               {{scope.row.operatorId === '0'? '和充电' : scope.row.operatorName}}
            </template>
          </el-table-column>
          <el-table-column prop="mobilePhone" label="手机号" min-width="120px"></el-table-column>
          <el-table-column prop="statusVal" label="状态" min-width="100px">
             <template slot-scope="scope">
                <span>{{scope.row.statusVal === 1 ? '启用' : '禁用'}}</span>
             </template>
          </el-table-column>
         <el-table-column
           prop=""
           label="操作"
           fixed="right"
           width="150px"
         >
            <template slot-scope="scope">
                  <el-button type="text" @click = "$emit('on-edit', scope.row)">编辑</el-button>
                  <el-popover :ref=" 'popover' + scope.$index"   placement="top"  trigger="click" popper-class = "popover" @show = "showPopover(scope.$index)">
                    <div style = "text-align: right; font-size: 16px; margin-bottom: 10px;; cursor: pointer">
                      <i class="el-icon-close" @click = "cancelDelate(scope.$index)" ></i>
                    </div>
                    <el-form :inline="true"  class="demo-form-inline" :model="formInline" size="small " :rules="formRules" :ref=" 'formInline' + scope.$index">
                       <el-form-item  style = "height:32px; line-height: 32px" prop = "password">
                          <el-input v-model="formInline.password" placeholder="请输入新密码" style = "height:32px; line-height: 32px"></el-input>
                       </el-form-item>
                       <el-form-item>
                          <el-button type="primary" size="small" @click = "resetPassword(scope.$index, scope.row)">确定</el-button>
                       </el-form-item>
                    </el-form>
                    <div style="text-align: right; margin: 0">
                    </div>
                    <el-button slot="reference" type="text">重置密码</el-button>
                  </el-popover>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  data() {
    const formRules = {
      password: [
        {
          validator: this.passwordCheck,
          trigger: 'blur',
          required: true
        }
      ]
    }
    return {
      formInline: {
        password: ''
      },
      formRules: formRules
    }
  },
  methods: {
    showPopover (index) {
      this.formInline.password = ''
    },
    passwordCheck (rule, value, callback) {
      let reg = /[\u4e00-\u9fa5]/
      if ((value.length < 6 || value.length > 20)) {
        callback(new Error('请输入6-20位字母、数字或字符'))
      } else if (reg.test(value)) {
        callback(new Error('请输入6-20位字母、数字或字符'))
      } else {
        callback()
      }
    },
    getDataAsync(index) {
      return new Promise((resolve, reject) => {
        this.$refs['formInline' + index].validate().then((res) => {
          resolve(this.formInline.password)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    resetPassword (index, row) {
      this.getDataAsync(index).then((data) => {
        if (!data) {
          return
        }
        let params = {
          newPassword: data,
          userId: row.userId
        }
        this.$service.reset_password(params).then((res) => {
          this.$message.success('重置成功')
          this.$refs['popover' + index].doClose()
        })
      }).catch((err) => {
        console.log('====err====', err)
      })
    },
    cancelDelate (index) {
      this.$refs['popover' + index].doClose()
    },
    showDetail (row) {
      this.$emit('showDetail', row)
    },
    deleteAccount () {
    }
  }
}
</script>
<style lang="scss">
   .account_list {
      tbody {
        td {
          span {
            display: inline-block;
          }
        }
      }
  }
</style>
