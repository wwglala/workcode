/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import { observable, action, runInAction, toJS } from 'mobx'
import { message } from 'antd'
import Utils from '../../../utils/utils'
import utils from '../../../utils/publicUtils'
import { post } from '../../../utils/request'
import API_PATH from '../../../common/apiPath'

class Store {
  @observable publicParam = {}
  // 获取公共参数
  @action getPublicParam = (params = {}) => {
    this.publicParam.zxbm = bbgrxx.zxbm
    this.publicParam.jgbm = bbgrxx.jgbm
    this.publicParam.blqd = bbgrxx.blqd
    this.publicParam.userid = bbgrxx.userid
    this.publicParam.grbh = bbgrxx.grbh
    this.publicParam.username = bbgrxx.uname
    console.log('机票 公共参数', this.publicParam)
  }
  @observable ssxm //  所属项目
  @observable sy //  事由
  @observable sfzz //  是否中转
  @observable zjhm //  证件号码
  @observable sjhm //  手机号码
  @observable xmbm //  项目编码
  @observable xmmcs //  项目名称
  @observable zj = 0 //  总票价
  @observable bz //  备注
  @observable xmbh = '54188' // 项目编号
  @observable lx = '01' //  类型
  @observable gqf //  改签费
  @observable tpf //  退票费
  @observable tpfbz //  退票费标志
  @observable dzfwf2 //  垫资服务费
  @observable gqf1 //  改签费
  @observable tpf1 //  退票费
  @observable dzfwf3 //  垫资服务费
  @observable deptname // 录入操作员部门名称
  @observable lrczy // 录入操作员姓名
  @observable lrczyid // 录入操作员id

  @observable spyj // 审批意见
  @observable jpzjg // 机票总金额
  @observable jpjj // 机票净价
  @observable mhjj // 明航基金
  @observable bxf // 保险费
  @observable dzfwf // 垫资服务费
  @observable fsfwf = 3.00 // 配送服务费
  @observable jpzjg1 // 机票总金额
  @observable jpjj1 // 机票净价
  @observable mhjj1 // 明航基金
  @observable bxf1 // 保险费
  @observable dzfwf1 // 垫资服务费
  @observable fsfwf1 = '3.00' // 配送服务费

  @observable cfsf // 出发城市名称
  @observable sfcs // 出发省份名称
  @observable mdsf // 目的城市名称
  @observable mdcs // 目的省份名称
  @observable cfsfbm // 出发城市编码
  @observable sfcsbm // 出发省份编码
  @observable mdsfbm // 目的城市编码
  @observable mdcsbm // 目的省份编码
  @observable hbsj // 航班时间
  @observable hbbc // 航班班次
  @observable jpjg // 机票价格

  @observable sqrDepName // 申请人部门
  @observable sqrFilepath // 申请人头像
  @observable sqrZzmm // 申请人政治面貌
  @observable sqCzy // 申请人姓名
  @observable sqrgrbh // 申请人个人编号
  @observable sqruserid // 申请人id
  @observable fsdd // 申请人位置
  @observable fssj // 申请人时间

