<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row=true>
      <el-table-column label="活动编号" min-width="120px">
        <template slot-scope="scope">
          <span v-if="!scope.row.id">未知</span>
          <el-button type="text" v-else @click="editActivityRow(scope.row,false)">{{scope.row.id}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" min-width="150px">
        <template slot-scope="scope">
          <div>
            <div>{{scope.row.name}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="activityTypeContent" label="活动类型" min-width="120px"></el-table-column>
      <el-table-column prop="activityStatusContent" label="活动状态" min-width="120px"></el-table-column>
      <!-- <el-table-column prop="getMaxNum" label="领取次数" min-width="120px"></el-table-column> -->
      <el-table-column prop="activityTime" label="活动时间" min-width="360px">
        <template slot-scope="scope">
          <p>{{scope.row.startTime}} 00:00:00 至 {{scope.row.endTime}} 23:59:59</p>
        </template>
      </el-table-column>
      <el-table-column prop="upStatus" label="启用状态" min-width="200px">
        <template slot-scope="scope">
          <popSwitch v-model="scope.row.upStatus" trueText="确定禁用？" falseText="确定开启？" @confirm="handleConfirmSwitch(scope.row)"></popSwitch>
        </template>
      </el-table-column>
      <el-table-column prop="activityTime" label="操作" min-width="200px" fixed="right">
        <template slot-scope="scope" v-if="scope.row.activityStatus=='waiting'">
          <el-button type="text" @click="editActivityRow(scope.row)">编辑</el-button>
          <el-button type="text" @click="delRowDialog(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="delRowFlag" width="30%" center>
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="delActivityRow">确 定</el-button>
            <el-button @click="delRowFlag = false">取 消</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script>
import popSwitch from '@/components/pop-switch'
export default {
  name: 'order-table',
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
      delRowFlag: false,
      idActivity: 0,
      item: {}
    }
  },
  methods: {
    handleConfirmSwitch(row) {
      let status = row.upStatus
      let params = {
        id: row.id
      }
      let msg = '该活动已暂停'
      if (!row.upStatus) {
        msg = '该活动重新开启'
      }
      this.$service.changeRowStatus(params).then(res => {
        if (res.data.code == 0) {
          this.$message.success(msg)
          this.$emit('on-reload')
        } else {
          this.$message.error(msg)
        }
      })
      return false
    },
    delRowDialog(id) {
      this.delRowFlag = true
      this.idActivity = id
    },
    delActivityRow() {
      let params = {
        id: this.idActivity
      }
      this.$service.delRow(params).then(res => {
        if (res.data.code == 0) {
          this.delRowFlag = false
          this.$message.success('删除成功')
          this.$emit('on-reload')
        } else {
          this.$message.error('删除失败')
        }
      }).catch((e) => {
        this.delRowFlag = false
      })
    },
    UserFormateRow(row) {
      // 页面数据的拉取和优惠券的设置
      return row
    },
    detialRow(row) {
      this.$service.detialFullReturn({ id: row.id }).then(res => {
        if (res.data.data) {
          this.item = res.data.data
        }
      })
    },
    RechargingRow(row) {
      row.activityTime = [row.activityStart, row.activityEnd]
      return row
    },
    editActivityRow(row, saveButton = true) {
      // this.detialRow(row)
      this.$service.detialFullReturn({ id: row.id }).then(res => {
        if (res.data.data) {
          this.item = res.data.data
          let nameFunCb = ''
          switch (row.activityTypeContent) {
            case '充送':
              if (saveButton) {
                nameFunCb = 'editRecharging'
              } else {
                nameFunCb = 'detialRecharging'
              }
              this.item = this.$service.detialRechargingFormate(this.item)
              break
            case '满返':
              if (saveButton) {
                nameFunCb = 'editFullReturn'
              } else {
                nameFunCb = 'detialFullReturn'
              }
              this.item = this.$service.detialFullReturnFormate(this.item)
              break
            case '新用户注册':
              if (saveButton) {
                nameFunCb = 'editnewUserFun'
              } else {
                nameFunCb = 'detialNewUser'
              }
              this.item = this.$service.detialNewUserFormate(this.item)
              break
          }
          // todo格式化对应的数据 直接渲染对应页面数据
          this.$emit(nameFunCb, {
            item: this.item,
            flag: saveButton
          })
        }
      })
    }
  }
}

</script>
<style lang="scss">
</style>
