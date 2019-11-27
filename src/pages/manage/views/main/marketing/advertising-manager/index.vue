<template>
  <div id="advertisingManager">
    <el-card class="table-box">
      <div slot="header">
        <v-search :searchSettings="searchSettings" @search="handleSearch" labelWidth="120px">
        </v-search>
      </div>
      <div class="table-operator">
        <el-button type="primary" size="small" @click="handleTemplate()">添加广告</el-button>
      </div>
      <div class="table-container">
        <el-table :data="tableData" height="100%">
          <el-table-column prop="title" label="广告名称" min-width="120px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="adType" label="广告类型" min-width="120px">
            <template slot-scope="scope">
              <div>
                <div>{{advType[scope.row.adType]}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sortVal" label="排序"></el-table-column>
          <el-table-column prop="created_on" label="时间信息" min-width="200px">
            <template slot-scope="scope">
              <div>
                <div>创建：{{scope.row.createTime}}</div>
                <div>开始：{{scope.row.startTime}}</div>
                <div>结束：{{scope.row.endTime}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="operatorName" label="最后操作人" min-width="120px"></el-table-column>
          <el-table-column prop="upStatus" label="状态" min-width="100">
            <template slot-scope="scope">
              <popSwitch v-model="scope.row.upStatus" trueText="确定要禁用该广告吗？" falseText="确定要启用该广告吗？" @confirm="handleConfirmSwitch(scope.row)" @cancel="handleCancelSwitch"></popSwitch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100px">
            <template slot-scope="scope">
              <el-button class="el-button--text" type="text" @click="handleTemplate(scope.row)">编辑</el-button>
              <el-popover :ref="'deletePop' + scope.$index" title="" width="270" trigger="click" placement="top">
                <el-button type="text" slot="reference">删除</el-button>
                <P style="line-height:25px">
                  <i class="el-icon-warning" style="color:red;margin-right:5px;"></i>确定删除该条广告？</p>
                <div style="text-align: right">
                  <el-button size="small" type="text" @click="handleCancel(scope.$index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteItem(scope.row.id, scope.$index)">删除</el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='table-page'>
        <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next" :total="pageTotal" @current-change="_handlePageChange">
        </el-pagination>
      </div>
    </el-card>
    <v-page :visible.sync="templateVisible">
      <h3 slot="title">{{templateTitle === 1 ? "添加广告" : "编辑广告"}}</h3>
      <v-form ref="form" slot="content" :formData="formData" :formSettings="formSettings" :labelWidth="labelWidth" @save="handleSaveTemplate" @handleTypeChange="handleTypeChange">
        <template slot="cities" slot-scope="scope">
          <el-select v-model="scope.model.cities" multiple placeholder="请选择">
            <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </v-form>
    </v-page>
  </div>
</template>
<script>
// import { resultSelectData } from '@/utils/common'
import popSwitch from '@/components/pop-switch'
import websiteSelect from '@/components/website-select'
import searchHistoryMixin from '@/mixins/search-history.js'
import paginationMixin from '@/mixins/pagination.js'
import { handleSubmitSearchData } from '@/utils/common.js'
import { handleDate } from '@/utils/date-filter'
export default {
  name: 'advertisingManager',
  components: {
    websiteSelect,
    popSwitch
  },
  mixins: [searchHistoryMixin, paginationMixin],
  data() {
    return {
      provinceList: [],
      labelWidth: '220px',
      tableData: [],
      formData: {},
      templateTitle: null,
      templateVisible: false,
      rowId: null,
      page: 1,
      advType: {
        'top': '首页顶部条广告'
      },
      searchSettings: [{
        label: '广告名称',
        type: 'text',
        name: 'title',
        visible: true
      }, {
        label: '广告类型',
        name: 'adType',
        type: 'select',
        visible: true,
        options: [{
          value: 'top',
          label: '首页顶部条广告'
        }]
      }, {
        label: '广告状态',
        type: 'select',
        name: 'upStatus',
        visible: false,
        options: [{
          value: true,
          label: '启用'
        }, {
          value: false,
          label: '禁用'
        }]
      }, {
        type: 'daterange',
        name: 'startTime',
        visible: false,
        label: '创建时间'
      }],
      formSettings: [{
        label: '',
        items: [{
          label: '广告标题',
          name: 'title',
          type: 'text',
          required: true
        }, {
          label: '广告类型',
          type: 'select',
          name: 'adType',
          options: [{
            value: 'top',
            label: '首页顶部条广告'
          }],
          events: {
            change: 'handleTypeChange'
          },
          required: true
        }, {
          label: '开始结束时间',
          name: 'time',
          type: 'daterange',
          required: true
          // 直接转成时间戳
          // unixTime: true
        }, {
          label: '广告图片',
          name: 'image',
          type: 'img',
          limit: 1,
          tip: '建议图片大小：1080*1642，图片大小不超过100K',
          required: true
        }, {
          label: '弹窗图片',
          name: 'pop_image',
          type: 'img',
          limit: 1,
          tip: '建议图片大小：1080*1642，图片大小不超过100K',
          required: true,
          hidden: true
        }, {
          label: '是否启用',
          name: 'upStatus',
          type: 'radio',
          options: [{
            label: '启用',
            value: true
          }, {
            label: '禁用',
            value: false
          }],
          required: true
        }, {
          label: '广告链接',
          name: 'adUrl',
          type: 'text'
        }, {
          label: '顺序',
          name: 'sortVal',
          type: 'number'
        }]
      }]
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  created() {
    this.loadTableData()
  },
  methods: {
    handleSearch(data) {
      let searchData = Object.assign({}, data)
      searchData = handleSubmitSearchData(searchData)
      if (searchData.startTime) {
        searchData.endTime = handleDate(searchData.startTime[1])
        searchData.startTime = handleDate(searchData.startTime[0])
      }
      searchData.upStatus = data.upStatus
      this.searchData = searchData
      this.loadTableData()
    },
    handleTemplate(data) {
      this.templateVisible = true
      if (data) {
        this.rowId = data.id
        if (!(data.image instanceof Array)) {
          data.image = [{
            name: data.image.split('/').pop(),
            url: data.image
          }]
        }
        if (data.pop_image && data.pop_image.length > 0) {
          if (!(data.pop_image instanceof Array)) {
            data.pop_image = [{
              name: data.pop_image.split('/').pop(),
              url: data.pop_image
            }]
          }
          this.formSettings[0].items.find(item => item.name == 'pop_image').hidden = false
          this.formSettings[0].items.find(item => item.name == 'pop_image').required = true
          this.formSettings[0].items.find(item => item.name == 'image').tip = '（建议图片大小：335*170，图片大小不超过100K）'
        } else {
          data.pop_image = []
          this.formSettings[0].items.find(item => item.name == 'pop_image').hidden = true
          this.formSettings[0].items.find(item => item.name == 'image').tip = '（建议图片大小：1080*1642，图片大小不超过100K）'
        }
        data.time = [
          data.startTime, data.endTime
        ]
        this.formData = data
      } else {
        this.formData = {}
      }
      if (!data) {
        this.templateTitle = 1
      } else {
        this.templateTitle = 2
      }
    },
    handleTypeChange(type) {
      if (type == 'top') {
        this.formSettings[0].items.find(item => item.name == 'pop_image').hidden = true
        this.formSettings[0].items.find(item => item.name == 'image').tip = '（建议图片大小：1080*1642，图片大小不超过100K）'
      }
      this.$refs.form.updateRule()
    },
    handleCities(cities) {
      let data = [];
      for (let idx in cities) {
        data.push({
          code: cities[idx],
          name: ''
        })
      }
      return data
    },
    decodeCities(cities) {
      let data = [];
      for (let idx in cities) {
        data.push(cities[idx]['code'])
      }
      return data
    },
    handleSaveTemplate(data) {
      let temObj = data
      temObj.startTime = handleDate(new Date(temObj.time[0]), 'day') + ' 00:00:00'
      temObj.endTime = handleDate(new Date(temObj.time[1]), 'day') + ' 23:59:59'
      // temObj.cities = this.handleCities(temObj.cities)
      temObj.image = temObj.image[0].url
      if (!temObj.sortVal) {
        temObj.sortVal = 0
      }
      if (this.templateTitle === 1) {
        this.$service.addAdvertising(temObj).then(res => {
          // console.log('====res====', res);
          this.templateVisible = false
          this.loadTableData()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      } else {
        let obj = temObj
        obj.id = this.rowId
        this.$service.editAdvertising(obj).then(res => {
          // console.log('====res====', res);
          this.templateVisible = false
          this.loadTableData()
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        })
      }
    },
    handleConfirmSwitch(data) {
      this.$service.switchAddStatus({ id: data.id }).then(res => {
        this.$message({
          message: data.upStatus ? '禁用成功' : '启用成功',
          type: 'success'
        })
        this.loadTableData()
      })
    },
    handleCancelSwitch() {},
    // 取消删除
    handleCancel(index) {
      this.$refs['deletePop' + index].doClose()
    },
    // 删除广告
    deleteItem(id, index) {
      let params = {
        id: id
      }
      this.$service.deleteAdvertising(params).then(res => {
        if (res.data.code == 0) {
          this.$message.success('删除广告成功')
          this.$refs['deletePop' + index].doClose()
          this.loadTableData()
        }
      }).catch(error => {
        console.log(error)
        this.$message.warning(error.msg ? error.msg : '删除广告失败')
        this.$refs['deletePop' + index].doClose()
      })
    },
    loadTableData() {
      this.pageSize = 20
      let params = { page: this.page, pageSize: this.pageSize, ...this.searchData }
      this.$service.getAdvertisingList(params).then(res => {
        if (res.data.code == 0 && res.data.data.totalElements > 0) {
          this.tableData = res.data.data.content
          this._changePageTotal(res.data.data.totalElements)
        } else {
          this.tableData = [];
          this._changePageTotal(0)
        }
      })
    }
  }
}

</script>
<style lang="scss">
.el-form-item__label {
  width: 100px;
}

</style>
