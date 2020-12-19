import { observable, computed, configure, action, runInAction, extendObservable } from 'mobx'
import { message } from 'antd'
import API_PATH from 'Common/apiPath'
import { get, post } from 'Util/request'

// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable fileList = []
  @observable uploading = false
  @observable hackUpdataCount = 0
  @observable result = {}
  @observable fileData = ''
  @observable sfcg = false
  // 上传文件
  @action.bound uploadFile = async ({ url, data }) => {
    this.uploading = true
    const formData = new FormData()
    let hasFiles = false
    this.fileList.forEach((file, index) => {
      if (this.fileList.length === 1) {
        if (file.status !== 'done') {
          hasFiles = true
          formData.append('file', file.originFileObj)
        }
      } else if (file.status !== 'done') {
        hasFiles = true
        formData.append(`file${index + 1}`, file.originFileObj)
      }
    })
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    if (hasFiles) {
      try {
        const res = await post(url, formData)
        this.uploading = false
        this.fileData = res
        console.log('1a1a1a1a1a1', res)
        this.sfcg = res.success
        if (res.success) {
          let sucFilesName = res.data.filename.split(',')
          let sucFilesUrl = res.data.filepath.split(',')
          this.result = {
            filename: res.data.filename,
            filepath: res.data.filepath
          }
          console.log('======', this.result)
          sucFilesName.forEach((filename, index) => {
            this.fileList.map(item => {
              if (item.name === filename) {
                delete item.lastModified
                delete item.lastModifiedDate
                delete item.originFileObj
                item.percent = 100
                delete item.size
                delete item.type
                item.status = 'done'
                item.url = sucFilesUrl[index]
                return item
              }
            })
          })
          this.hackUpdataCount += 1
          console.log(this.fileList.slice())
          message.success(res.msg)
        } else {
          this.sfcg = res.success
          // 失败回调
          this.fileList.map(item => {
            if (item.status !== 'done') {
              delete item.lastModified
              delete item.lastModifiedDate
              delete item.originFileObj
              // delete item.percent
              delete item.size
              delete item.type
              item.status = 'error'
              item.url = '/'
              return item
            }
          })
          this.hackUpdataCount += 1
          message.error(res.msg)
          console.log(this.fileList.slice())
        }
      } catch (err) {
        this.uploading = false
        console.log(err)
      }
    }
  }

  // 删除文件
  @action deleteFile = file => {
    let targetIndex
    this.fileList.forEach((item, index) => {
      if (item.uid === file.uid) {
        targetIndex = index
      }
    })
    this.fileList.splice(targetIndex, 1)
    console.log(this.fileList.slice())
  }
  // 删除文件-接口
  @action deleteOnlineFile = async (file, deleteApi, xzqhbm) => {
    let targetIndex
    try {
      let res = await post(deleteApi, {
        xzqhbm,
        filepath: file.url
      })
      message.error('删除成功')
      console.log(res)
    } catch (err) {
      console.log(err)
    }

    // this.fileList.forEach((item, index) => {
    //   if (item.uid === file.uid) {
    //     targetIndex = index
    //   }
    // })
    // this.fileList.splice(targetIndex, 1)
    // console.log(this.fileList.slice())
  }

  // 更新文件列表
  @action updataFile = fileList => {
    this.fileList = fileList
  }
  // 追加文件
  @action pushFile = file => {
    this.fileList = [...this.fileList, file]
  }
  // 初始文件列表 default
  @action initFileList = defaultFileList => {
    console.log('初始化文件列表')
    this.fileList = [...defaultFileList]
  }
}

export default new Store()

