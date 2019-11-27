export default [
  {
    label: '基本信息',
    items: [
      {
        label: '运营商编号',
        value: 'id'
      },
      {
        label: '运营商名称',
        value: 'name'
      },
      {
        label: '联系人',
        value: 'contact'
      },
      {
        label: '联系电话',
        value: 'telephone'
      }
    ]
  },
  {
    label: '接口信息',
    items: [
      {
        label: '运营商标识',
        value: 'operatorId'
      },
      {
        label: '运营商密钥',
        value: 'operatorSecret'
      },
      {
        label: '消息密钥',
        value: 'dataSecret'
      },
      {
        label: '消息密钥初始化向量',
        value: 'dataSecretIV'
      },
      {
        label: '签名密钥',
        value: 'signSecret'
      },
      {
        label: '运营商接口调用地址',
        value: 'apiUrl'
      }
    ]
  },
  {
    label: '其他信息',
    items: [
      {
        label: '是否启用',
        value: 'enabled',
        type: 'slot',
        name: 'enabled'
      },
      // {
      //   label: '备注',
      //   value: 'carNumber'
      // },
      {
        label: '添加人',
        value: 'createBy'
      },
      {
        label: '添加时间',
        value: 'createdOn',
        type: 'slot',
        name: 'createdOn'
      },
      {
        label: '最后修改人',
        value: 'modifyBy'
      },
      {
        label: '最后修改时间',
        value: 'modifiedOn',
        type: 'slot',
        name: 'modifiedOn'
      }
    ]
  }
]
