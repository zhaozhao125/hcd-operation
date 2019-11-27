<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="用户编号" min-width="120px">
            <template slot-scope="scope">
              <span v-if="!scope.row.userId">未知</span>
              <el-button type="text" v-else @click="showDetail(scope.row.userId)">{{scope.row.userId}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="用户信息" min-width="150px">
            <template slot-scope="scope">
              <div>
                <div>{{scope.row.userName}}</div>
                <div>{{scope.row.userPhone}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cityName" label="注册城市" min-width="120px"></el-table-column>
          <el-table-column prop="userMoney" label="钱包余额" min-width="120px">
          </el-table-column>
          <el-table-column prop="statusCode" label="账户状态" width="120px">
            <template slot-scope="scope">
               <popSwitch v-model="scope.row.statusCode" trueText="账户禁用后，用户将不能正常登陆和充电， 确定禁用？" falseText="确定要启用该用户吗？" @confirm="handleConfirmSwitch(scope.row)" ></popSwitch>
            </template>
          </el-table-column>
        </el-table>
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
    }
  },
  methods: {
    showDetail (row) {
      this.$emit('showDetail', row)
    },
    handleConfirmSwitch (row) {
      let status = row.statusCode ? 0 : 1
      this.$service.customerHandel({ userId: row.userId, statusCode: status }).then((res) => {
        this.$message.success('修改成功')
        this.$emit('on-reload')
      })
    }
  }
}
</script>
<style lang="scss">
</style>
