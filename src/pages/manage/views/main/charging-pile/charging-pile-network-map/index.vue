<template>

  <div class="car-dispatch"  element-loading-text="拼命加载中..."  :class="{'full-screen':isFullScreen}" v-loading="mapLoading"
  :element-loading-spinner="loadingConfig.loadingSpinner" :element-loading-background="loadingConfig.loadingBackground">
    <map-search  isCityName v-model="cityId"  @change='selectChange' :loading= 'timeLoading' :changeTime='changeTime' @refresh='get_data()'>
      <template slot="operation">
        <div class="type-select">
          <span class="type-name">运营商</span>
          <el-select v-model="operationId" placeholder="请选择" class="multi-select" clearable >
            <el-option v-for="item in operationList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </template>
       <template slot='fullScreen'>
        <el-button type="text" class="full-screen-button" @click="isFullScreen = !isFullScreen">{{isFullScreen?'退出全屏':'全屏展示'}}</el-button>
      </template>
     </map-search>

    <div class='map-content'>

        <transition name="el-zoom-in-center">
        <div class="map-detail" v-if='detailStation'>
          <div class="detail-heard">
            <div class="detail-close" @click="closeDetail">
              <i class="el-icon-close"></i>
            </div>
            <div class = "detail-station-infor">
              <div>
                <h3 style="colocr:#1d1d1d;padding-right:20px;" class = "station-name">
                  <div>
                  {{detailStation.stationName}}
                  </div>
                  </h3>
                 <span class="address">地址：{{detailStation.address}}</span>
                <div class="car-number">
                  <span>
                    <span @click="handleCarFree('carsAll')" style="color:#5dade2">
                      <i>全部</i>
                      <i> {{detailStation.equipments ? detailStation.equipments.length : 0}}</i>
                    </span>
                    &nbsp;|&nbsp;
                    <span @click="handleCarFree('IDLE')" class="leisure" style="color:#1CDF98">
                      <i> 空闲 </i>
                      <i>{{detailStation.IDLE ? detailStation.IDLE.length : 0}}</i>
                    </span>
                    &nbsp; |&nbsp;
                    <span @click="handleCarFree('USED_UNCHARGE')" class="already" style="color:#eec31b">
                      <i>占用未充电</i>
                      <i>{{detailStation.USED_UNCHARGE ? detailStation.USED_UNCHARGE.length : 0}}</i>
                    </span>
                    &nbsp; |&nbsp;
                    <span @click="handleCarFree('PARKING')" class="maintain" style="color:#f0862a">
                      <i> 待拔枪</i>
                      <i>{{detailStation.PARKING ? detailStation.PARKING.length : 0}}</i>
                    </span>
                     &nbsp; |&nbsp;
                    <span @click="handleCarFree('USED_CHARGING')" class="maintain" style="color:#1a81d0">
                      <i> 充电中</i>
                      <i>{{detailStation.USED_CHARGING ? detailStation.USED_CHARGING.length : 0}}</i>
                    </span>
                     &nbsp; |&nbsp;
                    <span @click="handleCarFree('ERROR')" class="maintain" style="color:#e40600">
                      <i> 故障</i>
                      <i>{{detailStation.ERROR ? detailStation.ERROR.length : 0}}</i>
                    </span>
                     &nbsp; |&nbsp;
                    <span @click="handleCarFree('OFFLINE')" class="maintain" style="color:#999999">
                      <i> 离线</i>
                      <i>{{detailStation.OFFLINE ? detailStation.OFFLINE.length : 0}}</i>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <el-collapse-transition>
            <div class="detail-content" :class="{'detail-padding':detailShow}">
              <div class="car-detail" v-for="(item,index) in carsArr" :key="index">
                <div style = "font-size: 14px">
                  <span> {{item.connectorId}}</span>
                  <i>&nbsp;</i>
                  <span :style="' color: '+item.color">{{typeChange(item.status).name}}</span>
                </div>
              </div>
              <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage" ref='elPagination' layout="prev, pager, next,total" :page-size="pageSize" :total="arrLength"> </el-pagination>
            </div>
          </el-collapse-transition>
        </div>

      </transition>
      <div class="website-status">
        <div class="status-item" :class="'status-item-'+index" v-for="(item,index) in handleStstus" :key="index" @click.stop="handleDataPacket(item.value)">
          <div>
            <span>
              <i :style="' color: '+item.color">{{item.num}}</i>
              <i>个</i>
            </span>
            <span>{{item.label}}</span>
          </div>
        </div>
      </div>
      <el-amap :zoom="10" :expandZoomRange="true" :zooms="[3,20]" :center="locationCenter" :events="mapEvents" :amap-manager="amapManager" :mapStyle='mapStyle ' :plugin="plugin"> </el-amap>
    </div>
  </div>
