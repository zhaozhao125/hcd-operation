export default [
  {
    label: '基本信息',
    items: [
      {
        label: '优惠券名称',
        name: 'name',
        type: 'text',
        required: true,
        placeholder: '请输入优惠券名称'
      },
      {
        label: '使用说明',
        name: 'detail',
        type: 'text',
        placeholder: '请输入使用说明'
      },
      {
        label: '类型',
        name: 'type',
        type: 'select',
        required: true,
        placeholder: '请选择',
        options: [
          {
            label: '金额',
            value: 1
          },
          {
            label: '折扣',
            value: 2
          }
        ],
        events: {
          change: 'typeChange'
        }
      },
      {
        label: '可抵扣金额',
        name: 'money',
        required: true,
        type: 'number',
        placeholder: '请输入可抵扣金额',
        describe: '元',
        hidden: true
      },
      {
        label: '最低消费金额',
        name: 'useMoneyCondition',
        type: 'number',
        placeholder: '请输入最低消费金额',
        describe: '元（0代表不限制）',
        value: 0,
        hidden: true
      },
      {
        label: '折扣',
        name: 'discount',
        required: true,
        type: 'number',
        placeholder: '请输入折扣',
        describe: '折（0-100，例如8折输入80）',
        hidden: true
      },
      {
        label: '最高可抵',
        name: 'useMoneyTop',
        type: 'number',
        placeholder: '请输入最高可抵',
        describe: '元（0代表不限制）',
        value: 0,
        hidden: true
      }
    ]
  },
  {
    label: '使用条件',
    items: [
      {
        label: '发行量',
        name: 'amount',
        type: 'number',
        placeholder: '请输入发行量',
        value: 0,
        describe: '张（0代表不限制）',
        step: 1
      },
      {
        label: '每人限额',
        name: 'userGainTimes',
        type: 'number',
        placeholder: '请输入每人限额',
        describe: '张（0代表不限制）',
        value: 0
      },
      {
        label: '发行有效期',
        name: 'publishTime',
        type: 'datetimerange',
        required: true,
        defaultTime: ['00:00:00', '23:59:59']
      },
      {
        label: '使用有效期',
        name: 'relativeTime',
        type: 'select',
        required: true,
        events: {
          change: 'useTypeChange'
        },
        placeholder: '请选择',
        options: [
          {
            label: '绝对时间',
            value: false
          },
          {
            label: '相对时间',
            value: true
          }
        ]
      },
      {
        label: '',
        name: 'absoluteTime',
        type: 'datetimerange',
        required: true,
        defineMessage: '请选择绝对时间',
        hidden: true,
        defaultTime: ['00:00:00', '23:59:59']
      },
      {
        label: '',
        name: 'relativeDayNum',
        type: 'number',
        required: true,
        describe: '天',
        defineMessage: '请选择相对时间',
        hidden: true
      },
      {
        label: '可用城市',
        name: 'cityId',
        type: 'city',
        placeholder: '请选择',
        multiple: true
      }
    ]
  }
]
