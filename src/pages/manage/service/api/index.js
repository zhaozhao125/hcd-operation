import user from './user/user.js'
import auth from './system/auth.js'
import branches from './branches/branches'
import order from './order/order'
import system from './system/system'
import funds from './funds/funds.js'
import invoice from './funds/invoice'
import customer from './customer/customer.js'
import charging from './charging/index.js'
import company from './company/'
import common from './common/common'
import chargingPile from './chargingPile'
import enterprise from './enterprise/'
import marketing from './marketing'
let api = {
  ...user,
  ...auth,
  ...branches,
  ...order,
  ...system,
  ...funds,
  ...customer,
  ...charging,
  ...company,
  ...common,
  ...chargingPile,
  ...marketing,
  ...invoice,
  ...enterprise,
}

export default api