  // 审批反显
  @observable spfx = false
  @observable spfxdata = []
  @observable xmbzdata = []
  @observable xmgcbzdata = []
  @observable jpxx = []
  @observable jpxx1 = []
  @observable spdate = []
  @observable gcbzid = ''
  @observable xzzyhbxx = []
  @observable xzzyhbxx1 = []
  @observable thgcbzid
  @observable dxbh = ''
  @action getSpfx = async params => {
    try {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>', params)
      let res = await post(API_PATH.GET_DGJP_LCSP, params)
      console.log('spfx 返回', res)
      runInAction(async () => {
        if (res.totalcount === 0) {
          await message.error('流程已撤销')
          AppPop()
        }
        if (res.success) {
          this.spfxdata = res.results[0]
          this.xmbh = this.spfxdata.xmbh
          this.jpxx = res.results[0].bcxx
          toJS(this.jpxx).forEach(element => {
            if (element.bzlb === '02') {
              this.jpxx1.push(JSON.parse(element.beizhu))
              this.gcbzid = element.bzid
              this.cfsf = JSON.parse(element.beizhu).cfsf
              this.sfcs = JSON.parse(element.beizhu).sfcs
              this.mdsf = JSON.parse(element.beizhu).mdsf
              this.mdcs = JSON.parse(element.beizhu).mdcs
              this.cfsfbm = JSON.parse(element.beizhu).cfsfbm
              this.sfcsbm = JSON.parse(element.beizhu).sfcsbm
              this.mdsfbm = JSON.parse(element.beizhu).mdsfbm
              this.mdcsbm = JSON.parse(element.beizhu).mdcsbm
              this.hbsj = JSON.parse(element.beizhu).hbsj
              this.hbbc = JSON.parse(element.beizhu).hbbc
              this.jpjg = JSON.parse(element.beizhu).jpjg
              if (window.bpmJson.flowable === 'yb' && window.bpmJson.taskName === '行政专员') {
                if (typeof (JSON.parse(element.beizhu).lx) !== 'undefined') {
                  this.lx = JSON.parse(element.beizhu).lx
                  this.gqf = utils.fgetmoney(JSON.parse(element.beizhu).gqf)
                  this.gqf1 = utils.fgetmoney(JSON.parse(element.beizhu).gqf)
                  this.tpf = utils.fgetmoney(JSON.parse(element.beizhu).tpf)
                  this.tpf1 = utils.fgetmoney(JSON.parse(element.beizhu).tpf)
                  this.tpfbz = JSON.parse(element.beizhu).tpf
                  if (this.lx === '01') {
                    this.tpf = ''
                    this.tpf1 = ''
                  } else {
                    this.gqf = ''
                    this.gqf1 = ''
                  }
                  this.dzfwf2 = utils.fgetmoney(JSON.parse(element.beizhu).dzfwfs)
                  this.dzfwf3 = utils.fgetmoney(JSON.parse(element.beizhu).dzfwfs)
                  console.log('tpf===>>>>', this.tpf)
                  console.log('tpfbz===>>>>', this.tpfbz)
                }
              }
              this.zj = parseFloat(this.zj) + parseFloat(JSON.parse(element.beizhu).jpjg)
            }
            if (element.bzlb === '01') {
              this.spdate.push(JSON.parse(element.beizhu))
              this.thgcbzid = element.bzid
            }
            console.log('thgcbzid-->', this.thgcbzid)
          })
          console.log('<<<<<<<<<<<<<', this.spdate)
          this.sqrDepName = this.spdate[0].sqrDepName
          this.sqrFilepath = this.spdate[0].sqrFilepath
          this.sqrZzmm = this.spdate[0].sqrZzmm
          this.sqCzy = this.spdate[0].sqCzy
          this.sqrgrbh = this.spdate[0].sqrgrbh
          this.sqruserid = this.spdate[0].sqruserid
          this.fsdd = res.results[0].fsdd
          this.fssj = res.results[0].fssj

          this.zjhm = this.spdate[0].zjhm
          this.sjhm = this.spdate[0].sjhm
          this.sy = this.spdate[0].shiyou
          this.deptname = this.spdate[0].deptname
          this.lrczy = this.spdate[0].lrczy
          this.lrczyid = this.spdate[0].lrczyid
          this.xmbm = this.spdate[0].xmbm
          this.xmmcs = this.spdate[0].xmmcs
          this.sfzz = this.spdate[0].sfzz
          this.bz = this.spdate[0].bz
          this.dxbh = this.spdate[0].dxbh
          this.jpzjg = this.spdate[0].jpzjg
          this.jpjj = this.spdate[0].jpjj
          this.mhjj = this.spdate[0].mhjj
          this.bxf = this.spdate[0].bxf
          this.dzfwf = this.spdate[0].dzfwf
          if (this.jpzjg !== 0) {
            this.jpzjg1 = utils.fgetmoney(this.spdate[0].jpzjg)
            this.jpjj1 = utils.fgetmoney(this.spdate[0].jpjj)
            this.mhjj1 = utils.fgetmoney(this.spdate[0].mhjj)
            this.bxf1 = utils.fgetmoney(this.spdate[0].bxf)
            this.dzfwf1 = utils.fgetmoney(this.spdate[0].dzfwf)
            this.fsfwf1 = utils.fgetmoney(this.spdate[0].fsfwf)
          }

          this.spfx = true
        } else {
          this.spfx = false
          message.error(res.msg, 1)
        }
      })
    } catch (error) {
      console.log('审批反显查询失败', error)
    }
  }
  // 机票审批
  @observable jpspData = ''
  @action.bound getjpsp = async params => {
    try {
      console.log('机票审批入参', params)
      let res = await post(API_PATH.GET_DGJP_LCFQ, params)
      console.log('机票审批查询结果', res)
      runInAction(() => {
        if (res.success) {
          this.jpspData = res.success
        } else {
          this.jpfqData = ''
          message.error(res.msg)
        }
      })
    } catch (error) {
      this.jpspData = ''
      console.log('机票审批失败', error)
    }
  }
  // 机票次数
  @observable dgjpcs = 0
  @action.bound getDgjpcs = async params => {
    try {
      console.log('订购机票次数查询入参', params)
      let res = await post(API_PATH.GET_DGJP_LCSP, params)
      console.log('订购机票次数查询反参', res)
      runInAction(() => {
        if (res.success) {
          this.dgjpcs = res.totalcount
        } else {
          this.dgjpcs = 0
          message.error(res.msg)
        }
      })
    } catch (error) {
      this.dgjpcs = 0
      console.log('订购机票次数查询失败', error)
    }
  }
  // 机票信息保存
  @observable xxbc = false
  @action getXxbc = async params => {
    try {
      console.log('机票信息保存 入参', params)
      let res = await post(API_PATH.GET_DGJP_XXLR, params)
      console.log('机票信息保存 返回', res)
      runInAction(() => {
        if (res.success) {
          this.xxbc = true
        } else {
          this.xxbc = false
          message.error(res.msg)
        }
      })
    } catch (error) {
      console.log('机票信息保存失败', error)
    }
  }
  // 项目编号
  @observable xmbh = ''
  @observable xmmc = ''
  @action getXmbh = async params => {
    try {
      console.log('xmbh 参数', params)
      let res = await post(API_PATH.GET_XMBH_FQ, params)
      console.log('xmbh 返回', res)
      runInAction(() => {
        if (res.success) {
          this.xmbh = res.results[0].xmbh
          this.xmmc = res.results[0].xmmc
          console.log('xmbh:', this.xmbh)
        } else {
          message.error(res.msg)
        }
      })
    } catch (error) {
      console.log('xmbh查询失败', error)
    }
  }

  // 退回节点查询
  @observable thjd = {};
  @action setThjd = v => {
    this.thjd = v
  }
  @action.bound getThjd = async params => {
    try {
      let res = await post(API_PATH.GET_KHJD_THJD, params)
      console.log('退回节点查询===', res)
      runInAction(() => {
        if (res) {
          this.setThjd(res)
        }
      })
    } catch (error) {
      console.log('退回节点查询失败', error)
    }
  }
}

export default new Store()
