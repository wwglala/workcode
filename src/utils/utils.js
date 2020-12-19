import moment from 'moment'
import axios from 'axios'
import md5 from 'md5'
import { runInAction } from 'mobx'
import CryptoJS from 'crypto-js'
import { message } from 'antd'
import apiPath from 'Common/apiPath'
import { postToCentralPlatform, post } from './request'
import IDValidator from './IDValidator'

const ReportURL = 'http://113.125.201.130:31099'
const ReportShinyue = 'shinyue999'
const ReportServive = '/sreport/sreport/sreportPDF2?'
const pcReportURL = 'http://113.125.201.131:16017/server/report/fmPrint2?reportParams='

const $axios = axios.create({
  timeout: 30000, // 30秒
  responseType: 'json'
})
export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val
}
let bbgrxx = {
  "processDefinitionId": "cpxjsq:37:904e932f-8a95-11ea-826d-5254004a3d5a",
  "processInstanceId": "19192ae8-8ad8-11ea-a273-262b43f189f5",
  "formKey": "cpxjsjsp",
  "channel": "贝贝移动端",
  "description": "您好，【yun4对象-张昊天】发起了产品宣讲申请，请您审批。",
  "processDefinitionName": "产品宣讲申请",
  "source": "贝贝管理",
  "processDefinitionKey": "cpxjsq",
  "cpbs": "dmPro",
  "taskDefinitionKey": "a4d1cc92861aa7",
  "completeUser": "",
  "formUrl": "http://192.168.53.65:3111/DigitalEnterpriseManagement/producePreach/producePreachThirdlyCheck",
  "createTime": "2020-04-30 19:48:24",
  "channgel": "贝贝移动端",
  "businessKey": "1000001811040",
  "taskName": "三级审批",
  "taskId": "7f51fd6c-8ad8-11ea-a273-262b43f189f5",
  "startName": "",
  "flowtype": "db",
  "f_dept_id": 1936,
  "grbh": "10000000000000508",
  "gsbh": "1936",
  "tokenid": "APMPC",
  "deptid": 1936,
  "zjhm": "130123456789",
  "userid": 13114,
  "zhiji": "",
  "sjlx": "IOS",
  "bz": "0",
  "zzmm": "",
  "zzjgxx": {
    "msg": "登陆成功",
    "blqd": "zmd",
    "tokenid": "APMPC",
    "success": true,
    "sjlx": "IOS",
    "state": "200",
    "results": {
      "zxbm": "2208820002",
      "zjbzxbm": "yun4dx",
      "compmsg": {
        "zjbzxbm": "yun4dx",
        "ismajor": "1",
        "mc": "yun4对象",
        "postmc": "哈哈",
        "isaccounting": "1",
        "postbz": "测试",
        "bm": "2208820002",
        "id": 1936,
        "postid": "815"
      },
      "deptmsg": [{
        "zjbzxbm": "yun4dx",
        "ismajor": "1",
        "mc": "yun4对象",
        "postmc": "哈哈",
        "isaccounting": "1",
        "postbz": "测试",
        "bm": "2208820002",
        "id": 1936,
        "postid": "815"
      }],
      "personmsg": [{
        "xingming": "张昊天",
        "grbh": "10000000000000508",
        "jgbm": "2208820002",
        "sjhm": "18603284652",
        "id": "13114",
        "zjhm": "130123199"
      }],
      "jobmsg": [],
      "jgbm": "2208820002",
      "rolemsg": {
        "roleid": "53,207,234,284,284"
      },
      "zxbmid": 1936
    }
  },
  "jobs": "",
  "sjhm": "18603284652",
  "isconnect": "0",
  "zxmc": "",
  "logoUrl": "http://www.gjj12329.cn:6008/icon/logo/01.png",
  "deptname": "yun4对象",
  "token": "APMPC",
  "zxbm": "1301100006",
  "xingming": "张昊天",
  "headphoto": "",
  "blqd": "zmd",
  "jgbm": "1301100006",
  "zxjgbm": "2208820002",
  "qycode": "yun4dx",
  "depts": "dept-1936",
  "username": "张昊天",
  "bmbh": "1936",
  "ztToken": {
    "access_token": "a6784edd-7448-4401-b598-b0c652fff443",
    "token_type": "bearer",
    "refresh_token": "b3f80d4b-e205-43c2-a558-af6672f8cf0e",
    "expires_in": 43199,
    "scope": "all"
  },
  "locationMsg": {
    "data": {
      "latitude": 38.05096,
      "longtitude": 114.34683,
      "address": "河北省石家庄市鹿泉区获鹿镇神玥软件",
      "province": "河北省",
      "city": "石家庄市",
      "district": "鹿泉区",
      "street": "御园路"
    },
    "errorCode": 0,
    "msg": "定位成功"
  }
}
export function getTimeDistance(type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - day * oneDay

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ]
  }

  if (type === 'year') {
    const year = now.getFullYear()

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
  }
  return []
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = []
  nodeList.forEach(node => {
    const item = node
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
    item.exact = true
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path))
    } else {
      if (item.children && item.component) {
        item.exact = false
      }
      arr.push(item)
    }
  })
  return arr
}

