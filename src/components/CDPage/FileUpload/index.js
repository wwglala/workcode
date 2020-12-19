/* eslint-disable no-lonely-if */
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Spin, message } from 'antd'
import { FileUpload } from 'shineyue-component'
import Store from './store'

@observer
class FileUploads extends Component {
  static defaultProps = {
    disabled: false, // 禁止操作材料
    getFiles: () => { },
    getFilesKey: () => {},
    preDel: false, // 审批状态下需要删除按钮
    // 与接口交互所需参数
    ipPort: '', // 预览文件时的域名和端口
    spaceCodeUrl: '/dossier-server/space/getSpace',
    spaceCodeHeader: {},
    tokenUrl: '',
    scanningUrl: '/EAMS/business/dacj$m=scanclassifyquery.service',
    tokenHeaders: {},
    headers: {},
    queryUrl: '/EAMS/business/dacj$m=checkclassifyquery.service',
    upUrl1: '/group1/upload',
    upUrl2: '/EAMS/business/dacj$m=imageupload.service',
    delUrl1: '/group1/delete',
    delUrl2: '/EAMS/business/dacj$m=imagedelete.service',
    loadingUrl: '/EAMS/business/dacj$m=uploadimagl.service',
    tokenParams: {},
    scanningParams: {},
    queryParams: {},
    uPparams1: {},
    uPparams2: {},
    delParams1: {},
    delParams2: {},
    loadingParams: {},
    downloadBoard: false,
    downloadBoardClick: () => { }
  }
  constructor(props) {
    super(props)
    this.state = {
      allFiles: [],
      fileCode: '',
      fileName: '',
      upLoading: false,
      names: [],
      isHidden: false
    }
    this.store = new Store()
  }
  async componentDidMount() {
    this.init()
  }
  init = async() => {
    const { materialcode, spaceCodeUrl, spaceCodeHeader, scanningUrl,
      scanningParams, queryUrl, queryParams,
      status, tokenUrl, tokenParams, tokenHeaders } = this.props
    await this.store.getToken(tokenUrl, tokenHeaders, tokenParams)
    this.store.getSpaceCode(spaceCodeUrl, spaceCodeHeader)
    if (status === 1) {
      await this.store.getScanSource(scanningUrl, scanningParams)
      if (this.store.hasScan) {
        if (this.store.scaningSource.length === 0) {
          this.setState({ isHidden: true })
        } else {
          // 如果是多类材料上传，需要进行分类上传
          if (materialcode) {
            let obj = this.store.scaningSource.find(item => item.materialcode === materialcode)
            if (obj) {
              this.setState({
                fileCode: obj.materialcode,
                fileName: obj.materialname,
                sfkh: obj.sfkh
              })
            } else {
              this.setState({
                fileCode: this.store.scaningSource[0].materialcode,
                fileName: this.store.scaningSource[0].materialname,
                sfkh: this.store.scaningSource[0].sfkh
              })
            }
          } else {
            this.setState({
              fileCode: this.store.scaningSource[0].materialcode,
              fileName: this.store.scaningSource[0].materialname,
              sfkh: this.store.scaningSource[0].sfkh
            })
          }
        }
      }
    } else if (status === 2) {
      await this.store.getQuerySource(queryUrl, queryParams)
      if (this.store.hasQuery) {
        if (materialcode) {
          let source = this.store.querySource.filter(item => item.materialcode === materialcode)
          if (source.length !== 0) this.loadingFun(materialcode)
        } else {
          this.loadingFun(this.store.querySource[0].materialcode)
        }
      }
    } else {
      await this.store.getScanSource(scanningUrl, scanningParams)
      if (this.store.hasScan) {
        if (this.store.scaningSource.length === 0) {
          this.setState({ isHidden: true })
        } else {
          // 如果是多类材料上传，需要进行分类上传
          if (materialcode) {
            let obj = this.store.scaningSource.find(item => item.materialcode === materialcode)
            if (obj) {
              this.setState({
                fileCode: obj.materialcode,
                fileName: obj.materialname,
                sfkh: obj.sfkh
              })
            } else {
              this.setState({
                fileCode: this.store.scaningSource[0].materialcode,
                fileName: this.store.scaningSource[0].materialname,
                sfkh: this.store.scaningSource[0].sfkh
              })
            }
          } else {
            this.setState({
              fileCode: this.store.scaningSource[0].materialcode,
              fileName: this.store.scaningSource[0].materialname,
              sfkh: this.store.scaningSource[0].sfkh
            })
          }
        }
      }
      await this.store.getQuerySource(queryUrl, queryParams)
      if (this.store.hasQuery) {
        if (materialcode) {
          let source = this.store.querySource.filter(item => item.materialcode === materialcode)
          if (source.length !== 0) this.loadingFun(materialcode)
        } else {
          this.loadingFun(this.store.querySource[0].materialcode)
        }
      }
    }
  }
  beforeUpload = async (selectedFiles, allFiles) => {
    const len = this.state.allFiles.length

    if (allFiles.length > len) {
      this.setState({ upLoading: true })
      const { tokenUrl, tokenHeaders, tokenParams } = this.props
      const { names } = this.state
      await this.store.getToken(tokenUrl, tokenHeaders, tokenParams)
      selectedFiles.map(item => {
        if (!names.includes(item.fileName)) {
          this.upToMiddle(item.fileObj, item)
        } else {
          this.setState({ upLoading: false })
          message.warning('已存在相同的文件')
        }
      })
    } else {
      console.log(selectedFiles, this.state.allFiles, '9999999')
      this.delToBack(selectedFiles[0].fileId)
    }
  }
  // 上传到中台
  upToMiddle = async (item, itemss) => {
    console.log('upToMiddle---item----->', item)
    const { headers, upUrl1, uPparams1, uPparams2 } = this.props
    let params1 = {
      file: item,
      ...uPparams1
    }
    console.log(item.type, '000000')
    await this.store.getMiddleSource(upUrl1, headers, params1)
    const params2 = {
      ...uPparams2,
      fileType: item.name.substring(item.name.lastIndexOf('.') + 1, item.name.length),
      filePath: this.store.upToMiddleSource.path
    }
    if (this.store.hasMiddle) {
      this.upToBack(params2, itemss)
    } else {
      this.setState({ upLoading: false })
    }
  }
  // 上传到后台
  upToBack = async (params, itemss) => {
    const { upUrl2, uPparams2 } = this.props
    let params1 = {
      ...params,
      ...uPparams2,
      fileCode: this.state.fileCode,
      fileName: this.state.fileName,
      scanPage: 1,
      sfkh: this.state.sfkh,
      fileSize: itemss.fileSize
    }
    await this.store.getBackSource(upUrl2, params1)
    this.setState({ upLoading: false })
    if (this.store.hasBack && typeof (this.store.upToBackSource) === 'number') {
      itemss.fileId = this.store.upToBackSource
      itemss.path = params.filePath
      const { allFiles, names } = this.state
      allFiles.push(itemss)
      names.push(itemss.fileName)
      this.setState({ allFiles, names })
      const len = allFiles.length
      const { materialcode, getFiles, getFilesKey } = this.props
      if (len !== 0) {
        getFiles(true)
        if (materialcode) {
          getFilesKey({ hasFiles: true, keys: materialcode })
        }
      } else {
        getFiles(false)
        if (materialcode) {
          getFilesKey({ hasFiles: false, keys: materialcode })
        }
      }
    }
  }

