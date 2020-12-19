import { post, postToCentralPlatform, postToken } from './../utils/request'
import apiPath from '../common/apiPath'
import IDValidator from './IDValidator'
import { Toast } from 'antd'
// eslint-disable-next-line no-unused-vars
import { runInAction } from 'mobx'
import moment from 'moment'
import { getLower32SignMD5String } from './../utils/utils'
import md5 from 'md5'
var CryptoJS = require('crypto-js')
// function getConfig() {
//   return {
//     appid: '2019082217092434', // 用户id，过中台请求头中的参数M-Sy-AppId
//     Version: '1.0.1', // 版本号，过中台请求头中的参数M-Sy-Version
//     client_id: 'dmPro',
//     padKey: 'SY6EE1BFA49CE3482EA003DD5C87CBFF', // 密钥，中台每个账号对应一个密钥，ticket，token等都对应一个密钥
//     ipPort: 'http://113.125.201.131:9300',
//   }
// }
const Utils = {



  getYwlsh: async () => { // 获得业务流水号
    let params = { jgbh: window.bbgrxx.zxbm }
    let res = await post(apiPath.GET_YWLSH, params)
    let ywlsh = ''
    if (res.success) {
      ywlsh = (res).data.ywlsh
    }
    return ywlsh
  },
  getBpmid: async () => { // 获得bpmid
    let params = {}
    let res = await post(apiPath.GET_BPMID, params)
    let bpmid = ''
    if (res.success) {
      bpmid = (res).data.bpmid
    }
    return bpmid
  },
  getKhbh: async () => { // 获得bpmid
    let params = {}
    let res = await post(apiPath.GET_BPMID, params)
    let khbh = ''
    if (res.success) {
      khbh = (res).data.bpmid
    }
    return khbh
  },
  getXmbh: async (params = {}) => { // 获得项目编号
    params = { jgbh: window.bbgrxx.jgbm, xmlb: '01', ...params }
    let res = await post(apiPath.GET_XMBH, params)
    let xmbh = ''
    if (res.success) {
      xmbh = res.data.xmbh
    }
    return xmbh
  },
  // 获取部门名称
  getDeptName: async (param) => {
    let res = await post(apiPath.GET_DEPTNAME, param)
    let deptName = ''
    if (res.success) {
      console.log('res--->', res)
      deptName = (res).results.bz
    }
    return deptName
  },
  getToken: async (param = {}) => { // 获取token
    const clientId = window.configHttp.client_id
    const serviceid = window.qycode
    const appKey = window.configHttp.appid
    const secretKey = window.configHttp.secretKey
    const role = window.configHttp.role
    const version = window.configHttp.version
    const cplx = window.configHttp.cplx

    let md5Obj = {
      client_id: clientId,
      role: role,
      serviceid: serviceid,
      timestamp: new Date().valueOf(),
      userid: param.userid ? param.userid : '123',
      userinfo: JSON.stringify({ a: 1 }),
    }

    let res = await postToken(apiPath.GET_TOKEN, {
      ...md5Obj,
      sign: md5((`client_id${md5Obj.client_id}role${md5Obj.role}serviceid${md5Obj.serviceid}timestamp${md5Obj.timestamp}userid${md5Obj.userid}userinfo${md5Obj.userinfo}${secretKey}`))
    }, {
      'M-Sy-AppId': appKey,
      'M-Sy-Service': serviceid,
      'M-Sy-Version': version
    })
    let token = ''
    if (res.access_token) {
      token = res.access_token
    }
    return token
  },

  printReportToFtp: async (params = {}) => {
    let result = { success: false, msg: '' }
    let res = await post('/server/ftp/uploadReportToFtp', params)
    console.log('打印报表===>', res)
    if (res) {
      result.success = true
      result.msg = res.msg
    }
    return result
  },
  uploadEamsImages: async (files, params) => { // 上传档案图片
    console.log('sssssssssssssssssss', files)
    for (let j = 0; j < files.length; j++) {
      let fileObject = files[j]
      let data = fileObject.files
      let newParams = params
      // 要推送到后台的内容
      if (data.length > 0) {
        let file1 = ''
        try {
          for (let i = 0; i < data.length; i++) {
            file1 = file1 + data[i] + ','
          }
          console.log('-----params----', params, typeof params)
          // debugger
          // params = { easywfl: '04', easywlb: '0302', ffbm: '01', blqd: 'gt', khbh: '20114010101055', ywlsh: '20114010101060', clbm: fileObject.code, clmc: fileObject.name, filetype: 'jpg', loginip: '127.0.0.1', scanpages: 1, jgbm: '0101', userid: 1, file1: file1 }
          newParams.file1 = file1
          newParams.clbm = fileObject.code
          console.log('aaaaaaaaaaaaaaaaa', fileObject.code)
          newParams.clmc = fileObject.name
          newParams.filetype = 'jpg'
          console.log(newParams)
          let res = await post(apiPath.GET_DZDA_DATA, newParams)
          console.log('发送档案材料成功', res)
        } catch (error) {
          console.log('发送档案材料失败--失败类别为' + fileObject.name, error)
        }
      }
    }
  },
  backApp: () => { // 退出手机App
    try {
      // eslint-disable-next-line no-undef
      AppPop()
      console.log('手机退出===>', 'success')
    } catch (e) {
      console.log('手机退出===>', 'fail', e)
    }
  },
  fgetmoney: function (ss) { // 格式化金额
    ss = ss + ''
    let isMinus = false
    // eslint-disable-next-line no-useless-escape
    if ((isMinus = /\-/g.test(ss))) {
      // eslint-disable-next-line no-useless-escape
      ss = ss.replace(/\-/g, '')
    }

    let s = (ss + '').replace(/[^\d.]/g, '')
    // n = n > 0 && n <= 20 ? n : 2;
    // eslint-disable-next-line no-useless-escape
    s = parseFloat((s + '').replace(/[^\d\.]/g, '')).toFixed(2) + ''
    if (isNaN(s) || s === '') {
      return 0.00
    }
    let l = s.split('.')[0].split('').reverse()
    let r = s.split('.')[1]
    let t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    let fm = (isMinus ? '-' : '') + t.split('').reverse().join('') + '.' + r
    return fm
  },
  jsYueShu: (data1, data2) => {
    console.log('======data1,,,,,===', data1, '======data2,,,,,===', data2)
    let sDate1 = Date.parse(data1)
    let sDate2 = Date.parse(data2)
    let dateSpan = sDate2 - sDate1
    dateSpan = Math.abs(dateSpan)
    let iMon = Math.floor(dateSpan / (24 * 3600 * 1000 * 30))
    return iMon + 1
  },
  idValidator: (zjhm) => { // 身份证校验
    var idValidator = new IDValidator()
    return idValidator.isValid(zjhm)
  },
  sjhmValidator: (sjhm) => { // 手机号码校验
    var PHONE_REGEXP = /^[1]([3-9])[0-9]{9}$/
    if (PHONE_REGEXP.test(sjhm)) {
      return true
    }
    return false
  },
  getNowMonthDate(y, m, day = 1) {
    var date = new Date()
    date.setFullYear(y, m, day)
    var year = date.getFullYear() + ''
    var month = (date.getMonth() + 1) + ''
    // 本月第一天日期
    var begin = year + '-' + month + '-01'
    // 本月最后一天日期
    var lastDateOfCurrentMonth = new Date(year, month, 0)
    var end = year + '-' + month + '-' + lastDateOfCurrentMonth.getDate()
    return { begin, end }
  },
  compareTime: (startDate, endDate) => { // yyyy-mm-dd格式比较
    var date1 = strFormatDate(startDate)
    var date2 = strFormatDate(endDate)
    if (date1.getTime() > date2.getTime()) {
      return false
    } else {
      return true
    }
    function strFormatDate(str) {
      return new Date(Date.parse(str.replace(/-/g, '/')))
    }
  },

  analysisZtConfig: (value) => {
    let keyHex = CryptoJS.enc.Utf8.parse('ticketmsg-pc')
    let decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(value)
    }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    let resultValue = decrypted.toString(CryptoJS.enc.Utf8)
    return resultValue
  },
  strTrim: str => {
    console.log('转化前====>', str)
    let strRe = str.replace(/(^\s*) | (\s*$)/g, '')
    console.log('转化后====>', strRe)
    return strRe
  },

  // 个人画像
  grhxJump: function (params = {}) {
    // let url= window.configHttp.host+'/dm-app/分支名/#/页面路由地址'
    // let res = await Utils.getTicket( { cpbs: window.configHttp.client_id })
    // if (res.success === true) {
    //     let { ticket } = res.data
    //     let finalUrl = `${url}?ticket=${ticket}&qycode=${window.qycode}&ztConfig=${window.ztConfig}`
    //     const fn = AppPush || window.AppPush
    //     fn(finalUrl)
    // } else {
    //     message.error('生成ticket失败', 1)
    // }

  },

  // 获取画像ticiket
  getTicketHX: async (params = {}) => {
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
  },
  //获取ticket
  getTicket: async (params = {}) => {
    let userMsg = {}
    let result = { success: false, data: {} }
    // console.log('123456',userMsg)
    let date = moment().format('YYYYMMddHHmmss')
    if (params) {
      userMsg = Object.assign(window.mineTicket, params)
    }
    let ztConfig = {
      'M-Sy-AppId': window.configHttp.ticketAppid, // App Key
      'M-Sy-Version': window.configHttp.ticketVersion,
      AppSecret: window.configHttp.ticketPadKey, // App Secret
      client_id: window.configHttp.tickeTClient_id, // 本平台登录的用户名
    }
    let headers = {
      'M-Sy-AppId': ztConfig['M-Sy-AppId'], // App Key
      'M-Sy-Service': window.qycode, // 服务标识 传qycode
      'M-Sy-Version': ztConfig['M-Sy-Version'],
      // 'Content-Type': 'application/x-www-form-urlencoded', // 指定消息格式
    }
    let { AppSecret } = ztConfig// App Secret

    let bodyParams = {
      client_id: ztConfig.client_id, // 本应用平台登录中台的用户名
      forward_client_id: params.cpbs, // 目标应用在中台的用户名
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
  }, // 生成ticket

  getHighlightData: async () => {
    const headers = {
      usr: JSON.stringify({
        'userId': window.bbgrxx.userid,
        'blqd': window.bbgrxx.blqd,
        'jgbm': window.bbgrxx.zxbm,
        'zjbzxbm': window.qycode
      }),
      'M-Sy-AppId': window.configHttp.appid,
      'M-Sy-Service': window.configHttp.client_id,
      'M-Sy-Version': window.configHttp.version,
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
      return res.data ? res.data : {}
    } catch (error) {
      console.log('获取高亮数据失败', error)
      return {}
    }
  }
}
export default Utils