export function digitUppercase(n) {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  let num = Math.abs(n)
  let s = ''
  fraction.forEach((item, index) => {
    s += (digit[Math.floor((num * 10 * 10) ** index) % 10] + item).replace(/零./, '')
  })
  s = s || '整'
  num = Math.floor(num)
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = ''
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p
      num = Math.floor(num / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/')
  const arr2 = str2.split('/')
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2
  }
  return 3
}

function getRenderArr(routes) {
  let renderArr = []
  renderArr.push(routes[0])
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3)
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1)
    if (isAdd) {
      renderArr.push(routes[i])
    }
  }
  return renderArr
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  )
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''))
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes)
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1)
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    }
  })
  return renderRoutes
}

export function getLower32SignMD5String(sign) {
  return md5(sign)
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

export function isUrl(path) {
  return reg.test(path)
}

export const getTicket = async (params = {}, ztConfigParams = {}, bbgrxx = {}) => {
  let result = { success: false, data: {} }
  let userMsg = window.ticket
  // console.log('123456',userMsg)
  let date = moment().format('YYYYMMddHHmmss')
  if (params) {
    userMsg = Object.assign(userMsg, params)
  }
  let ztConfig = {
    'M-Sy-AppId': ztConfigParams.appid, // App Key
    'M-Sy-Version': ztConfigParams.version,
    AppSecret: ztConfigParams.appSecret, // App Secret
    client_id: ztConfigParams.clientId, // 本平台登录的用户名
  }
  let { qycode } = window// qycode
  let headers = {
    'M-Sy-AppId': ztConfig['M-Sy-AppId'], // App Key
    'M-Sy-Service': qycode, // 服务标识 传qycode
    'M-Sy-Version': ztConfig['M-Sy-Version'],
    // 'Content-Type': 'application/x-www-form-urlencoded', // 指定消息格式
  }
  let { AppSecret } = ztConfig// App Secret

  let bodyParams = {
    client_id: ztConfig.client_id, // 本应用平台登录中台的用户名
    forward_client_id: params.cpbs, // 目标应用在中台的用户名
    timestamp: date,
    userinfo: JSON.stringify(bbgrxx)
  }
  let sign = ''
  for (let i in bodyParams) {
    if (Object.prototype.hasOwnProperty.call(bodyParams, i)) {
      sign += String(i)
      sign += String(bodyParams[i])
    }
  }
  sign += AppSecret
  let param = {
    ...bodyParams,
    sign: md5(sign), // 加密密文，加密方式：MD5(所有Body参数按key+value升序+秘钥),32位小写
  }
  try {
    // console.log('传参',param,headers)
    let res = await post('/api-auth/authority/ticket/bind', param, headers)
    runInAction(() => {
      result.data = res
      result.success = true
    })
  } catch (error) {
    console.log(error)
  }
  return result
}

export const openNewTabWindow = (title, url) => {
  window.parent.postMessage({
    type: 'openNewTab',
    title,
    url
  }, '*')
}

export const toNewTab = async (
  params = {}, ztConfigParams = {}, bbgrxx = {}, { title, url, ztConfig }
) => {
  let res = await getTicket(params, ztConfigParams, bbgrxx)
  url = `${window.getNewTabIpPort.ipPort}${url}?ticket=${res.data.ticket}&qycode=${bbgrxx.qycode}&ztConfig=${ztConfig}`
  await openNewTabWindow(title, url)
}

export const getTicketValidateNew = async (params = {}, header) => {
  let result = { success: false, data: {} }
  try {
    let headers = {
      'M-Sy-AppId': window.getConfig.appid,
      'M-Sy-Service': window.qycode,
      'M-Sy-Version': window.getConfig.Version
    }
    let timestamp = ''
    timestamp = moment(new Date()).format('YYYYMMDDHHmmss')
    let bodyParams = {
      // client_id: header.client_id ? header.client_id : 'dmPro', // 本应用平台登录中台的用户名
      client_id: 'dmPro', // 本应用平台登录中台的用户名
      ticket: params.ticket,
      timestamp,
    }
    console.log(222222222)
    console.log(params.ticket)
    let sign = ''
    // eslint-disable-next-line guard-for-in
    for (let i in bodyParams) {
      sign += String(i)
      sign += String(bodyParams[i])
    }
    sign += window.getConfig.ticketPadKey
    let param = {
      ...bodyParams,
      sign: getLower32SignMD5String(sign), // 加密密文，加密方式：MD5(所有Body参数按key+value升序+秘钥),32位小写
    }
    console.log('------url----', apiPath.CENTRALPLATFORM_TICKET_VALIDATENEW)
    let res = await postToCentralPlatform(
      (apiPath.CENTRALPLATFORM_TICKET_VALIDATENEW ? apiPath.CENTRALPLATFORM_TICKET_VALIDATENEW : '/api-auth/authority/ticket/validate'), param, headers
    )
    runInAction(() => {
      result.data = res
      result.success = true
    })
  } catch (error) {
    console.log(error)
  }
  return result
}

// 获取个人信息
export const getBbGrxx = async (params = {}) => { // 获得贝贝个人基本信息
  let result = { success: false, data: { blqd: '' } }
  if (process.env.ENV_TYPE !== 'micro') {
    // 贝贝事项 使用参数
    // params.zxbm = '01'
    // params.jgbm = '010110'
    // params.khbh = '01000000009000026367'
    params.userid = 3782 // 根据自己业务需要修改
  }
  console.log('获取个人信息接口---params--->', params)
  let res = await post(apiPath.GET_BB_GRXX, params)
  if (res && res.data && res.data.length > 0) {
    result.success = true
    result.data = res.data[0]
    result.data.blqd = 'zmd'
    result.data.zxbm = window.ywJson.zxbm || '01'
    result.data.khbh = res.data[0].grbh
    result.data.city = '河北省石家庄市鹿泉区御园路99号靠近金盛达科研生产楼'
    result.data.filepath = 'https://www.gjj12329.cn:19006/group1/M00/04/3F/CmMBf1zTriqAA2ApAABAAay4OmM484.jpg'
  }
  return result
}

// 对接中台
export function analysisZtConfig(value) {
  console.log('CryptoJS--->', CryptoJS)
  console.log('value--->', value)
  let keyHex = CryptoJS.enc.Utf8.parse('ticketmsg-pc')
  let decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(value)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let resultValue = decrypted.toString(CryptoJS.enc.Utf8)
  return resultValue
}

export const getYwlsh = async () => { // 获得业务流水号
  let params = { jgbh: bbgrxx.jgbm }
  //let params = { jgbh: window.bbgrxx.jgbm }
  let res = await post(apiPath.GET_YWLSH, params)
  let ywlsh = ''
  if (res) {
    ywlsh = (res).data.ywlsh
  }
  return ywlsh
}
export const getBpmid = async () => { // 获得bpmid
  let params = {}
  let res = await post(apiPath.GET_BPMID, params)
  let bpmid = ''
  if (res) {
    bpmid = (res).data.bpmid
  }
  return bpmid
}
export const getXmbh = async (params = {}) => { // 获得项目编号
  params = { jgbh: window.bbgrxx.jgbm, xmlb: '01', ...params }
  let res = await post(apiPath.GET_XMBH, params)
  let xmbh = ''
  if (res) {
    xmbh = res.data.xmbh
  }
  return xmbh
}
// 获取部门名称
export const getDeptName = async (param) => {
  let res = await post(apiPath.GET_DEPTNAME, param)
  let deptName = ''
  if (res) {
    console.log('res--->', res)
    deptName = (res).results.bz
  }
  return deptName
}
export function getUrlParams(name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  let r = window.location.hash.split('?')[1].match(reg)
  if (r !== null) {
    return decodeURI(r[2])
  }
  return r
}

// 关闭PC选项卡
export function closePCTab() {
  const key = 'key'
  let r = window.location.hash.split('?')[1].match(new RegExp(`(^|&)${key}=([^&]*)(&|$)`))
  try {
    window.parent.postMessage({
      type: 'closeOpenTab',
      key: ((r && r !== null) ? decodeURI(r[2]) : r)
    }, window.openTab)
  } catch (e) {
    console.error('关闭PC选项卡错误==>', e)
  }
}

// 路由跳转的传参关闭
export function closePCTab2(key) {
  console.log(`----------------closPCTab传值方法执行了-------key--->>${key}`)
  try {
    window.parent.postMessage({
      type: 'closeOpenTab',
      key
    }, '*')
  } catch (e) {
    console.error('关闭PC选项卡错误==>', e)
  }
}

// 打开新窗口的方法
export function openNewWindow(title, url) {
  window.parent.postMessage({
    type: 'openNewTab',
    title,
    url
  }, '*')
}

// 身份证校验
export function idValidator(zjhm) {
  let idValidator = new IDValidator()
  return idValidator.isValid(zjhm)
}

// 导出Excel
export function downLoad(params = {}, url, name) {
  console.log('downLoad()---params--->', params)
  try {
    fetch(url, {
      method: 'POST',
      body: window.JSON.stringify(params),
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
      response.blob().then(blob => {
        let blobUrl = window.URL.createObjectURL(blob)
        window.parent.postMessage({
          type: 'downLoadFile',
          fileName: `${name}.xlsx`,
          fileUrl: blobUrl,
        }, '*')
      })
    }).catch(error => {
      console.log('downLoad()---error--->', error)
    })
  } catch (e) {
    console.error('---文件下载异常----', e)
    message.error('文件下载失败,请联系管理员!')
  }
}

// 下载模板
export function templateDown(url, fileName) {
  window.parent.postMessage({
    type: 'downLoadFile',
    fileName,
    fileUrl: url + fileName,
  }, '*')
}

export function postFile(url, params, headers) {
  let fileParams = new FormData()
  // eslint-disable-next-line guard-for-in
  for (let key in params) {
    console.log('=======key===', key, params[key])
    fileParams.append(key, params[key])
  }
  return new Promise((resolve, reject) => {
    $axios.post(url, fileParams, {
      'Content-Type': 'multipart/form-data; charset=utf-8'
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

// 获取实例画像Ticket
export const getTicketHX = async (params = {}) => {
  let result = { success: false, data: {} }
  let userMsg = window.mineTicket
  // console.log('123456',userMsg)
  let date = moment().format('YYYYMMddHHmmss')
  if (params) {
    userMsg = Object.assign(userMsg, params)
  }
  let { qycode, hxZtConfig } = window// qycode
  let headers = {
    'M-Sy-AppId': hxZtConfig['M-Sy-AppId'], // App Key
    'M-Sy-Service': qycode, // 服务标识 传qycode
    'M-Sy-Version': hxZtConfig['M-Sy-Version'],
    // 'Content-Type': 'application/x-www-form-urlencoded', // 指定消息格式
  }
  let { AppSecret } = hxZtConfig// App Secret

  let bodyParams = {
    client_id: hxZtConfig.client_id, // 本应用平台登录中台的用户名
    forward_client_id: 'bbPro', // 目标应用在中台的用户名
    timestamp: date,
    userinfo: JSON.stringify(userMsg)
  }
  let sign = ''
  for (let i in bodyParams) {
    if (Object.prototype.hasOwnProperty.call(bodyParams, i)) {
      sign += String(i)
      sign += String(bodyParams[i])
    }
  }
  sign += AppSecret
  let param = {
    ...bodyParams,
    sign: md5(sign), // 加密密文，加密方式：MD5(所有Body参数按key+value升序+秘钥),32位小写
  }
  try {
    // console.log('传参',param,headers)
    let res = await post('/api-auth/authority/ticket/bind', param, headers)
    runInAction(() => {
      result.data = res
      result.success = true
    })
  } catch (error) {
    console.log(error)
  }
  return result
}

export const jumpToPEP = async xmbh => {
  let ticketRes = await getTicketHX({ xmslhxmsg: { xmbh } })
  if (ticketRes.success === true) {
    let { ticket } = ticketRes.data
    let url = `${window.hxZtConfig.pepUrl}?ticket=${ticket}&qycode=${window.qycode}&ztConfig=${window.ztConfig}`
    window.parent.postMessage({
      type: 'openNewTab',
      title: '项目实例画像',
      url
    }, '*')
  }
}

export const getHighlightData = async () => {
  const headers = {
    usr: JSON.stringify({
      userId: window.bbgrxx.userid,
      blqd: window.bbgrxx.blqd,
      jgbm: window.bbgrxx.zxbm,
      zjbzxbm: window.qycode
    }),
    'M-Sy-AppId': window.getJumpParams.appid,
    'M-Sy-Service': window.getJumpParams.clientId,
    'M-Sy-Version': window.getJumpParams.version,
    'M-Sy-Token': '',
  }
  const params = {
    processDefinitionId: window.bbgrxx.processDefinitionId,
    taskDefinitionKey: window.bbgrxx.taskDefinitionKey,
    tenantId: window.bbgrxx.zxbm,
    blqd: window.bbgrxx.blqd,
  }

  try {
    console.log('获取高亮数据传参', params, headers)
    let res = await post('/BPM/task/formAttr_query.service', params, headers)
    return res.data
  } catch (error) {
    console.log('获取高亮数据失败!', error)
    return {}
  }
}
// 打印
export const printReport = async (params = {}) => {
  console.log('报表打印', params)
  try {
    let result = await post(apiPath.GET_REPORT_TOKEN, { zxbm: window.bbgrxx.zxbm })
    if (result.success) {
      console.log(process)
      if (process.env.ENV_TYPE) {
        params.token = result.token
        let tempKey = ReportServive + JsonToUrlParam(params, true) + ReportShinyue
        // params.validatemd5 = hex_md5(tempKey)
        const validatemd5 = hex_md5(tempKey)
        // let openReport = ReportURL + ReportServive + Utils.JsonToUrlParam(params, true) + '&validatemd5=' + validatemd5
        let openReport = `${encodeURI(ReportURL + ReportServive + JsonToUrlParam(params, true))}&validatemd5=${validatemd5}`
        console.log('打印跳转路径', openReport)
        // 报表系统没做玩，暂时不启用
        window.open(openReport)
      } else {
        console.log('-----调用父窗口', window.openTab, JsonToUrlParam(params, true))
        let postData = {
          type: 'printCwgjjReport',
          url: `${window.pcReportUrl.reportUrl}/server/report/print?reportParams=iphone=${result.results[0].iphone}%26uid=${result.results[0].uuid}%26tid=${result.results[0].tid}%26${JsonToUrlParam(params, true).replaceAll('&', '%26')}`
          // url: pcReportURL + encodeURIComponent(JsonToUrlParam(params, true))
        }
        console.log('postData------', postData)
        window.parent.postMessage(postData, '*')
      }
    } else {
      console.log('--请求token失败-------')
      message.error('打印报表失败,请联系管理员!')
    }
  } catch (e) {
    console.error('---打印报表异常----', e)
    message.error('打印报表失败,请联系管理员!')
  }
}
String.prototype.replaceAll = function (f, e) { // 吧f替换成e
  let reg = new RegExp(f, 'g') // 创建正则RegExp对象
  return this.replace(reg, e)
}
export function JsonToUrlParam(jsonData, question) {
  let urlParam = ''
  let flag = question
  for (let key in jsonData) {
    if (flag) {
      urlParam += `${key}=${encodeURIComponent(jsonData[key])}`
      flag = false
    } else {
      urlParam += `&${key}=${encodeURIComponent(jsonData[key])}`
    }
  }
  return urlParam
}

// 格式化金额
export function fgetmoney(ss) {
  ss += ''
  let isMinus = false
  if ((/\-/g.test(ss))) {
    ss = ss.replace(/\-/g, '')
  }

  let s = (`${ss}`).replace(/[^\d.]/g, '')
  // n = n > 0 && n <= 20 ? n : 2;
  s = `${parseFloat((`${s}`).replace(/[^\d\.]/g, '')).toFixed(2)}`
  if (isNaN(s) || s === '') {
    return 0.00
  }
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  let fm = `${(isMinus ? '-' : '') + t.split('').reverse().join('')}.${r}`
  return fm
}


