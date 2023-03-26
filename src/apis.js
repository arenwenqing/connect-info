import srcConfig from './config'
import { getRequestsByRoot } from 'axios-service'

const root = srcConfig.APIS.root

const { get, post, postXForm } = getRequestsByRoot({ root })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  getAllUsers = get('http://www.opennet.link/customer.php?action=list')
}
const ApiObj =  new Apis()

export default ApiObj
