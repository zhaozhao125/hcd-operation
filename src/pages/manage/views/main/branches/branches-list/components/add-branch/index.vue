<template>
  <div class="add_edit_branch">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>{{type == 'addBranch' ? '添加充电站' : '编辑充电站'}}</h3>
      </div>
       <v-form ref="form" slot="content" :formSettings="formSettings" :showButton="false" class="edit_add_form" :formData="pileInfor">
        <template slot="position" slot-scope="scope" v-if = "visible">
           <position-infor @address = "getAddress" :location = "location"></position-infor>
        </template>
        <template slot="prices" slot-scope="scope">
           <div class = "charge_free">
              <el-table
                 ref = "priceTable"
                :data="tableData"
                :show-header = false
               >
                <el-table-column
                  prop="startTime"
                  label=""
                  min-width = 108
                  >
                  <template slot-scope="scope">
                     <div class = "electric el-form-item"  data-name="startTime">
                        <el-time-select
                          placeholder="开始"
                          v-model="scope.row.startTime"
                          :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '23:00'
                          }">
                        </el-time-select>
                     </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="endTime"
                  label=""
                  min-width = 108
                  >
                  <template slot-scope="scope">
                     <div class = "electric el-form-item"  data-name="endTime">
                        <el-time-select
                          placeholder="结束"
                          v-model="scope.row.endTime"
                          :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '23:00'
                          }">
                        </el-time-select>
                     </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="electricity"
                  label=""
                  min-width = 180
                  >
                  <template slot-scope="scope">
                     <div class = "electric el-form-item"  data-name="elecPrice">
                       <div class = 'line_32'>电费</div>
                       <el-input-number v-model.trim="scope.row.elecPrice" :precision="2" :step="0.1" :controls = false  style = "width:80px" class = "inputNumber"></el-input-number>
                       <div class = 'line_32'>元/度</div>
                     </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="service"
                  min-width = 190
                  label="">
                   <template slot-scope="scope">
                     <div class = "service electric el-form-item" data-name="servicePrice">
                       <span  class = 'line_32'>服务费</span>
                       <el-input-number v-model="scope.row.servicePrice" :precision="2" :step="0.1" :controls = false class = "inputNumber" style = "width:80px" placeholder = '请输入'></el-input-number>
                       <div  class = 'line_32'>元/度</div>
                     </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"

                  >
                   <template slot-scope="scope">
                      <el-button type="text" size="small" v-if = "(scope.$index === tableData.length - 1)" @click.native.prevent="addRow(scope.$index, tableData)"><i class="el-icon-plus" style = "font-size: 20px"></i></el-button>
                      <el-button size ="small" type = "text" v-if = "scope.$index !== 0 || (scope.$index === 0 && tableData.length > 1)" @click.native.prevent="deleteRow(scope.$index, tableData)"><i class="el-icon-minus" style = "font-size: 20px"></i></el-button>
                  </template>
                </el-table-column>
              </el-table>
           </div>
        </template>
        <template slot="parkingPrice" slot-scope="scope" >
           <div class = "parkingPrice">
            <el-input-number v-model="scope.model.parkingPrice" :controls=false :precision="2" placeholder="保险返利"></el-input-number>
            <span style="color: #606266" class = "pl-5">元/小时</span>
            <el-checkbox v-model="freeChecked" class = "freeChecked" @change="freeHourChange">
                <span class = "pr-5">前</span>
                <el-input-number v-model="beforeHoursFree" :controls=false :precision="2" @blur = "freeHourCheck"></el-input-number>
                <span style="color: #606266" class = "pl-5">小时免收</span>
            </el-checkbox>
            <el-checkbox v-model="topChecked" class = "topChecked" @change="maxHourChange">
               <span class = "pr-5">封顶价</span>
              <el-input-number v-model="maxParkingPrice" :controls=false :precision="2"  @blur = "maxParkingCheck"></el-input-number>
              <span style="color: #606266" class = "pl-5">元</span>
            </el-checkbox>
           </div>
        </template>
        <el-form-item slot="bottom-slot">
          <el-button type="primary"  @click="save()">保存</el-button>
        </el-form-item>
      </v-form>
    </v-page>
  </div>
