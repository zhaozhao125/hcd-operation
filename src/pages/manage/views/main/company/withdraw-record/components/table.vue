<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="流水号" min-width="220px"  prop="sn" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="accountName" label="收款户名" min-width="120px"></el-table-column>
          <el-table-column prop="account" label="收款账户" min-width="150px"></el-table-column>
          <el-table-column prop="bank" label="收款行名称" min-width="180px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="amount" label="提现金额" min-width="120px"></el-table-column>
          <el-table-column prop="createDate" label="申请时间" min-width="150px">
            <template slot-scope="scope">
                {{scope.row.createDate | timeFilter }}
            </template>
          </el-table-column>
          <el-table-column prop="enterpriseTransferDate" label="到账时间" min-width="150px">
             <template slot-scope="scope">
                {{scope.row.enterpriseTransferDate | timeFilter }}
            </template>
          </el-table-column>
          <el-table-column prop="evidenceNote" label="凭证" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="statusText" label="状态" min-width="120px"></el-table-column>
          <el-table-column prop="operator" label="操作人" min-width="120px"></el-table-column>
          <el-table-column prop="contact" label="处理" min-width="120px" fixed = "right">
            <template slot-scope="scope" >
              <el-popover  placement="top" ref = 'popover5' v-model = 'scope.row.popoverShow' >
                <div >
                    <h4 style="margin:10px">
                       确定已通过线下成功转账，<br/>状态会标记为已处理</h4>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="scope.row.popoverShow = false">取消</el-button>
                        <el-button type="primary" size="mini" @click = "handel(scope.row)">确定</el-button>
                    </div>
                </div>
                <div slot="reference" class="name-wrapper">
                    <el-button @click="scope.row.popoverShow = true" type = 'text'>处理</el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  name: 'order-table',
  components: {
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
    handel (val) {
      this.$service.peopleTransfer({ sn: val.sn }).then((res) => {
        this.$message.success('处理成功')
        this.$emit('on-reload')
      })
    }
  }
}
</script>
<style lang="scss">
</style>
