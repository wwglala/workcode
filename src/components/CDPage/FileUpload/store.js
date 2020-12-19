import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import { post, post2, postUpload, get } from '../../../utils/request'

class Store {
  @observable token = ''
  @observable spaceCode = ''
  // 档案扫描接口返回数据
  @observable scaningSource = []
  @observable hasScan = false
  // 档案查询接口返回数据
  @observable querySource = []
  @observable hasQuery = false

  // 上传到中台返回数据
  @observable upToMiddleSource = {}
  @observable hasMiddle = false

  // 上传到后台返回数据
  @observable upToBackSource = {}
  @observable hasBack = false

  // 删除到中台返回数据
  @observable delMiddleSource = {}

  // 删除到后台返回数据
  @observable delBackSource = {}

  // 档案图片加载返回数据
  @observable loadingSource = []

  // 请求spaceCode接口
  @action getSpaceCode = async (url, header) => {
    try {
      let res = await get(url, {}, { 'M-Sy-Token': this.token, ...header })
      runInAction(() => {
        this.spaceCode = res.datas[0].spaceCode
        console.log('获取spaceCode----->', res)
      })
    } catch (error) {
      runInAction(() => {
        this.spaceCode = ''
        message.error('获取spaceCode失败')
        console.log('获取spaceCode失败', error)
      })
    }
  }

  // 请求token接口
  @action getToken = async (url, header, params) => {
    try {
      let res = await post2(url, params, header)
      runInAction(() => {
        // if (res.success) {
        this.token = res.access_token
        console.log('获取token----->', res)
        // } else {
        //   this.token = ''
        //   console.log('获取token 失败', res)
        // }
      })
    } catch (error) {
      runInAction(() => {
        this.token = ''
        message.error(error.message)
        console.log('获取token失败', error)
      })
    }
  }

  // 档案扫描接口返回数据
  @action getScanSource = async (url, params = {}) => {
    try {
      let res = await post(url, params)
      runInAction(() => {
        if (res.success) {
          this.scaningSource = res.results
          this.hasScan = true
          console.log('档案扫描 成功', res)
        } else {
          this.scaningSource = []
          this.hasScan = false
          console.log('档案扫描 失败', res)
          message.error(res.msg)
        }
      })
    } catch (error) {
      runInAction(() => {
        this.scaningSource = []
        this.hasScan = false
        console.log('档案扫描 失败', error)
        message.error('档案扫描失败')
      })
    }
  }

  // 档案查询接口返回数据
  @action getQuerySource = async (url, params = {}) => {
    try {
      let res = await post(url, params)
      runInAction(() => {
        if (res.success) {
          this.querySource = res.results
          this.hasQuery = true
          console.log('档案查询 成功', res)
        } else {
          this.querySource = []
          this.hasQuery = false
          console.log('档案查询 失败', res)
          message.error(res.msg)
        }
      })
    } catch (error) {
      runInAction(() => {
        this.querySource = []
        this.hasQuery = false
        console.log('档案查询 失败', error)
        message.error('档案查询失败')
      })
    }
  }

  // 上传到中台返回数据
  @action getMiddleSource = async (url, headers, params = {}) => {
    try {
      const header = { 'M-Sy-Token': this.token, spaceCode: this.spaceCode, ...headers }
      let res = await postUpload(url, { spaceCode: this.spaceCode, ...params }, header)
      runInAction(() => {
        // if (res.success) {
        this.upToMiddleSource = res
        this.hasMiddle = true
        console.log('上传到中台 成功', res)
        // } else {
        //   this.upToMiddleSource = {}
        //   console.log('获取数据源 失败', res)
        // }
      })
    } catch (error) {
      runInAction(() => {
        this.upToMiddleSource = {}
        this.hasMiddle = false
        message.error('上传中台失败，文件超出限制')
        console.log('上传到中台 失败', error)
      })
    }
  }

  // 上传到后台返回数据
  @action getBackSource = async (url, params = {}) => {
    try {
      let res = await post(url, params)
      runInAction(() => {
        if (res.success) {
          this.upToBackSource = res.data
          this.hasBack = true
          console.log('上传到后台 成功', res)
        } else {
          this.upToBackSource = []
          this.hasBack = false
          console.log('上传到后台 失败', res)
          message.error(res.msg)
        }
      })
    } catch (error) {
      runInAction(() => {
        this.upToMiddleSource = []
        this.hasBack = false
        console.log('上传到后台 失败', error)
        message.error('上传后台失败')
      })
    }
  }

  // 删除到中台返回数据
  @action getDelMiddleSource = async (url, params = {}, headers) => {
    try {
      // const headers = {'M-Sy-Token':this.token}
      params['M-Sy-Token'] = this.token
      let res = await get(url, params, headers)
      runInAction(() => {
        // if (res.success) {
        this.delMiddleSource = res
        console.log('删除到中台 成功', res)
        // } else {
        //   this.delMiddleSource = {}
        //   console.log('获取数据源 失败', res)
        // }
      })
    } catch (error) {
      runInAction(() => {
        this.delMiddleSource = {}
        console.log('删除到中台 失败', error)
        message.error('删除中台失败')
      })
    }
  }

  // 删除到后台返回数据
  @action getDelBackSource = async (url, params = {}) => {
    try {
      let res = await post(url, params)
      runInAction(() => {
        if (res.success) {
          this.delBackSource = res.results
          console.log('删除到后台 成功', res)
        } else {
          this.delBackSource = {}
          console.log('删除到后台 失败', res)
          message.error(res.msg)
        }
      })
    } catch (error) {
      runInAction(() => {
        this.delBackSource = {}
        console.log('删除到后台 失败', error)
        message.error('删除后台失败')
      })
    }
  }

  // 加载图片数据
  @action getLoadingSource = async (url, params = {}) => {
    try {
      let res = await post(url, params)
      runInAction(() => {
        if (res.success) {
          this.loadingSource = res.results
          console.log('加载图片 成功', res)
        } else {
          this.loadingSource = []
          console.log('加载图片 失败', res)
          message.error(res.msg)
        }
      })
    } catch (error) {
      runInAction(() => {
        this.loadingSource = []
        console.log('加载图片 失败')
        message.error('加载图片失败')
      })
    }
  }

  // 下载文件接口
  @action downLoad = async (url, params = {}) => {
    try {
      params['M-Sy-Token'] = this.token
      let res = await get(url, params)
      runInAction(() => {
        console.log('下载成功', res)
      })
    } catch (error) {
      runInAction(() => {
        console.log('下载失败')
      })
    }
  }
}
export default Store
