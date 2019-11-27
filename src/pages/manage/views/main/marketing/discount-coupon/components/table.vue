<template>
  <div class="table-container">
    <el-table :data="tableData" height="100%" :highlight-current-row = true>
          <el-table-column label="优惠券编码" min-width="120px">
            <template slot-scope="scope" show-overflow-tooltip>
              <span v-if="!scope.row.id">未知</span>
              <el-button type="text" v-else @click="showDetail(scope.row)">{{scope.row.code}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="优惠券名" min-width="180px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="contact" label="类型" min-width="180px" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if = "scope.row.type == 1">
                <span>现金券</span><br/>
                <span>{{scope.row.money}}元</span>
                <span>（满{{scope.row.useMoneyCondition}}可用）</span>
              </div>
              <div v-if = "scope.row.type == 2">
                <span>折扣券</span><br/>
                 <span>{{scope.row.discount/10}}折</span>
                <span>（最高可抵{{scope.row.useMoneyTop}}元）</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="contact" label="使用量/发行量" min-width="180px">
             <template slot-scope="scope">
               <el-button type = "text" @click = "jumpPublishList(scope.row)">
                 <span>{{scope.row.downAmount}}/</span>
                 <span>{{scope.row.amount == 0 ? '不限' : scope.row.amount}}</span>
               </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="redeemEndTime" label="发行有效期" min-width="180px">
            <template slot-scope="scope">
               <span>{{scope.row.redeemStartTime}}</span> 至<br/>
               <span>{{scope.row.redeemEndTime}}</span>
              <!-- <div>
                <div>{{scope.row.redeemEndTime | timeFilter}}</div>
              </div> -->
            </template>
          </el-table-column>
          <el-table-column  label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button type="text"  @click = "editCoupon(scope.row)">编辑</el-button>
              <el-popover  placement="top" ref = 'popover5' v-model = 'scope.row.popoverShow' >
                <div >
                    <h4 style="margin:10px">确定删除该优惠券？</h4>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="scope.row.popoverShow = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="deleteCoupon(scope.row)">确定</el-button>
                    </div>
                </div>
                <div slot="reference" class="name-wrapper">
                    <el-button @click="scope.row.popoverShow = true" type = 'text'>删除</el-button>
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
    jumpPublishList (row) {
      this.$emit('showPublishList', row)
    },
    editCoupon (row) {
      let nowTime = Date.parse(new Date())
      if (nowTime > Date.parse(new Date(row.redeemEndTime))) {
        this.$message.warning('超过优惠券发行有效期，无法编辑')
        return false
      }
      this.$emit('on-edit', row)
    },
    deleteCoupon (val) {
      console.log('====coupon====', val)
      if (val.downAmount > 0) {
        this.$message.warning('该优惠券已有用户领取，无法删除')
        return
      }

      this.$service.deleteCoupon({ id: val.id }).then((res) => {
        this.$message.success('删除成功')
        this.$emit('on-reload')
      })
    },
    showDetail (row) {
      this.$emit('showDetail', row)
    },
    submitChangeChargPileNetworkStatus (row) {
      this.$service.openClose({ id: row.id, enable: !row.enabled }).then((res) => {
        this.$message.success('修改成功')
        this.$emit('on-reload')
      })
    }
  }
}
</script>
<style lang="scss">
   #discount-list {
      tbody {
        td {
          span {
            display: inline-block;
          }
        }
      }
   }
</style>
