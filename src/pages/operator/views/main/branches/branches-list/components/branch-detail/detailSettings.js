export const detailSettings = [
  {
    label: '基本信息',
    items: [
      {
        name: '站点名称',
        fieldName: 'stationName'
      },
      {
        name: '运营商',
        fieldName: 'operatorName'
      },
      {
        name: '城市',
        fieldName: 'cityName'
      },
      {
        name: '站点图片',
        fieldName: 'imageArray',
        type: 'img'
      }
    ]
  },
  {
    label: '营业信息',
    items: [
      {
        name: '站点类型',
        fieldName: 'stationTypeName'
      },
      {
        name: '营业时间',
        fieldName: 'openTime'
      },
      {
        name: '服务电话',
        fieldName: 'telephone'
      },
      {
        name: '充电费用',
        fieldName: 'prices_txt',
        type: 'slot'
      },
      {
        name: '站位费',
        fieldName: 'parkingPrice',
        type: 'slot',
        autoHide: true
      },
      {
        name: '充电桩',
        fieldName: 'charge_pile_num',
        type: 'slot'
      }
    ]
  },
  {
    label: '地理信息',
    items: [
      {
        name: '经纬度',
        fieldName: 'lat_lng',
        type: 'slot'
      },
      {
        name: '地址',
        fieldName: 'address'
      },
      {
        name: '',
        fieldName: 'latlngarr',
        type: 'slot',
        hideColon: true
      }
    ]
  },
  {
    label: '其他信息',
    items: [
      {
        name: '是否启用站点',
        fieldName: 'enabled',
        type: 'slot'
      },
      {
        name: '充电站描述',
        fieldName: 'stationIntro'
      }
    ]
  }
]
