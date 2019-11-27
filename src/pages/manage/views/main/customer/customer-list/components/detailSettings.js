export const detailSettings = [
  {
    label: '基本信息',
    items: [
      {
        label: '用户ID',
        name: 'userId',
        type: 'normal'
      },
      {
        label: '手机号',
        name: 'userPhone',
        type: 'normal'
      },
      {
        label: '状态',
        name: 'statusCode',
        type: 'slot'
      }
    ]
  },
  {
    label: '用户资金',
    items: [
      {
        label: '钱包余额',
        name: 'userMoney',
        type: 'normal'
      }
    ]
  },
  {
    label: '虚拟资产',
    items: [
      {
        label: '优惠券',
        name: 'virtualMoney',
        type: 'slot'
      }
    ]
  },
  {
    label: '身份补充信息',
    items: [
      {
        label: '微信昵称',
        name: 'wechatNickname',
        type: 'normal'
      },
      {
        label: '姓名',
        name: 'userName',
        type: 'slot'
      },
      {
        label: '所属企业',
        name: 'companyName',
        type: 'normal'
      }
    ]
  },
  {
    label: '用户行为信息',
    items: [
      {
        label: '注册时间',
        name: 'registerTime',
        type: 'slot'
      },
      {
        label: '注册城市',
        name: 'cityName',
        type: 'normal'
      },
      {
        label: '首次充值时间',
        name: 'rechargeFirstTime',
        type: 'slot'
      },
      {
        label: '首次下单时间',
        name: 'orderFirstTime',
        type: 'slot'
      },
      {
        label: '最后登录时间',
        name: 'lastLoginTime',
        type: 'slot'
      }
    ]
  }
]
