<template>
  <div id="station-details">
    <v-page :visible.sync="visible" :before-close="handleBeforeClose">
      <div class="page-header-container" slot="title">
        <h3>站点详情</h3>
      </div>
      <div class="detail-content" slot="content" v-if="detailData">
        <detail-basic :detailSettings='detailSettings' :detailData="detailData" :formData="detailData"
                      ref="vDetail">
          <template slot-scope="slot" slot="prices_txt">
            <el-row v-for="(ele, index) in detailData.prices" :key='index' class="charge_fee_list"
                    style="margin-right: 260px">
              <el-col :span="20">
                <div>{{ele.startTime}} - {{ele.endTime}}
                  电费{{ele.elecPrice}}元/度，服务费{{ele.servicePrice}}元/度
                </div>
              </el-col>
            </el-row>
          </template>
          <template slot-scope="slot" slot="charge_pile_num">
            快充{{detailData.fastPileNum}}，慢充{{detailData.slowPileNum}}
          </template>
          <template slot-scope="slot" slot="lat_lng">
            {{detailData.lat}}, {{detailData.lng}}
          </template>
          <template slot-scope="slot" slot="parkingPrice">
            {{detailData.parkingPrice ? detailData.parkingPrice : 0}}元/小时
          </template>
          <template slot-scope="slot" slot="enabled">
            {{detailData.enabled ? '是' : '否'}}
          </template>
          <template slot="latlngarr">
            <div class="geo-info" style="height:400px; max-width: 800px">
              <el-amap vid="amapDemo" :center="center" :zoom="zoom" :mapStyle='mapStyle'>
                <el-amap-marker :icon="markerIcon" :position="markerPosition"></el-amap-marker>
              </el-amap>
            </div>
          </template>
        </detail-basic>
        <!-- <layout-detail :detailData = "detailData" :detailSettings = "detailSettings">
          <template slot-scope="scope" slot="charge">
              <span>充电</span>
          </template>
        </layout-detail> -->
      </div>
    </v-page>
  </div>
</template>
<script>
import { detailSettings } from './detailSettings.js'
import detailBasic from '@/components/detail/vDetail'
import mapConfig from '@/config/map-config'
import VueAMap from 'vue-amap'

let amapManager = new VueAMap.AMapManager()
// let amapManager = new AMapManager();
export default {
  name: 'branch-details',
  components: {
    detailBasic,
    // siteMap
  },
  props: {
    id: {
      type: Number
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    let self = this
    return {
      detailSettings: detailSettings,
      zoom: 15,
      center: ['113.619485', '34.731316'],
      markerPosition: ['113.619485', '34.731316'],
      markerIcon: './img/branch.png',
      detailData: {},
      // markers: [
      //   {
      //     position: self.detailData.location,
      //     icon:'./static/img/charging.png',
      //     events: {
      //       dragend: (e) => {
      //         this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
      //       }
      //     },
      //     visible: true,
      //     draggable: false,
      //     template: '<span>1</span>',
      //   }
      // ],
      // renderMarker: {
      //   position: self.detailData.location,
      //   contentRender: (h, instance) => {
      //     return h(
      //       'div',
      //       {
      //         style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
      //         on: {
      //           click: () => {
      //             const position = this.renderMarker.position;
      //             this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
      //           }
      //         }
      //       },
      //       ['marker inner text']
      //     )
      //   }
      // },
      // componentMarker: {
      //   position: self.detailData.location,
      //   contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#CCC'}, props: {text: self.detailData.stationName}}, ['xxxxxxx'])
      // },
      // slotMarker: {
      //   position: self.detailData.location
      // },
      amapManager,
      mapStyle: mapConfig.mapStyle[mapConfig.selectedStyle].url,
      plugin: [{ pName: 'Scale' }],
      mapEvents: {
        // 初始化时加载
        init(map) {
          AMap.event.addListener(map, 'zoomend', () => {
            self.zoomend = map.getZoom()
            // 如果有围栏数组
            if (self.overlayGroup) {
              // 判断是否显示围栏
              if (map.getZoom() >= 14) {
                self.overlayGroup.show()
              } else {
                self.overlayGroup.hide()
              }
            }
          })
          // self.getWebsiteInfo(map)
          AMapUI.loadUI(['control/BasicControl'], BasicControl => {
            let zoomCtrl = new BasicControl.Zoom({
              position: {
                right: '10px',
                bottom: '10px'
              },
              showZoomNum: true
            })
            map.addControl(zoomCtrl)
          })
        }
      }
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) {
        this.getDetails()
      }
    }
  },
  methods: {
    getDetails() {
      if (this.id) {
        this.$service.branchInfor({ id: this.id }).then(res => {
          this.detailData = res.data.data
          this.detailData.location = ['34.731316', '113.619485']
          this.center = [this.detailData.lng, this.detailData.lat]
          this.markerPosition = [this.detailData.lng, this.detailData.lat]
        })
      }
    },
    handleBeforeClose() {
      this.$emit('closePage')
      this.$emit('update:visible', false)
      return false
    }
  }
}
</script>
<style lang="scss">
  #station-details {
    .charge_fee_list {
      // margin-left:0 !important;
      // margin-right:0 !important;

      margin-left: 60px !important;
      .el-col {
        padding-left: 0px !important;
      }
    }
    .geo-info {
      img {
        width: 30px;
      }
    }
  }
</style>
