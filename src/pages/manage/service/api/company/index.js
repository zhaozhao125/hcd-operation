import companyList from './company-list'
import companyAccount from './company-account'
import bill from './bill'
import withdrawRecords from './withdraw-record'
export default {
  ...companyList,
  ...companyAccount,
  ...bill,
  ...withdrawRecords
}
