import enterprise from './enterprise'
import employees from './employees'
import enterpriseFlow from './enterpriseFlow'
import invoice from './invoice.js'
export default {
  ...enterprise,
  ...employees,
  ...enterpriseFlow,
  ...invoice
}
