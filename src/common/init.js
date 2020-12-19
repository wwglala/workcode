/*
 * @Date: 2020-04-27 17:25:31
 * @LastEditTime: 2020-05-19 16:11:04
 * @Description: file content
 */

import React from 'react'
import ReactDOM from 'react-dom'
import CryptoJS from 'crypto-js'
import { message } from 'antd'
import { createHashHistory } from 'history'
import { ssStorage } from 'Util/storage'
// import Utils from 'Util/utils'
import { getBbGrxx, getTicketValidateNew, getDeptName } from 'Util/utils'
import comStore from './comStore'
import { post } from '../utils/request'

const history = createHashHistory()

export const initApp = async RootComponent => {
  if (!window.ticket && window.ticketbf !== window.ticket) {
    try {
      let bbgrxx = {
        processDefinitionId: 'cpxjsq:37:904e932f-8a95-11ea-826d-5254004a3d5a',
        processInstanceId: '19192ae8-8ad8-11ea-a273-262b43f189f5',
        formKey: 'cpxjsjsp',
        channel: '贝贝移动端',
        description: '您好，【yun4对象-开发者】发起了产品宣讲申请，请您审批。',
        processDefinitionName: '产品宣讲申请',
        source: '贝贝管理',
        processDefinitionKey: 'cpxjsq',
        cpbs: 'dmPro',
        taskDefinitionKey: 'a4d1cc92861aa7',
        completeUser: '',
        formUrl: 'http://192.168.53.65:3111/DigitalEnterpriseManagement/producePreach/producePreachThirdlyCheck',
        createTime: '2020-04-30 19:48:24',
        channgel: '贝贝移动端',
        businessKey: '1000330999249',
        taskName: '三级审批',
        taskId: '7f51fd6c-8ad8-11ea-a273-262b43f189f5',
        startName: '',
        flowtype: 'db',
        f_dept_id: 1936,
        grbh: '10000000000000508',
        gsbh: '1936',
        tokenid: 'APMPC',
        deptid: 1936,
        zjhm: '130123456789',
        userid: 13114,
        zhiji: '',
        sjlx: 'IOS',
        bz: '0',
        zzmm: '',
        zzjgxx: {
          msg: '登陆成功',
          blqd: 'zmd',
          tokenid: 'APMPC',
          success: true,
          sjlx: 'IOS',
          state: '200',
          results: {
            // zxbm: '2208820002',
            zxbm: '1301100006',
            zjbzxbm: 'yun4dx',
            compmsg: {
              zjbzxbm: 'yun4dx',
              ismajor: '1',
              mc: 'yun4对象',
              postmc: '哈哈',
              isaccounting: '1',
              postbz: '测试',
              // bm: '2208820002',
              bm: '1301100006',
              id: 1936,
              postid: '815'
            },
            deptmsg: [{
              zjbzxbm: 'yun4dx',
              ismajor: '1',
              mc: 'yun4对象',
              postmc: '哈哈',
              isaccounting: '1',
              postbz: '测试',
              bm: '1301100006',
              // bm: '2208820002',
              id: 1936,
              postid: '815'
            }],
            personmsg: [{
              xingming: '开发者',
              grbh: '10000000000000508',
              jgbm: '1301100006',
              // jgbm: '2208820002',
              sjhm: '18603284652',
              id: '13114',
              zjhm: '130123199'
            }],
            jobmsg: [],
            jgbm: '1301100006',
            // jgbm: '2208820002',
            rolemsg: {
              roleid: '53,207,234,284,284'
            },
            zxbmid: 1936
          }
        },
        jobs: '',
        sjhm: '18603284652',
        isconnect: '0',
        zxmc: '',
        logoUrl: 'http://www.gjj12329.cn:6008/icon/logo/01.png',
        deptname: 'yun4对象',
        token: 'APMPC',
        zxbm: '1301100006',
        xingming: '开发者',
        headphoto: '',
        blqd: 'zmd',
        jgbm: '1301100006',
        zxjgbm: '1301100006',
        qycode: 'yun4dx',
        depts: 'dept-1936',
        username: '开发者',
        bmbh: '1936',
        ztToken: {
          access_token: 'a6784edd-7448-4401-b598-b0c652fff443',
          token_type: 'bearer',
          refresh_token: 'b3f80d4b-e205-43c2-a558-af6672f8cf0e',
          expires_in: 43199,
          scope: 'all'
        },
        locationMsg: {
          data: {
            latitude: 38.05096,
            longtitude: 114.34683,
            address: '河北省石家庄市鹿泉区获鹿镇神玥软件',
            province: '河北省',
            city: '石家庄市',
            district: '鹿泉区',
            street: '御园路'
          },
          errorCode: 0,
          msg: '定位成功'
        }
      }
      ssStorage.setItem('bbgrxx', bbgrxx)
      window.bbgrxx = bbgrxx
    } catch (error) {
      console.log()
    }
  } else if (window.ztConfig) {
    /* 解析ztConfig*/
    // let keyHex = CryptoJS.enc.Utf8.parse('ticketmsg-pc')
    // let decrypted = CryptoJS.DES.decrypt({
    //   ciphertext: CryptoJS.enc.Hex.parse(window.ztConfig)
    // }, keyHex, {
    //   mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    // let resultValue = decrypted.toString(CryptoJS.enc.Utf8)
    // console.log('解析后的ztConfig为================', resultValue)
    // // eslint-disable-next-line space-infix-ops
    // // console.log('解析后的ztConfig.M-Sy-Version为================', resultValue.M-Sy-Version)
    // window.ztConfigValue = resultValue
    // 获取上层ticket
    let { ticket } = window
    window.ticketbf = ticket
    // window.gjjgrxx = {}
    window.bbgrxx = {}
    try {
      // 对接中台
      // 对接中台获取用户信息
      let results = {}
      results = await getTicketValidateNew({ ticket })
      window.mineTicket = JSON.parse(results.data.user_info)

      ssStorage.removeItem('bbgrxx')
      if (results && results.data) {
        // ssStorage.setItem('bbgrxx', JSON.parse(results.data.user_info))
        let userInfo = JSON.parse(results.data.user_info)
        let postbz = ''
        userInfo.zzjgxx.results.deptmsg && userInfo.zzjgxx.results.deptmsg.forEach(element => {
          postbz = element.ismajor === '1' ? element.postbz : postbz
        })
        userInfo.postbz = postbz
        let deptname = ''
        if (userInfo.zzjgxx.results.compmsg.length) {
          deptname = userInfo.zzjgxx.results.compmsg.mc || userInfo.zzjgxx.results.compmsg.jgmc
        }
        if (userInfo.zzjgxx.results.deptmsg.length) {
          deptname = `${deptname}/${userInfo.zzjgxx.results.deptmsg[0].mc}-${userInfo.zzjgxx.results.deptmsg[0].postmc}`
        }
        if (userInfo.zzjgxx.results.jobmsg.length) {
          deptname = `${deptname}/${userInfo.zzjgxx.results.jobmsg[0].mc}`
        }
        // let par = {
        //   apiversion: '1.0',
        //   blqd: userInfo.blqd,
        //   grbh: userInfo.grbh,
        //   jgbh: userInfo.zxbm,
        //   jgbm: userInfo.jgbm,
        //   zxbm: userInfo.zxbm,
        //   jsid: userInfo.zzjgxx.results.rolemsg.roleid
        // }
        // let res = await post('/DM/rlzy/grhx/qbxxcx$m=Query.service', par, { client: 2 })
        // userInfo.zzmm = (res.results[0].beizhu).zzmm
        // userInfo.txxbm = (res.results[0].beizhu).bm
        let param = {
          grbh: userInfo.grbh
        }
        let deptName = await getDeptName(param)
        userInfo.deptname = deptName
        ssStorage.setItem('bbgrxx', userInfo)
      } else {
        // Utils.showErrorMsg('中台获取验证ticket失败,请重新进入页面')

        return
      }
      if (results.success) {
        window.bbgrxx.f_dept_id = JSON.parse(results.data.user_info).f_dept_id
        window.bbgrxx.grbh = JSON.parse(results.data.user_info).grbh
        window.bbgrxx.jobs = JSON.parse(results.data.user_info).jobs
        window.bbgrxx.deptid = JSON.parse(results.data.user_info).deptid
        window.bbgrxx.sjhm = JSON.parse(results.data.user_info).sjhm
        window.bbgrxx.zjhm = JSON.parse(results.data.user_info).zjhm
        window.bbgrxx.userid = JSON.parse(results.data.user_info).userid
        window.bbgrxx.zxmc = JSON.parse(results.data.user_info).zxmc
        window.bbgrxx.deptname = JSON.parse(results.data.user_info).deptname
        window.bbgrxx.zxbm = JSON.parse(results.data.user_info).zxbm
        window.bbgrxx.xingming = JSON.parse(results.data.user_info).xingming
        window.bbgrxx.blqd = JSON.parse(results.data.user_info).blqd
        window.bbgrxx.sjlx = JSON.parse(results.data.user_info).sjlx
        window.bbgrxx.jgbm = JSON.parse(results.data.user_info).jgbm
        window.bbgrxx.qycode = JSON.parse(results.data.user_info).qycode
        window.bbgrxx.username = JSON.parse(results.data.user_info).username
        window.bbgrxx.filepath = JSON.parse(results.data.user_info).filepath
        window.bbgrxx.zzmm = JSON.parse(results.data.user_info).zzmm
        window.bbgrxx.processDefinitionId = JSON.parse(results.data.user_info).processDefinitionId
        window.bbgrxx.processInstanceId = JSON.parse(results.data.user_info).processInstanceId
        window.bbgrxx.surplus = JSON.parse(results.data.user_info).surplus
        window.bbgrxx.taskDefinitionKey = JSON.parse(results.data.user_info).taskDefinitionKey

        window.bbgrxx.city = JSON.parse(results.data.user_info).city
        window.bbgrxx.imageurl = JSON.parse(results.data.user_info).imageurl
        window.bbgrxx.userrole = JSON.parse(results.data.user_info).userrole
        window.bbgrxx.usertype = JSON.parse(results.data.user_info).usertype
        window.bbgrxx.zxbm = JSON.parse(results.data.user_info).zxjgbm
        window.bbgrxx.zxjgbm = JSON.parse(results.data.user_info).zxjgbm
        window.bbgrxx.tokenid = JSON.parse(results.data.user_info).tokenid
        window.bbgrxx.khbh = JSON.parse(results.data.user_info).khbh

        window.bpmJson.bpmid = JSON.parse(results.data.user_info).businessKey
        window.bpmJson.taskid = JSON.parse(results.data.user_info).taskId
        window.bpmJson.processInstanceId = JSON.parse(results.data.user_info).processInstanceId
        window.gjjgrxx = window.bbgrxx
        if (window.bbgrxx.bpmid && window.bbgrxx.taskid && window.bbgrxx.processInstanceId) {
          window.bpmJson.bpmid = window.bbgrxx.bpmid
          window.bpmJson.taskid = window.bbgrxx.taskid
          window.bpmJson.processInstanceId = window.bbgrxx.processInstanceId
        }
        // let bbgrxx = await Utils.getBbGrxx({ ...window.bbgrxx, ffbm: '104' })
        // if (!bbgrxx.success) {
        //   if (process.env.ENV_TYPE) {
        //     Utils.showErrorMsg('贝贝个人信息获取失败')
        //   } else {
        //     Utils.showErrorAndBack('贝贝个人信息获取失败')
        //     return
        //   }
        // }
        // window.bbgrxx = { ...bbgrxx.data, zjhm: window.bbgrxx.zjhm }
      } else {
        // Utils.showErrorMsg('中台获取验证ticket失败,请重新进入页面')
        return
      }
    } catch (e) {
      console.log('解析异常', e)
      return
    }
  }

  ReactDOM.render(
    <RootComponent
      history={history}
      comStore={comStore}
    />, document.getElementById('root')
  )
}