  // 删除到后台
  delToBack = async fileId => {
    const { delUrl2, delParams2 } = this.props
    const params1 = { ...delParams2, fileId }
    await this.store.getDelBackSource(delUrl2, params1)
    const { allFiles, names } = this.state
    let array = allFiles
    let name = names
    let filePath = ''
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].fileId === fileId) {
        filePath = array[i].path
        array.splice(i, 1)
        name.splice(i, 1)
      }
    }
    this.setState({ allFiles: array, names: name })
    const len = array.length
    const { materialcode, getFiles, getFilesKey } = this.props
    if (len !== 0) {
      getFiles(true)
      if (materialcode) {
        getFilesKey({ hasFiles: true, keys: materialcode })
      }
    } else {
      getFiles(false)
      if (materialcode) {
        getFilesKey({ hasFiles: false, keys: materialcode })
      }
    }
    console.log('delToBack---filePath--->', filePath)
    this.delToMiddle(filePath)
  }

  // 删除到中台
  delToMiddle = async filePath => {
    const { delUrl1, delParams1, tokenUrl, tokenHeaders, tokenParams } = this.props
    const delParam = { path: filePath, ...delParams1 }
    await this.store.getToken(tokenUrl, tokenHeaders, tokenParams)
    this.store.getDelMiddleSource(delUrl1, delParam)
  }

  // 档案图片加载
  loadingFun = async materialcodes => {
    const { loadingUrl, loadingParams } = this.props
    const params = {
      ...loadingParams,
      materialcode: materialcodes
    }
    await this.store.getLoadingSource(loadingUrl, params)
    let files = []
    let names = []
    this.store.loadingSource.map(item => {
      let str = item.path
      str = str.substring(str.lastIndexOf('/') + 1, str.length)
      files.push({
        fileName: str,
        fileUrl: `${item.path}?download=0`,
        fileSize: item.fileSize,
        fileId: item.jnmlfileid,
        path: item.path
      })
      names.push(str)
    })
    this.setState({ allFiles: files, names })
    const len = files.length
    const { materialcode, getFiles, getFilesKey } = this.props
    console.log('+++++++++++++++', len)
    if (len !== 0) {
      getFiles(true)
      if (materialcode) {
        getFilesKey({ hasFiles: true, keys: materialcode })
      }
    } else {
      getFiles(false)
      if (materialcode) {
        getFilesKey({ hasFiles: false, keys: materialcode })
      }
    }
  }

  // 下载文件
  download = async file => {
    const { tokenUrl, tokenHeaders, tokenParams, ipPort } = this.props
    const url = ipPort + file.fileUrl
    await this.store.getToken(tokenUrl, tokenHeaders, tokenParams)
    this.store.downLoad(url)
    window.parent.postMessage({
      type: 'downLoadFile',
      fileName: file.fileName,
      fileUrl: url,
    }, '*')
  }

  preview = async file => {
    const { ipPort } = this.props
    const url = ipPort + file.fileUrl
    window.parent.postMessage({
      type: 'ylFile',
      file: {
        fileUrl: url,
        fileName: file.fileName,
      }
    }, '*')
  }
  render() {
    // 与接口交互所需参数
    const { status, disabled, preDel, ...otherProps } = this.props
    //  const {allFiles} =  this.state
    console.log('render---allFiles--->', this.state.allFiles)
    const { upLoading, isHidden } = this.state
    return (
      <div>
        <Spin tip='上传中...' spinning={upLoading}>
          <FileUpload
            downloadBoard={this.props.downloadBoard}
            downloadBoardClick={this.props.downloadBoardClick}
            // files={files}
            files={this.state.allFiles}
            accept='*'
            download={file => { this.download(file) }}
            // onChange={(a, b) => {
            //   console.log(a, b)
            // }}
            preview={file => { this.preview(file) }}
            onChange={(a, b) => { this.beforeUpload(a, b) }}
            showOnly={(status === 2 || disabled || isHidden)}
            limit={10}
            preDel={preDel}
            {...otherProps}
          />
        </Spin>
      </div>
    )
  }
}
export default FileUploads
