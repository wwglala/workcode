import { observable, action, runInAction } from 'mobx'
import API_PATH from 'Common/apiPath'
import { get, post } from 'Util/request'

class Store {
    // 查询头信息个人项目
    @observable dataSource = '';
    @action.bound getDataSource = async (url, params) => {
      try {
        let res = await post(url, { sxbm: params, type: 'xmbm' })
        runInAction(() => {
          if (res) {
            this.dataSource = res.results
          }
        })
      } catch (error) {
        console.log('查询头信息个人项目异常', error)
      }
    }
    // 查询对象类别
    @observable dxlbRes = {};
    @action.bound getDxlb = async (params = {}) => {
      try {
        let res = await post('/DM/common/xmbm$m=query.service', params)
        runInAction(() => {
          if (res) {
            this.dxlbRes = res.results
          }
        })
      } catch (error) {
        console.log('查询对象类别异常', error)
      }
    }
    // 查询ywlsh
    @observable ywlsh = {};
    @action setywlsh = v => {
      this.ywlsh = v
    }
    @action.bound getywlsh = async (params = {}) => {
      try {
        let res = await post('/PT/business/common/ywlsh$m=query.service', params)
        console.log('ywlsh保存结果==', res)
        runInAction(() => {
          if (res) {
            this.setywlsh(res)
          }
        })
      } catch (error) {
        console.log('ywlsh查询失败', error)
      }
    }
    // 查询xmbh
    @observable xmbh = {};
    @action setxmbh = v => {
      this.xmbh = v
    }
    @action.bound getxmbh = async (params = {}) => {
      try {
        let res = await post('/PT/business/common/xmbh$m=query.service', params)
        console.log('xmbh保存结果==', res)
        runInAction(() => {
          if (res) {
            this.setxmbh(res)
          }
        })
      } catch (error) {
        console.log('xmbh查询失败', error)
      }
    }
    // 查询sxbm
    @observable sxbm = {};
    @action setsxbm = v => {
      this.sxbm = v
    }
    @action.bound getsxbm = async (params = {}) => {
      try {
        let res = await post('/PT/business/common/ptbmb$m=query.service', params)
        console.log('sxbm保存结果==', res)
        runInAction(() => {
          if (res) {
            this.setsxbm(res)
          }
        })
      } catch (error) {
        console.log('sxbm查询失败', error)
      }
    }
    // 客户解决方案发起
    @observable khjjfafq = {};
    @action setkhjjfafq = v => {
      this.khjjfafq = v
    }
    @action.bound getkhjjfafq = async params => {
      try {
        let res = await post(API_PATH.GET_KHJJFA_FQ, params)
        console.log('请假发起结果==', res)
        runInAction(() => {
          if (res) {
            this.setkhjjfafq(res)
          }
        })
      } catch (error) {
        console.log('请假发起失败', error)
      }
    }
    // 客户解决方案数据查询
    @observable date = {};
    @action setdate = v => {
      this.date = v
    }
    @action.bound getdate = async params => {
      try {
        let res = await post(API_PATH.GET_KHJJFA_CX, params)
        console.log('客户解决方案数据查询结果==', res)
        runInAction(() => {
          if (res) {
            this.setdate(res)
          }
        })
      } catch (error) {
        console.log('客户解决方案数据查询失败', error)
      }
    }
    // 客户解决方案类型查询
    @observable lxcx = {};
    @action setlxcx = v => {
      this.lxcx = v
    }
    @action.bound getlxcx = async params => {
      try {
        let res = await post(API_PATH.GET_KHJJFA_LXCX, params)
        console.log('客户解决方案类型查询==', res)
        runInAction(() => {
          if (res) {
            this.setlxcx(res)
          }
        })
      } catch (error) {
        console.log('客户解决方案类型查询失败', error)
      }
    }
    // 客户查询
    @observable khcx = {};
    @action setkhcx = v => {
      this.khcx = v
    }
    @action.bound getkhcx = async params => {
      try {
        let res = await post(API_PATH.GET_KHJJFA_KHCXLXR, params)
        console.log('客户查询==', res)
        runInAction(() => {
          if (res) {
            this.setkhcx(res)
          }
        })
      } catch (error) {
        console.log('客户查询失败', error)
      }
    }
}
export default new Store()