</template>
<script>
import mapSearch from '@/components/map/map-search'
import VueAMap from 'vue-amap'
import searchSelect from '@/components/website-select'
import mapConfig from '@/config/map-config'
import formSettings from './formSettings.js'
import loadingConfig from '@/config/loading'
import { refreshTime } from '@/utils/mass-point-map'

export default {
  name: 'car-dispatch',
  components: {
    searchSelect,
    mapSearch
  },
  mounted() {
    // console.log(this.$store.getters.firstCityId)
    // this.get_districtLists(this.$store.getters.firstCityId)
    this.allCompanyList()
  },
  watch: {
    activeTab(newTab) {
      if (newTab === 'pileWatch') {
        clearInterval(this.timingRefresh)
        this.get_data(true, true)
        this.getTimingRefresh()
        this.timeLoading = true
      } else {
        clearInterval(this.timingRefresh)
      }
    }
  },
  destroyed() {
    clearInterval(this.timingRefresh)
  },
  data() {
    let self = this
    return {
      operatorId: this.$store.state.user.operatorId,
      labelWidth: '130px',
      operationList: [],
      operationId: '',
      loadingConfig,
      formSettings,
      multipleValue: [],
      noRemote: false,
      mapLoading: false,
      websiteDetailLoading: false,
      isRefresh: false,
      ststus: [],
      formData: {},
      isFullScreen: false,
      timingRefresh: null,
      changeTime: null,
      selectStationRadio: 1,
      isSelectStation: true,
      arrLength: 0,
      carId: null,
      timeLoading: false,
      userSn: '',
      isRequest: false,
      isRequest2: false,
      repairList: [],
      materiaList: [],
      overLoadData: [], // 超载
      needCarData: [], // 缺车
      noProblemData: [], // 正常
      lossPowerData: [], // 亏电
      // 不同状态的充电桩数目
      OFFLINE_DATA: 0, // 离线
      IDLE_DATA: 0, // 空闲
      USED_UNCHARGE_DATA: 0, // 已插枪
      USED_CHARGING_DATA: 0, // 充电中
      USED_RESERVED_DATA: 0, // 占用-预约锁定
      PARKING_DATA: 0, // 待拔枪
      ERROR_DATA: 0, // 故障
      // 包含不同充电桩的充电站列表
      OFFLINE_LIST: [], // 离线
      IDLE_LIST: [], // 空闲
      USED_UNCHARGE_LIST: [], // 已插枪
      USED_CHARGING_LIST: [], // 充电中
      USED_RESERVED_LIST: [], // 占用-预约锁定
      PARKING_LIST: [], // 待拔枪
      ERROR_LIST: [], // 故障
      filterData: {
        carsAll: [], // 全部
        carsFree: [], // 空闲车
        appointment: [],
        maintain: []// 维护中
      },
      stationName: '',
      amapManager: new VueAMap.AMapManager(),
      plugin: [
        {
          pName: 'Scale'
        }
      ],
      orderShow: false,
      detailShow: false,
      currentPage: 1,
      pageSize: 8, // 页数
      detailStation: null,
      detailLoading: false,
      renderPersonData: [],
      carSn: '',
      isDesignatedPerson: true,
      polygon: null,
      markerList: null,
      type: null,
      stationId: null, // 网点Id
      locationCenter: [113.695624, 34.876356],
      cityId: 410100,
      newCarArr: [],
      carsArr: [],
      destinationStationName: '',
      mapStyle: mapConfig.mapStyle[mapConfig.selectedStyle].url,
      mapEvents: {
        init(map) {
          window.AMapUI.loadUI(['control/BasicControl'], BasicControl => {
            let zoomCtrl = new BasicControl.Zoom({
              position: {
                right: '10px',
                bottom: '10px'
              },
              showZoomNum: true
            })
            map.addControl(zoomCtrl)
          })
          console.log(1111)
          self.get_data(true, true)
        }
      },
      // 片区列表
      renderAreaList: [],
      // 片区id
      districtId: ''
    }
  },
  computed: {
    executorUserSn() {
      return this.formSettings[0].items.find(item => item.name === 'executorUserSn')
    },
    activeTab() {
      return this.$store.getters.activeTab.name
    },
    handleStstus() {
      return [{
        label: '空闲',
        value: 'IDLE',
        num: this.IDLE_DATA,
        // color: '#1bc4ee'
        color: '#1CDF98'
      }, {
        label: '占用未充电',
        value: 'USED_UNCHARGE',
        num: this.USED_UNCHARGE_DATA,
        color: '#eec31b'
      }, {
        label: '待拔枪',
        value: 'PARKING',
        num: this.PARKING_DATA,
        color: '#f0862a'
      }, {
        label: '充电中',
        value: 'USED_CHARGING',
        num: this.USED_CHARGING_DATA,
        color: '#1a81d0'
      },
      {
        label: '故障',
        value: 'ERROR',
        num: this.ERROR_DATA,
        color: '#e40600'
      }, {
        label: '离线',
        value: 'OFFLINE',
        num: this.OFFLINE_DATA,
        color: '#999999'
      }]
    }

  },
  methods: {
    handleSearch () {

    },
    allCompanyList () {
      this.$service.allCompanyList().then((res) => {
        this.operationList = res.data.data.map((ele) => {
          return {
            label: ele.name,
            value: ele.operatorId
          }
        })
      })
    },
    typeChange (val) {
      switch (val) {
        case 'IDLE':
          return {
            name: '空闲',
            // color: '#1bc4ee'
            color: '#1CDF98'
          }
        case 'USED_UNCHARGE':
          return {
            name: '占用未充电',
            color: '#eec31b'
          }
        case 'PARKING':
          return {
            name: '待拔枪',
            color: '#f0862a'
          }
        case 'USED_CHARGING':
          return {
            name: '充电中',
            color: '#1a81d0'
          }
        case 'ERROR':
          return {
            name: '故障',
            color: '#e40600'
          }
        case 'OFFLINE':
          return {
            name: '离线',
            color: '#999999'
          }
      }
    },
    focusChange() {
      this.isRequest = true
    },
    focusChange2() {
      this.isRequest2 = true
    },
    getIsRemote() {
      this.isRemote = true
    },
    selectChange(cityId) {
      this.districtId = ''
    },
    closeDetail() {
      this.type = null
      this.detailStation = null
      this.orderShow = false
    },
    getTimingRefresh() {
      this.timingRefresh = setInterval(() => {
        this.get_data(false, true)
      }, refreshTime)
    },
    handleDataPacket(type) {
      console.log(this.USED_UNCHARGE_DATA)
      this.detailStation = null
      this.detailShow = false
      this.markerList.clearData()
      switch (type) {
        case 'IDLE':
          this.handRender(this.IDLE_LIST)
          break
        case 'USED_UNCHARGE':
          this.handRender(this.USED_UNCHARGE_LIST)
          break
        case 'PARKING':
          this.handRender(this.PARKING_LIST)
          break
        case 'USED_CHARGING':
          this.handRender(this.USED_CHARGING_LIST)
          break
        case 'ERROR':
          this.handRender(this.ERROR_LIST)
          break
        case 'OFFLINE':
          this.handRender(this.OFFLINE_LIST)
          break
      }
    },
    handRender(arr) {
      arr.forEach((ele) => {
        ele.lngLatArr = [ele.lng, ele.lat]
      })
      this.markerList.render(arr)
    },
    handleCarFree(type) {
      this.currentPage = 1
      this.carsArr = []
      this.newCarArr = []
      let arr
      if (type === 'carsAll') {
        arr = this.detailStation.equipments
      } else if (type === 'OFFLINE') {
        arr = this.detailStation.OFFLINE
      } else if (type === 'IDLE') {
        arr = this.detailStation.IDLE
      } else if (type === 'USED_UNCHARGE') {
        arr = this.detailStation.USED_UNCHARGE
      } else if (type === 'USED_CHARGING') {
        arr = this.detailStation.USED_CHARGING
      } else if (type === 'USED_RESERVED') {
        arr = this.detailStation.USED_RESERVED
      } else if (type === 'PARKING') {
        arr = this.detailStation.PARKING
      } else if (type === 'ERROR') {
        arr = this.detailStation.ERROR
      }
      this.handlePageArr(arr)
    },
    handleCurrentChange(index) {
      this.carsArr = this.newCarArr[index - 1]
    },
    handleChargeNum(fast, slow) {
      if (isNaN(fast) && isNaN(fast)) {
        return '未知'
      }
      if (!fast && slow) {
        fast = 0
      } else if (!slow && fast) {
        slow = 0
      } else if (!fast & !slow) {
        fast = 0
        slow = 0
      }
      return fast + slow
    },
    get_data(isNew, otherTabRefresh) {
      clearInterval(this.timingRefresh)
      this.getTimingRefresh()
      this.resetStatus()
      this.timeLoading = true
      this.mapLoading = true
      let map = this.amapManager.getMap()
      if (this.markerList) {
        map.clearMap()
      }
      this.getDispatchList().then(data => {
        this.mapLoading = false // 地图loading
        this.timeLoading = false
        let renderData = data
        renderData.forEach((item, index) => {
          item.lngLatArr = [item.lng, item.lat]
        })
        if (isNew && this.markerList) {
          if (!otherTabRefresh) {
            this.detailStation = null
            this.orderShow = false
            this.isRefresh = false
          } else {
            // 如果有详情 刷新
            if (this.detailStation) {
              // 重置状态
              this.resetStatus()
              this.getDispatchDetail(this.carId)
            }
          }
          this.markerList.off('selectedChanged')
          this.markerList.clearData()
          this.markerList.render(renderData)
          return
        }
        this.getMapUI(renderData)
        this.closeDetail()
      }).catch(() => {
        clearInterval(this.timingRefresh)
      })
    },
    getDispatchList() {
      let params = null
      if (this.operationId) {
        params = {
          cityId: this.cityId,
          operatorId: this.operationId
        }
      } else {
        params = {
          cityId: this.cityId
        }
      }
      return new Promise((resolve, reject) => {
        this.$service.getDispatchList(params).then(res => {
          if (res.data.code === '0') {
            this.changeTime = Math.random()
            if (!res.data.data.stations.length) {
              this.$message.warning('该城市下暂无网点')
            }
            let arr = []
            // 过滤数据
            let data = res.data.data.stations
            data.forEach((ele) => {
              ele.type = 'all'
            })
            let pile_type_list = data.map((ele) => {
              return ele
            })

            let pile_type_length = pile_type_list.map((ele) => {
              let OFFLINE = ele.equipments.filter(item => item.status === 'OFFLINE')
              let IDLE = ele.equipments.filter(item => item.status === 'IDLE')
              let USED_UNCHARGE = ele.equipments.filter(item => item.status === 'USED_UNCHARGE')
              let USED_CHARGING = ele.equipments.filter(item => item.status === 'USED_CHARGING')
              let USED_RESERVED = ele.equipments.filter(item => item.status === 'USED_RESERVED')
              let PARKING = ele.equipments.filter(item => item.status === 'PARKING')
              let ERROR = ele.equipments.filter(item => item.status === 'ERROR')
              return {
                OFFLINE: OFFLINE.length,
                IDLE: IDLE.length,
                USED_UNCHARGE: USED_UNCHARGE.length,
                USED_CHARGING: USED_CHARGING.length,
                USED_RESERVED: USED_RESERVED.length,
                PARKING: PARKING.length,
                ERROR: ERROR.length,
                id: ele.id
              }
            })
            pile_type_length.forEach((ele) => {
              this.OFFLINE_DATA += ele.OFFLINE
              this.IDLE_DATA += ele.IDLE
              this.USED_UNCHARGE_DATA += ele.USED_UNCHARGE
              this.USED_CHARGING_DATA += ele.USED_CHARGING
              this.USED_RESERVED_DATA += ele.USED_RESERVED
              this.PARKING_DATA += ele.PARKING
              this.ERROR_DATA += ele.ERROR
              if (ele.OFFLINE != 0) {
                let OFFLINE = Object.assign({}, pile_type_list.filter(item => item.id == ele.id)[0])

                OFFLINE.type = 'OFFLINE'
                this.OFFLINE_LIST.push(OFFLINE)
              }
              if (ele.IDLE != 0) {
                let IDLE = Object.assign({}, pile_type_list.filter(item => item.id == ele.id)[0])
                IDLE.type = 'IDLE'

                this.IDLE_LIST.push(IDLE)
              }
              if (ele.USED_UNCHARGE != 0) {
                let USED_UNCHARGE = Object.assign({}, pile_type_list.filter(item => item.id == ele.id)[0])
                USED_UNCHARGE.type = 'USED_UNCHARGE'
                this.USED_UNCHARGE_LIST.push(USED_UNCHARGE)
              }
              if (ele.USED_CHARGING != 0) {
                let USED_CHARGING = Object.assign({}, pile_type_list.filter(item => item.id == ele.id)[0])
                USED_CHARGING.type = 'USED_CHARGING'
                this.USED_CHARGING_LIST.push(USED_CHARGING)
              }
              if (ele.USED_RESERVED != 0) {
                let USED_RESERVED = Object.assign({}, pile_type_list.filter(item => item.id == ele.id)[0])
                USED_RESERVED.type = 'USED_RESERVED'
                this.USED_RESERVED_LIST.push(USED_RESERVED)
              }
              if (ele.PARKING != 0) {
                let PARKING = Object.assign({}, pile_type_list.filter(item => item.id == ele.id)[0])
                if (PARKING) {
                  PARKING.type = 'PARKING'
                  this.PARKING_LIST.push(PARKING)
                }
              }
              if (ele.ERROR != 0) {
                let ERROR = Object.assign({}, pile_type_list.filter(item => item.id == ele.id)[0])
                ERROR.type = 'ERROR'
                this.ERROR_LIST.push(ERROR)
              }
            })

            resolve(data)
          }
        })
      })
    },
    // 实例化地图
    getMapUI(mapData) {
      // this.iconStyle()
      let map = this.amapManager.getMap()
      window.AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'], (MarkerList, SimpleMarker, SimpleInfoWindow) => {
        this.markerList = new MarkerList({
          map: map,
          getPosition: dataItem => {
            return dataItem.lngLatArr
          },
          markerEvents: ['click', 'mouseover', 'mouseout'],
          // 关闭弹出框
          onSelected: null,
          autoSetFitView: false,
          getMarker: (dataItem, context, recycledMarker) => {
            // 返回一个新的Marker
            let longText = dataItem.equipments.length >= 10
            return new SimpleMarker({
              iconStyle: {
                src: this.handleIconStyle(dataItem.type
                ),
                style: {
                  backgroundSize: '100%, 100%',
                  width: '30px'
                }
              },
              iconLabel: {
                innerHTML: `<div class="map-icon">
                <h3 >
                ${dataItem.type === 'all' ? dataItem.equipments.length : ''}
                ${dataItem.type === 'USED_CHARGING' ? dataItem.status.USED_CHARGING : ''}
                ${dataItem.type === 'ERROR' ? dataItem.status.ERROR : ''}
                ${dataItem.type === 'IDLE' ? dataItem.status.IDLE : ''}
                ${dataItem.type === 'OFFLINE' ? dataItem.status.OFFLINE : ''}
                ${dataItem.type === 'USED_UNCHARGE' ? dataItem.status.USED_UNCHARGE : ''}
                ${dataItem.type === 'PARKING' ? dataItem.status.PARKING : ''}
                
                </h3>
              
                </div>`, // 设置文字内容
                style: {
                  color: '#fff',
                  top: dataItem.hasCharging ? '0px' : '0px',
                  fontSize: longText ? '10px' : '12px',
                  textShadow: dataItem.stationStatus === 'loss_power' ? '#FF9800 0px 0px 5px' : ''
                }
              },
              iconTheme: 'fresh',
              showPositionPoint: false,
              offset: dataItem.stationStatus === 'person' ? new window.AMap.Pixel(-15, -32) : new window.AMap.Pixel(-26, -55)
            })
          }
        })
        this.markerList.render(mapData)
        this.selectedChanged()
      })
    },
    selectedChanged() {
      this.markerList.on('markerClick', (event, info) => {
        if (event.type === 'markerClick' && info.data) {
          this.websiteDetailLoading = true
          let detailData = info.data
          this.orderShow = false
          this.carId = detailData.id
          this.detailStation = info.data
          this.detailStation.OFFLINE = this.detailStation.equipments.filter(item => item.status === 'OFFLINE')
          this.detailStation.IDLE = this.detailStation.equipments.filter(item => item.status === 'IDLE')
          this.detailStation.USED_UNCHARGE = this.detailStation.equipments.filter(item => item.status === 'USED_UNCHARGE')
          this.detailStation.USED_CHARGING = this.detailStation.equipments.filter(item => item.status === 'USED_CHARGING')
          this.detailStation.USED_RESERVED = this.detailStation.equipments.filter(item => item.status === 'USED_RESERVED')
          this.detailStation.PARKING = this.detailStation.equipments.filter(item => item.status === 'PARKING')
          this.detailStation.ERROR = this.detailStation.equipments.filter(item => item.status === 'ERROR')
          this.carsArr = this.detailStation.equipments
          this.carsArr.forEach((ele) => {
            switch (ele.status) {
              case 'IDLE':
                // ele.color = '#1bc4ee'
                ele.color = '#1CDF98'
                break
              case 'USED_UNCHARGE':
                ele.color = '#eec31b'
                break
              case 'PARKING':
                ele.color = '#f0862a'
                break
              case 'USED_CHARGING':
                ele.color = '#1a81d0'
                break
              case 'ERROR':
                ele.color = '#e40600'
                break
              case 'OFFLINE':
                ele.color = '#999999'
                break
              case 'USED_RESERVED':
                ele.color = '#999999'
                break
            }
          })
          console.log(this.detailStation.equipments)
          console.log(this.detailStation)
          this.handlePageArr(this.detailStation.equipments)
        }
      })
      // 取消选中的行为
      this.markerList.clearSelected()
    },
    resetStatus(ststus) {
      this.currentPage = 1
      this.carsArr = []
      this.newCarArr = []
      this.detailShow = true
      this.detailLoading = true
      this.OFFLINE_DATA = 0, // 离线
      this.IDLE_DATA = 0, // 空闲
      this.USED_UNCHARGE_DATA = 0, // 已插枪
      this.USED_CHARGING_DATA = 0, // 充电中
      this.USED_RESERVED_DATA = 0, // 占用-预约锁定
      this.PARKING_DATA = 0, // 待拔枪
      this.ERROR_DATA = 0, // 故障
      // 包含不同充电桩的充电站列表
      this.OFFLINE_LIST = [], // 离线
      this.IDLE_LIST = [], // 空闲
      this.USED_UNCHARGE_LIST = [], // 已插枪
      this.USED_CHARGING_LIST = [], // 充电中
      this.USED_RESERVED_LIST = [], // 占用-预约锁定
      this.PARKING_LIST = [], // 待拔枪
      this.ERROR_LIST = [] // 故障
    },
    getDispatchDetail(carId) {
      this.$service.getDispatchDetail({ id: carId }).then(res => {
        this.detailLoading = false
        if (res.data.code === '0') {
          this.websiteDetailLoading = false
          this.detailStation = res.data.data
        }
      }).catch(err => {
        this.$message.error('网点详情加载失败,请重新点击')
      })
    },
    handlePageArr(arr) {
      this.carsArr = []
      this.newCarArr = []
      console.log(arr)
      this.arrLength = arr.length
      if (arr.length) {
        for (let i = 0; i < arr.length; i += this.pageSize) {
          this.newCarArr.push(arr.slice(i, i + this.pageSize))
        }
        console.log(this.newCarArr)
        this.carsArr = this.newCarArr[0]
      } else {
        this.carsArr = []
      }
    },
    handleIconStyle(type) {
      switch (type) {
        case 'OFFLINE' :
          return './img/OFFLINE.png'
          // return './img/branch.png'
        case 'IDLE' :
          // return './img/IDLE.png'
          return './img/hcd_station.png'
        case 'USED_UNCHARGE' :
          return './img/USED_RESERVED.png'
        case 'USED_CHARGING' :
          return './img/USED_CHARGING.png'
        // case 'USED_RESERVED' :
        //   return './img/USED_RESERVED.png'
        case 'PARKING' :
          return './img/PARKING.png'
        case 'ERROR' :
          return './img/error.png'
        case 'all':
          // return './img/hcd_station.png'
          return './img/IDLE.png'
      }
    }

  }
}
</script>
<style lang='scss'>
.el-notification.left {
  left: 86px;
}
.el-select-dropdown {
  width: 218px !important;
}