</template>
<script>
import formSettings from './formSetting.js'
import searchSelect from '@/components/website-select'
import positionInfor from './positionInfor'
export default {
  components: {
    searchSelect,
    positionInfor
  },
  props: {
    visible: {
      type: Boolean
    },
    id: {
      type: Number
    },
    companyList: {
      default: () => [],
      type: Array
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.setData('parkingPrice', undefined)
          this.freeChecked = true
          this.topChecked = true
        })
        this.formSettings[1].items[0].options = this.companyList
        this.pileInfor = {}
        this.tableData = [{
          elecPrice: undefined,
          servicePrice: undefined,
          startTime: null,
          endTime: null
        }]
      }
      if (val && this.id) {
        this.getDetails()
      }
      if (this.id) {
        this.type = 'editBranch'
      } else {
        this.type = 'addBranch'
        this.beforeHoursFree = 4
        this.maxParkingPrice = 10
        this.freeChecked = true
        this.topChecked = true
      }
    }
  },
  data () {
    formSettings[1].items[4].rule = [
      {
        validator: this.checkFree,
        trigger: 'blur',
        required: true
      }
    ]
    return {
      formSettings: formSettings,
      pileInfor: {},
      tableData: [{
        elecPrice: undefined,
        servicePrice: undefined,
        startTime: null,
        endTime: null
      }],
      type: 'addBranch',
      location: [],
      freeChecked: true,
      topChecked: true,
      beforeHoursFree: 4,
      maxParkingPrice: 10,
      addVisible: false,
    }
  },

  methods: {
    freeHourChange (val) {
      if (val) {
        this.beforeHoursFree = 4
      } else {
        this.beforeHoursFree = undefined
      }
    },
    maxHourChange (val) {
      if (val) {
        this.maxParkingPrice = 10
      } else {
        this.maxParkingPrice = undefined
      }
    },
    freeHourCheck (val) {
      if (this.freeChecked) {
        if (this.beforeHoursFree <= 0) {
          this.$message.warning('免收站位费时长必须大于0')
        }
      } else {}
    },
    maxParkingCheck () {
      if (this.topChecked) {
        if (this.maxParkingPrice < 1 || this.maxParkingPrice > 999) {
          this.$message.warning('封顶价必须为在（1-999）之间且不能小于站位费单价')
        }
      } else {}
    },
    checkFree (rule, value, callback) {
      console.log(value)
      value = this.tableData.map((ele) => {
        return ele
      })
      console.log(this.tableData)
      let $priceTable = this.$refs.priceTable.$el
      let priceArr = this.tableData.map((item, index, arr) => {
        return item
      })
      let errMsg = new Set()
      priceArr.forEach((priceItem, priceIndex) => {
        delete priceItem.currentPeriod
        Object.keys(priceItem).forEach(item => {
          if ($priceTable.querySelectorAll('.el-table__row')[priceIndex]) {
            let $item = $priceTable.querySelectorAll('.el-table__row')[priceIndex].querySelector(`[data-name=${item}]`)
            if ($item) {
              if (!priceItem[item] && priceItem[item] !== 0) {
                $item.classList.remove('is-success')
                $item.classList.add('is-error')
                errMsg.add('输入值不能为空')
                this.addVisible = false
              } else {
                $item.classList.remove('is-error')
                $item.classList.add('is-success')
              }

              let _start = this.tableData[0].startTime
              let _end = ''
              if (priceIndex > 0) {
                _end = this.tableData[priceIndex - 1].endTime
              } else {
                _end = this.tableData[0].endTime
              }
              if (item === 'startTime') {
                if (priceItem[item] && priceIndex > 0) {
                  let start = priceItem[item]
                  if (start !== this.endTimeChange(_end)) {
                    if (parseInt(start.split(':')[0]) <= parseInt(_end.split(':')[0])) {
                      $item.classList.remove('is-success')
                      $item.classList.add('is-error')
                      errMsg.add('该时间段已设置价格')
                      this.addVisible = false
                    } else {
                      $item.classList.remove('is-success')
                      $item.classList.add('is-error')
                      errMsg.add('请输入闭合时间段')
                      this.addVisible = false
                    }
                  } else {
                    $item.classList.remove('is-error')
                    $item.classList.add('is-success')
                  }
                }
              } else if (item === 'endTime') {
                if (priceIndex === 0 && priceItem.endTime) {
                  if (Number(priceItem.startTime.replace(/:/, '.')) >= Number(priceItem.endTime.replace(/:/, '.'))) {
                    this.addVisible = false
                    errMsg.add('开始时间不能大于等于结束时间')
                    return
                  }
                }
                if (priceItem.endTime) {
                  if (Number(priceItem.startTime.replace(/:/, '.')) === Number(priceItem.endTime.replace(/:/, '.'))) {
                    this.addVisible = false
                    errMsg.add('开始时间不能大于等于结束时间')
                    return
                  }
                }
                if (priceIndex !== 0 && priceItem.endTime) {
                  if (Number(priceArr[priceIndex - 1].endTime.replace(/:/, '.')) === Number(priceItem.endTime.replace(/:/, '.'))) {
                    this.addVisible = false
                    errMsg.add('该时间段已设置价格')
                    return
                  }
                }
                if (priceItem[item] && _start && _end) {
                  let end = priceItem[item]
                  if (!(this.endTimeChange(end) === _start || (_start === '00:00' && end === '23:00') || (_start === '23:00' && end === '00:00'))
                  ) {
                    this.addVisible = true
                    // console.log('_start:' + _start, '_end:' + _end, 'end:' + end)
                    if (Number(_start.replace(/:/, '.')) < Number(_end.replace(/:/, '.'))) {
                      if (Number(_start.replace(/:/, '.')) <= Number(end.replace(/:/, '.')) && Number(end.replace(/:/, '.')) < Number(_end.replace(/:/, '.'))) {
                        $item.classList.remove('is-success')
                        $item.classList.add('is-error')
                        errMsg.add('该时间段已设置价格')
                        this.addVisible = false
                      } else {
                        $item.classList.remove('is-error')
                        $item.classList.add('is-success')
                      }
                    } else if (Number(_start.replace(/:/, '.')) > Number(_end.replace(/:/, '.'))) {
                      if ((Number(end.replace(/:/, '.')) > Number(_start.replace(/:/, '.')) && Number(end.replace(/:/, '.')) <= 24) ||
                        (Number(end.replace(/:/, '.')) >= 0 && Number(end.replace(/:/, '.')) < Number(_end.replace(/:/, '.')))) {
                        $item.classList.remove('is-success')
                        $item.classList.add('is-error')
                        errMsg.add('该时间段已设置价格')
                        this.addVisible = false
                      } else {
                        $item.classList.remove('is-error')
                        $item.classList.add('is-success')
                      }
                    } else {
                      this.addVisible = true
                    }
                  } else {
                    this.addVisible = false
                  }
                }
              }
            }
          }
        })
      })
      if (errMsg.size) {
        return callback(new Error(Array.from(errMsg).join(', ')))
      }
      callback()
    },
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
        if (this.addVisible) {
          this.$message({
            message: '充电费用设置必须涵盖24小时',
            type: 'warning'
          })
        }
        data.beforeHoursFree = this.beforeHoursFree
        data.maxParkingPrice = this.maxParkingPrice
        data.images = data.images.map((ele) => {
          return ele.url
        })
        let pricesMap = this.tableData.map((ele) => {
          return JSON.parse(JSON.stringify(ele))
        })
        pricesMap.forEach((ele) => {
          ele.endTime = parseInt(ele.endTime.split(':')[0])
          ele.startTime = parseInt(ele.startTime.split(':')[0])
        })
        data.prices = pricesMap
        data.lng = data.x.split(',')[1]
        data.lat = data.x.split(',')[0]
        delete data.x
        delete data.position
        let msg
        if (this.type === 'addBranch') {
          msg = '添加成功'
        } else {
          msg = '编辑成功'
          data.id = this.id
        }
        if (this.freeChecked) {
          if (this.beforeHoursFree <= 0) {
            this.$message.warning('免收站位费时长必须大于0')
            return
          }
        }
        if (this.topChecked) {
          if (this.maxParkingPrice < 1 || this.maxParkingPrice > 999) {
            this.$message.warning('封顶价必须为在（1-999）之间且不能小于站位费单价')
            return
          }
        }
        if (this.freeChecked) {
          data.beforeHoursFree = this.beforeHoursFree
        } else {
          delete data.beforeHoursFree
        }
        if (this.topChecked) {
          data.maxParkingPrice = this.maxParkingPrice
        } else {
          delete data.maxParkingPrice
        }
        this.$service[this.type](data).then((res) => {
          this.$emit('update:visible', false)
          this.$emit('closePage')
          this.$message.success(msg)
        })
      }).catch(err => {
        console.log('====err====', err)
      })
    },
    getAddress (val) {
      this.$refs.form.setData('address', val.address)
      this.$refs.form.setData('x', val.lat + ',' + val.lng)
    },
    endTimeChange (val) {
      if (val) {
        let time = parseInt(val.split(':')[0]) + 1
        if (time < 10) {
          return '0' + time + ':00'
        } else if (time >= 24) {
          return '0' + (time - 24) + ':00'
        } else {
          return time + ':00'
        }
      } else {
        return null
      }
    },
    addRow (index, rows) {
      if (this.tableData[0].startTime && rows[index].endTime) {
        let isAdd = parseInt(this.tableData[0].startTime.split(':')[0]) === parseInt(this.endTimeChange(rows[index].endTime).split(':')[0])
        if (parseInt(this.tableData[0].startTime.split(':')[0]) === 0) {
          if (parseInt(rows[index].endTime.split(':')[0]) === 23) {
            this.$message.warning('充电费用设置已完成，不能继续添加')
            return
          }
        } else {
          if (isAdd) {
            this.$message.warning('充电费用设置已完成，不能继续添加')
            return
          }
        }
      }
      this.tableData.push({
        elecPrice: undefined,
        servicePrice: undefined,
        startTime: this.endTimeChange(rows[index].endTime),
        endTime: ''
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    getDetails() {
      if (this.id) {
        this.$service.branchInforHandel({ id: this.id }).then(res => {
          this.$nextTick(() => {
            this.pileInfor = {
              stationName: res.data.data.stationName,
              cityId: res.data.data.cityId,
              operatorId: res.data.data.operatorId,
              stationType: res.data.data.stationType,
              openTime: res.data.data.openTime,
              telephone: res.data.data.telephone,
              parkingPrice: res.data.data.parkingPrice,
              x: res.data.data.lat + ',' + res.data.data.lng,
              address: res.data.data.address,
              enabled: res.data.data.enabled,
              stationIntro: res.data.data.stationIntro,
            }
            if (res.data.data.beforeHoursFree) {
              this.freeChecked = true
              this.beforeHoursFree = res.data.data.beforeHoursFree
            } else {
              this.freeChecked = false
              this.beforeHoursFree = undefined
            }
            if (res.data.data.maxParkingPrice) {
              this.topChecked = true
              this.maxParkingPrice = res.data.data.maxParkingPrice
            } else {
              this.topChecked = false
              this.maxParkingPrice = undefined
            }
            this.pileInfor.images = res.data.data.imageArray.map(item => {
              return {
                name: item.split('/').pop(),
                url: item
              }
            })
            if (res.data.data.prices.length) {
              res.data.data.prices.forEach((ele) => {
                if (Number(ele.startTime) < 10) {
                  ele.startTime = '0' + ele.startTime + ':00'
                } else {
                  ele.startTime = ele.startTime + ':00'
                }

                if (Number(ele.endTime) < 10) {
                  ele.endTime = '0' + ele.endTime + ':00'
                } else {
                  ele.endTime = ele.endTime + ':00'
                }
              })
              this.tableData = res.data.data.prices
            } else {
              this.tableData = [{
                elecPrice: undefined,
                servicePrice: undefined,
                startTime: '',
                endTime: ''
              }]
            }

            // this.tableData = res.data.data.prices
            this.location = [res.data.data.lat, res.data.data.lng]
          })
        })
      }
    },
  },
  mounted () {
    // this.$refs.form.setData('parkingPrice', undefined)
  },
  created () {
  }
}
</script>

<style lang="scss">
  .add_edit_branch {
    .is-success {
      border-color: #16a085;
    }
    .v-form {
       max-width: 980px;
      .form-section {
        .el-form-item__content{
          max-width:700px;
        }
      }
    }
    // .v-form .el-form-item__content > .el-select, .v-form .el-form-item__content > .el-cascader, .v-form .el-form-item__content > .el-date-editor, .v-form .el-form-item__content > .el-input, .el-form-item__content > .all-website{
    //     max-width: 600px;
    //   }
    .parkingPrice {
      .el-input-number--small {
        width: 60px;
      }
      .freeChecked {
        margin-left:30px;
      }
    }
    & .charge_free {
      .el-table {
        &::before {
          height: 0px;
        }
        .el-table__body-wrapper {
          & tr {
            td {
              border-bottom: none;
              padding-bottom:2px;
              padding-top:2px;
            }
            .cell{
              padding-left: 0px;
            }
          }
        }
        .line_32 {
          line-height: 32px;
          padding-left:5px;
          padding-right: 5px;
        }
        .inputNumber {
            width:100px;
          }
        .electric {
           display: flex;
           justify-content: center
        }
        .service {
           display: flex;
           justify-content: center
        }
        .time_during {
          width:200px;
          .el-range-separator {
            width:24px;
          }
        }
      }
    }
  }
</style>
