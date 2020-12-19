/* eslint-disable prefer-destructuring */
/* eslint-disable radix */
import { observable, configure, action, runInAction, extendObservable, toJS } from 'mobx'
import { Button, message, List } from 'antd'
import API_PATH from '../../../common/apiPath'
import { get, post } from '../../../utils/request'

class Store {
  @observable shiyouSe = ''
  @observable zzSe = ''

  @observable publicParam = {};
  @observable ssxm = '' // 所属项目
  @observable cssfmc = '' // 出发省份名称
  @observable sfcsmc = '' // 出发城市名称
  @observable mdsfmc = '' // 目的省份名称
  @observable mdcsmc = '' // 目的城市名称
  @observable spfxdata = []
  @observable cssfbm = '' // 出发省份编码
  @observable sfcsbm = '' // 出发城市编码
  @observable mdsfbm = '' // 目的省份编码
  @observable mdcsbm = '' // 目的城市编码
  @observable spdate = []
  @observable hbsj = '' // 航班时间
  @observable hbbc = '' // 航班班次
  @observable jpjg = '' // 机票价格
  @observable gcid = '' // 过程id
  @observable xmmcs = ''
  // 获取bpmid
  @observable bpmid = ''
  @action getBpmid = async params => {
    try {
      console.log('bpmid 入参', params)
      let res = await post(API_PATH.GET_DGJP_BPMID, params)
      console.log('bpmid 返回', res)
      runInAction(() => {
        if (res.success) {
          this.bpmid = res.data.bpmid
          console.log('bpmid:', this.bpmid)
        }
      })
    } catch (error) {
      console.log('bpmid查询失败', error)
    }
  }
  @action getSpfx = async params => {
    try {
      let res = await post(API_PATH.GET_DGJP_LCSP, params)
      console.log('spfx 返回', res)
      runInAction(async () => {
        this.jpxx3 = res.totalcount
        if (res.totalcount === 0) {
          await message.fail('流程已撤销')
        }
        if (res.success) {
          this.spfx = true
          this.spfxdata = toJS(res.results[0])
          this.xmbh = this.spfxdata.xmbh
          this.jpxx2 = res.results[0]
          this.jpxx = res.results[0].bcxx
          toJS(this.jpxx).forEach(element => {
            if (!element) {
              return
            }
            if (element.bzlb === '02') {
              let bz = JSON.parse(element.beizhu)
              bz.bzid = element.bzid
              this.jpxx1.push(bz)
              this.jpxx4.push(element.bzid)
              this.gcbzid = element.bzid
              this.zj = parseFloat(this.zj) + parseFloat(JSON.parse(element.beizhu).jpjg)
            }
            if (element.bzlb === '01') {
              this.spdate.push(JSON.parse(element.beizhu))
              this.zcfqgcbzid = element.bzid
            }
          })
          console.log(6666666666)
          console.log(this.spdate)
          this.shiyouSe = this.spdate[0].shiyou
          this.zzSe = this.spdate[0].sfzz
          this.sqrDepName = this.spdate[0].sqrDepName
          this.sqrFilepath = this.spdate[0].sqrFilepath
          this.sqrZzmm = this.spdate[0].sqrZzmm
          this.sqCzy = this.spdate[0].sqCzy
          this.sqrgrbh = this.spdate[0].sqrgrbh
          this.sqruserid = this.spdate[0].sqruserid
          this.fsdd = res.results[0].fsdd
          this.fssj = res.results[0].fssj
          if (typeof (this.sy) === 'undefined') {
            this.sy = this.spdate[0].shiyou
            console.log('sy--->', this.sy)
            this.xmbm = this.spdate[0].xmbm
            this.xmmcs = this.spdate[0].xmmcs
            this.sfzz = this.spdate[0].sfzz
            this.bz = this.spdate[0].bz
          }
        } else {
          this.spfx = false
          message.fail(res.msg, 1)
        }
      })
    } catch (error) {
      console.log('审批反显查询失败', error)
    }
  }
  // 机票信息删除
  @observable xxsc = false
  @action getXxsc = async params => {
    try {
      console.log('机票信息修改 入参', params)
      let res = await post(API_PATH.GET_DGJP_XXSC, params)
      console.log('机票信息修改 返回', res)
      runInAction(() => {
        if (res.success) {
          this.xxsc = true
        } else {
          this.xxsc = false
          message.error(res.msg)
        }
      })
    } catch (error) {
      console.log('机票信息修改失败', error)
    }
  }
  // 获取业务流水号
  @observable ywlsh = ''
  @action getYwlsh = async params => {
    try {
      console.log('ywlsh 参数', params)
      let res = await post(API_PATH.GET_DGJP_YWLSH, params)
      console.log('ywlsh 返回', res)
      runInAction(() => {
        if (res.success) {
          this.ywlsh = res.data.ywlsh
          console.log('ywlsh:', this.ywlsh)
        }
      })
    } catch (error) {
      console.log('ywlsh查询失败', error)
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
        }
      })
    } catch (error) {
      console.log('xmbh查询失败', error)
    }
  }

  // 机票清册查询
  @observable jpxx = []
  @observable jpxx1 = []
  @observable jpxx2 = []
  @observable jpxx3 = 0
  @observable jpxx4 = []
  @observable zj = 0
  @action getJpxx = async params => {
    try {
      console.log('信息查询 参数', params)
      let res = await post(API_PATH.GET_DGJP_XXCX, params)
      console.log('信息查询 返回', res)
      runInAction(() => {
        if (res.success) {
          this.jpxx = []
          this.jpxx1 = []
          this.jpxx2 = []
          this.jpxx3 = 0
          this.jpxx4 = []
          this.zj = 0
          this.jpxx = res.results[0].bcxx
          this.jpxx2 = res.results[0]
          this.jpxx3 = parseInt(res.totalcount)
          toJS(this.jpxx).forEach(element => {
            // this.jpxx1.push(element.gcbzid)
            if (element.bzlb === '02') {
              this.jpxx4.push(element.bzid)
              this.zj = parseFloat(this.zj) + parseFloat(JSON.parse(element.beizhu).jpjg)
            }
          })
        }
      })
    } catch (error) {
      console.log('订购机票信息查询失败', error)
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
          console.log('xxbc', this.xxbc)
        }
      })
    } catch (error) {
      console.log('机票信息保存失败', error)
    }
  }
  @observable jpfqData = ''
  @action.bound getjpfq = async params => {
    try {
      console.log('机票发起入参', params)
      let res = await post(API_PATH.GET_DGJP_LCFQ, params)
      console.log('机票发起查询结果', res)
      runInAction(() => {
        if (res.success) {
          this.jpfqData = res.success
        } else {
          message.error('发起失败')
        }
      })
    } catch (error) {
      this.jpfqData = ''
      console.log('机票发起失败', error)
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
        }
      })
    } catch (error) {
      this.dgjpcs = 0
      console.log('订购机票次数查询失败', error)
    }
  }
  // 项目
  @observable xmdate
  @action.bound getXmcx = async params => {
    try {
      console.log('项目查询入参', params)
      let res = await post(API_PATH.GET_XMMC, params)
      console.log('项目查询反参', res)
      runInAction(() => {
        if (res.success) {
          this.xmdate = res
        }
      })
    } catch (error) {
      this.dgjpcs = 0
      console.log('项目查询失败', error)
    }
  }

  // 出发地查询省份
  @observable cfdSfData = '';
  @action setCfdSfData = v => {
    this.cfdSfData = v
  }
  @action.bound getCfdSfData = async (params = {}) => {
    try {
      console.log('出发地查询省份 参数==', params)
      let res = await post(API_PATH.GET_DGJP_BM, params)
      console.log('出发地查询省份 返回==', res)
      runInAction(() => {
        if (res && res.results) {
          const list = []
          for (let item of res.results) {
            list.push({
              value: item.bm,
              label: item.mc,
              isLeaf: false,
            })
          }
          this.setCfdSfData(list)
        }
      })
    } catch (error) {
      console.log('出发地查询省份 失败', error)
      this.setCfdSfData(false)
    }
  }
  // 出发地查询城市
  @observable cfdCsData = '';
  @action setCfdCsData = v => {
    this.cfdCsData = v
  }
  @action.bound getCfdCsData = async (params = {}) => {
    try {
      console.log('出发地查询城市 参数==', params)
      let res = await post(API_PATH.GET_DGJP_BM, params)
      console.log('出发地查询城市 返回==', res)
      runInAction(() => {
        if (res && res.results) {
          const list = []
          for (let item of res.results) {
            list.push({
              value: item.bm,
              label: item.mc,
              isLeaf: true,
            })
          }
          this.setCfdCsData(list)
        }
      })
    } catch (error) {
      console.log('出发地查询城市 失败', error)
      this.setCfdCsData(false)
    }
  }

  // 目的地查询省份
  @observable mddSfData = '';
  @action setMddSfData = v => {
    this.mddSfData = v
  }
  @action.bound getMddSfData = async (params = {}) => {
    try {
      console.log('目的地查询省份 参数==', params)
      let res = await post(API_PATH.GET_DGJP_BM, params)
      console.log('目的地查询省份 返回==', res)
      runInAction(() => {
        if (res && res.results) {
          const list = []
          for (let item of res.results) {
            list.push({
              value: item.bm,
              label: item.mc,
              isLeaf: false,
            })
          }
          this.setMddSfData(list)
        }
      })
    } catch (error) {
      console.log('目的地查询省份 失败', error)
      this.setCfdSfData(false)
    }
  }
  // 目的地查询城市
  @observable mddCsData = '';
  @action setMddCsData = v => {
    this.mddCsData = v
  }
  @action.bound getMddCsData = async (params = {}) => {
    try {
      console.log('目的地查询城市 参数==', params)
      let res = await post(API_PATH.GET_DGJP_BM, params)
      console.log('目的地查询城市 返回==', res)
      runInAction(() => {
        if (res && res.results) {
          const list = []
          for (let item of res.results) {
            list.push({
              value: item.bm,
              label: item.mc,
              isLeaf: true,
            })
          }
          this.setMddCsData(list)
        }
      })
    } catch (error) {
      console.log('出发地查询城市 失败', error)
      this.setCfdCsData(false)
    }
  }
}
export default new Store()

