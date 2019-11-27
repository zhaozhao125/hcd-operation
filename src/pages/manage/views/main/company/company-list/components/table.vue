<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="编号" min-width="120px">
            <template slot-scope="scope">
              <span v-if="!scope.row.id">未知</span>
              <el-button type="text" v-else @click="showDetail(scope.row.id)">{{scope.row.id}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="运营商名称" min-width="120px"></el-table-column>
          <el-table-column prop="contact" label="添加人" min-width="120px"></el-table-column>
          <el-table-column prop="createdOn" label="添加时间" min-width="200px">
            <template slot-scope="scope">
              <div>
                <div>{{scope.row.createdOn | timeFilter}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="160">
            <template slot-scope="scope">
              <popSwitch v-model="scope.row.enabled"
                trueText="禁用运营商后，该运营商的充电站和充电桩将一起禁用，请谨慎操作。确定禁用？"
                falseText="确定要启用吗？"
                 @confirm="submitChangeChargPileNetworkStatus(scope.row)"
                ></popSwitch>
            </template>
          </el-table-column>
          <el-table-column  label="操作" min-width="160">
            <template slot-scope="scope">
              <el-button type="text"  @click = "$emit('on-edit', scope.row)">编辑</el-button>
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
    submitChangeChargPileNetworkStatus (row) {
      this.$service.openClose({id: row.id, enable: !row.enabled}).then((res) => {
        this.$message.success('修改成功')
        this.$emit('on-reload')
      })
    }
  }
}
</script>
<style lang="scss">
</style>
