import commonService from '@/service/'
import order from './children/order/order.js'
import branches from './children/branches/branches.js'
import common from './children/common/common'
import chargingPile from './children/chargingPile'
import user from './children/user/user'
import funds from './children/funds'
import home from './children/home'
export default {
  ...commonService,
  ...order,
  ...branches,
  ...common,
  ...chargingPile,
  ...user,
  ...funds,
  ...home
}
