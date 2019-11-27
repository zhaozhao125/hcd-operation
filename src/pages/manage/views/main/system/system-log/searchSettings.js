export default [
  {
    label: '操作账号',
    name: 'operatorName',
    type: 'autocomplete',
    placeholder: '用户名',
    visible: true,
    data: []
  },
  {
    label: '时间范围',
    name: 'daterange',
    type: 'daterange',
    visible: true,
    return: {
      name: {
        dateStart: 'startTime',
        dateEnd: 'endTime'
      },
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    label: '模块选择',
    name: 'opeModelType',
    type: 'select',
    options: [
      { label: '登录', value: 'login' },
      // { label: '退出登录', value: 'login_exist' },
      { label: '用户管理', value: 'user_model' },
      { label: '站点管理', value: 'station_model' },
      { label: '充电桩管理', value: 'charge_model' },
      { label: '订单管理', value: 'order_model' },
      { label: '政企管理', value: 'company_model' },
      { label: '运营商管理', value: 'operator_model' },
      { label: '运营商账户管理', value: 'operator_account_model' },
      { label: '财务', value: 'finance_model' },
      { label: '优惠券管理', value: 'coupon_model' },
      { label: '活动管理', value: 'activity_model' },
      { label: '广告管理', value: 'advertising_model' },
      { label: '管理员列表', value: 'admin_user_model' },
      { label: '角色管理', value: 'admin_role_model' },
      { label: '其他', value: 'other' }]
  }
]
