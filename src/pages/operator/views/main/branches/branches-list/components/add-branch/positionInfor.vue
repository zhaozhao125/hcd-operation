<template>
  <section id="charge-position-info">
    <div class="position-info">
      <el-amap
        :mapStyle='mapStyle'
        :zooms="[3,20]" :events="mapEvents" :amap-manager="amapManager"
        :zoom="10" :expandZoomRange="true">
        <el-amap-marker
          :icon="marker.icon"
          :position="marker.position"
          :events="marker.events"
          :visible="marker.visible"
          :draggable="marker.draggable"
          :plugin="plugin"
        ></el-amap-marker>
      </el-amap>
    </div>
  </section>
</template>
<script>
import { AMapManager } from 'vue-amap'
import { handlePolygonArr } from '@/utils/common' // 处理围栏数据
import mapConfig, { fenchColor } from '@/config/map-config'
let amapManager = new AMapManager()
export default {
  name: 'branch-list-position-info',
  watch: {
    location (val) {
      if (val.length) {
        this.marker.position = [Number(val[1]), Number(val[0])]
      }
    }
  },
  mounted() {
    this.renderLngLat = this.lnglat
    this.address = this.initaddress
  },
  data() {
    let self = this
    return {
      marker: {
        position: [113.670004, 34.764779],
        icon: './img/branch.png',
        events: {
          dragend: (e) => {
            // 删除其他的充电站点地图
            console.log('---event---: dragend')
            this.marker.position = [e.lnglat.lng, e.lnglat.lat]
          }
        },
        visible: true,
        draggable: true,
        template: '<span>1</span>',
      },
      plugin: [
        {
          pName: 'Scale'
        }
      ], // 比例尺插件
      amapManager,
      params: {
        address: '',
        lng: '',
        lat: ''
      },
      mapStyle: mapConfig.mapStyle[mapConfig.selectedStyle].url,
      poiResultLocation: [113.658075, 34.745793], // 初始位置
      renderLngLat: '',
      // 验证信息
      address: '',
      mapEvents: {
        // 初始化时加载
        init(map) {
          // if (self.location.length > 0) {
          //   self.marker.position = self.location
          // } else {
          // }
          AMap.event.addListener(map, 'zoomend', () => {
            self.zoomend = map.getZoom()

            // 如果有围栏数组
            // if (self.overlayGroup) {
            //   // 判断是否显示围栏
            //   if (map.getZoom() >= 14) {
            //     self.overlayGroup.show()
            //   } else {
            //     self.overlayGroup.hide()
            //   }
            // }
          })
        },
        click(event) {
          let { lng, lat } = event.lnglat
          self.renderLngLat = event.lnglat.L + ',' + event.lnglat.N
          self.marker.position = [lng, lat]

          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })

          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                let address = result.regeocode.formattedAddress
                self.address = address
                self.params = {
                  address: address,
                  lng: lng,
                  lat: lat
                }
                console.log(self.params)
                self.$emit('address', self.params)
                self.$nextTick()
              }
            }
          })
        }
      }
    }
  },

  computed: {
  },
  props: {
    formGeoInfoData: {
      type: Object,
      required: false
    },
    disNum: Number,
    lnglat: String,
    initaddress: String,
    location: {
      default: [],
      type: Array
    }
  }
}
</script>
<style lang="scss">
  #charge-position-info {
    .button-bolck {
      display: flex;
    }
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    // 地图
    .position-info {
      // margin: 20px 100px;
      height: 450px;
      width: 100%;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
    .amap-icon{
      img{
        width: 30px;
      }

    }
  }
</style>
