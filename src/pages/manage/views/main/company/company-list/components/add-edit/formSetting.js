export default [
  {
    label: '基本信息',
    items: [
      {
        label: '运营商名称',
        name: 'name',
        type: 'text',
        required: true,
        placeholder: '请输入运营商名称'
      },
      {
        label: '联系人',
        name: 'contact',
        type: 'text',
        required: true,
        placeholder: '请输入联系人'
      },
      {
        label: '联系人电话',
        name: 'telephone',
        type: 'text',
        required: true,
        placeholder: '请输入联系人电话'
      }
    ]
  },
  {
    label: '接口信息',
    items: [
      {
        label: '运营商标识',
        name: 'operatorId',
        type: 'text',
        required: true,
        placeholder: '请输入运营商标识'
      },
      {
        label: '运营商密钥',
        name: 'operatorSecret',
        type: 'text',
        required: true,
        placeholder: '请输入运营商密钥'
      },
      {
        label: '消息密钥',
        name: 'dataSecret',
        type: 'text',
        required: true,
        placeholder: '请输入消息密钥'
      },
      {
        label: '消息密钥初始化向量',
        name: 'dataSecretIV',
        type: 'text',
        required: true,
        placeholder: '请输入消息密钥初始化向量'
      },
      {
        label: '签名密钥',
        name: 'signSecret',
        type: 'text',
        required: true,
        placeholder: '请输入签名密钥'
      },
      {
        label: '运营商接口调用地址',
        name: 'apiUrl',
        type: 'text',
        required: true,
        placeholder: '请输入运营商接口调用地址'
      },
      {
        label: '运营商二维码正则表达式',
        name: 'qrCodeRegex',
        type: 'text',
        required: true,
        placeholder: '请输入运营商二维码正则表达式'
      }
    ]
  }
]
