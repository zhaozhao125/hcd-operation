import commonService from '@/service/'
import order from './children/order/order.js'
import system from './children/system/system.js'
import user from './children/user/user.js'
import auth from './children/auth/auth.js'
import branches from './children/branches/branches.js'
import funds from './children/funds/index'
import customer from './children/customer/customer.js'
import charging from './children/charging/index.js'
import company from './children/company/'
import common from './children/common/common'
import chargingPile from './children/chargingPile'
import enterprise from './children/enterprise/index.js'
import marketing from './children/marketing'
export default {
  ...commonService,
  ...order,
  ...system,
  ...user,
  ...auth,
  ...branches,
  ...funds,
  ...customer,
  ...charging,
  ...company,
  ...common,
  ...chargingPile,
  ...enterprise,
  ...marketing
}
