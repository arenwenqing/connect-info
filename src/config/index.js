    
import build from './build'

const IS_DEV = build.IS_DEV
const HOST = window.location.host

const prodRootMap = {
    'test-legal.inkept.cn': {
      root: 'https://test-legal.inkept.cn/',
    },
    'legal.inkept.cn': {
      root: 'https://legal.inkept.cn/',
    }
}

const rootObj = prodRootMap[Object.keys(prodRootMap).find(key => HOST.indexOf(key) === 0)] || {}

const DEFAULT_ROOT = '/'

const getRootStr = rootStr => {
    return rootStr || DEFAULT_ROOT
}

const PROD = {
  APIS: {
    root: getRootStr(rootObj.root),
  }
}

const DEV = {
  APIS: {
    root: DEFAULT_ROOT,
  }
}

const OBJ = {
  SUPER_ADMIN: [],
  IS_DEV,

  USER_INFO_MOCK: false,

  build,

  ...build.ENV,

  ...IS_DEV ? DEV : PROD,


  LOG_SYSTEM_SOURCE: -1,
}
export default OBJ