.car-dispatch {
  .amap-simple-marker-icon {
    height: 56px;
    // background: #787878;
    border-radius: 50%;
   }
  .person-detail {
    position: relative;
    max-width: 450px;
    border-radius: 10px;
    border: 1px solid #ebeef5;
    z-index: 100;
    background-color: #fff;
    color: #303133;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    padding: 10px 12px;
    line-height: 28px;
    display: flex;
    white-space: nowrap;
    flex-direction: column;
    // }
    & .arrow {
      position: absolute;
      left: 50%;
      bottom: -15%;
      transform: translate(-50%, 0%);
      width: 0px;
      height: 0px;
      border: 10px solid transparent;
      border-top: 10px solid #fff;
    }
  }
  .full-screen-button {
    margin-left: 15px;
  }

  .search-content {
    overflow: hidden;
    div {
      display: flex
    }
    .city {
      .search-select {
        width: 180px !important;
      }
      .type-select {
          .multi-select {
           width: 250px !important;
         }
      }
    }
  }
  .website-status {
    z-index: 97;
    user-select: none;
    position: absolute;
    top: $map-ststus-top;
    right: $map-ststus-right;
    .status-item {
      cursor: pointer;
      height: 70px;
      width: 160px;
      border-left: 0;
      background: #ffffff;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2); // box-shadow: 2px 0px 10px #888888;
      display: flex;
      margin-bottom: 10px;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 20px;
        padding-top: 20px;
        padding-bottom: 10px;
        span {
          i {
            color: #787878;
            font-size: 12px; // 把斜体扶正
            font-style: normal;
            &:first-child {
              font-size: 32px;
            }
          }
          &:last-child {
            padding-left: 0px;
            font-size: 15px;
          }
        }
      }

      &.status-item-0 {
        &::before {
          background: rgb(28, 223, 152);
        }
      }
      &.status-item-1 {
        &::before {
          background: rgb(238, 195, 27);
        }
      }
      &.status-item-2 {
        &::before {
          // f8cf00
          background: rgb(240, 134, 42);
        }
      }
      &.status-item-3 {
        &::before {
          // f8cf00
          background: rgb(26, 129, 208);
        }
      }
     &.status-item-4 {
        &::before {
          // f8cf00
          background: rgb(228, 6, 0);
        }
      }
      &.status-item-5 {
        &::before {
          // f8cf00
          background: rgb(153, 153, 153);
        }
      }
      &::before {
        content: '';
        display: block;
        width: 8px;
        margin-top: -0.8px;
        height: 72px;
        overflow: hidden;
        background: #aaaaaa;
      }
    }
  }
  .map-icon {
    display: flex;
    justify-content: center;
    position: relative;
    top: 3px;
    left: -1px;
    .bai_bu_ting {
      position: absolute;
      width: 10px;
      height: 10px;
      left: 6px;
      top:-11px;
      color: #fff;
      font-size: 12px;
      // -webkit-transform-origin-x: 0;
      transform: scale(0.60);
      text-shadow: none;
    }
  }
  i {
    font-style: normal;
    // cursor: pointer;
  }
  .leisure {
    color: $status-leisure;
  }
  .already {
    color: $status-already;
  }
  .maintain {
    color: $status-maintain;
  }
  .select-station-radio {
    margin-top: 8px;
    display: flex;
  }
  .el-icon-close {
    position: relative;
    left: 4px;
    top: -1px;
    cursor: pointer;
    color: #b2b9c9;
    font-size: 16px;
  }
  .map-content {
    .map-detail-loading {
      color: #787878;
      padding: 5px 10px;
      max-width: 435px;
      max-height: 900px;
      overflow-y: auto;
      line-height: 28px;
      z-index: 99;
      position: absolute;
      top: $map-ststus-top;
      left: $map-ststus-right;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      background-color: #fff;
    }
    .map-detail {
      max-width: 435px;
      max-height: 900px;
      overflow-y: auto;
      line-height: 28px;
      z-index: 99;
      position: absolute;
      top: $map-ststus-top;
      left: $map-ststus-right;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: all 0.2s;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      .el-pagination {
        margin-top: 15px;
        margin-bottom: 15px;
      }
      .detail-heard {
        position: relative;
        .detail-close {
          display: flex;
          position: absolute;
          right: 2px;
          z-index: 99;
          // top: -5px;
        }
        .detail-station-infor {
           .station-name {
              display: flex;
              .baibuting {
                min-width: 60px;
                max-width: 60px;
                img {
                  width:80%;
                  margin-top:4px;
                }
              }
           }
        }
        div {
          padding: 15px;
          display: flex;
          justify-content: space-between;
          // align-items: center;
          div {
            padding: 0;
            display: flex;
            flex-direction: column;
            position: relative;
            .address {
              color: #9c9c9c;
            }
            .car-number {
              display: flex;
              cursor: pointer;
              color: #bdbdbd;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
          }
        }
        & .person-detail {
          white-space: nowrap;
          display: flex;
          flex-direction: column;
        }
      }
      .detail-content {
        padding: 15px;
        padding-top: 0;
        transition: all 0.2s;
        .car-field {
          display: flex;
        }
        .mt-5{
          margin-top: 8px;
        }
        .car-detail {
          display: flex;
          line-height: 26px;
          align-items: center;
          justify-content: space-between;
          // font-size: 13px;
          .color-blue {
            // color:  #96c840;
          }
        }
      }
      .detail-padding {
        padding-bottom: 0;
      }
    }
    .creat-order {
      max-width: 408px;
      max-height: 720px;
      padding-right: 16px;
      overflow-y: auto;
      z-index: 100;
      position: absolute;
      top: $map-ststus-top;
      right: $map-ststus-right;
      background: #ffffff;
      transition: all 0.2s;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      form {
        .section-content {
          .el-form-item:nth-child(3) {
            .el-radio {
              margin-right: 30px;
              line-height: 2;
              margin-left: 0px;
            }
          }
        }
      }
    }
    .charge-status {
      z-index: 99;
      position: absolute;
      top: $map-ststus-top;
      right: $map-ststus-right;
      li {
        font-size: 20px;
        display: flex;
        align-items: center;
        span {
          line-height: 30px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: red;
        }
      }
    }
  }
}
//全屏
.full-screen {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999;
}
</style>
