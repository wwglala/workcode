/*
 * @Date: 2019-08-19 09:27:43
 * @LastEditTime: 2020-05-21 16:55:59
 * @Description: file content
 */
import React, { Component } from 'react'
import { Form } from 'antd'
import TopHeader from './TopHeader'
import { lcStorage } from '../../utils/storage'
import componentsRender from './components'
import SYCard from './SYCard'
import './style.less'
import Store from './store'

@Form.create()
class SYPage extends Component {
  static defaultProps = {
    components: [],
    params: [],
    comStore: { sendRequest: () => { } },
    onGetParams: () => { },
    status: 1,
    isHeader: true,
    TopHeaderProps: {},
    matter: {
      content: '',
    },
    content: { content: '' },
    history: { content: '' },
    rule: { content: '' },
    material: {},
    process: {},
    comment: {},
    matterRows: {},
    button: {
      onOk: () => { },
      onCancel: () => { },
      onSubmit: () => { }
    },
    getForm: () => { },
    onClick: () => { }, // 头部信息点击事件
    categories: [],
    grxmUrl: '/DM/common/xmbm$m=query.service',
    sxbm: '05001'
  }
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      matterRows: {},
      hasFiles: false,
      upLoadKeys: [],
      ruleIsNext: false,
      checkboxKeys: [],
    }
  }
  async componentWillMount() {
    const { comStore, params, onGetParams, TopHeaderProps, sxbm } = this.props
    // 请求公共参数
    try {
      await comStore.sendRequest(params)
    } catch (e) {
      console.log(e)
    }
    // 已获取公共参数
    onGetParams(comStore)
    // 使用公共参数请求用户信息
    const bbgrxx = lcStorage.getItem('bbgrxx') || {}
    const {
      uname: username,
      zzmm: rylbmc
    } = bbgrxx
    this.setState({ userInfo: { ...bbgrxx, username, rylbmc, ...TopHeaderProps }})
    // Store.getDxlb(
    //   {
    //     sxbm,
    //     type: 'dxbmnew'
    //   }
    // ).then(() => {
    //   if (Store.dxlbRes[0]) {
    //     this.setState({
    //       dxlb: Store.dxlbRes[0].MC
    //     })
    //   }
    // })
  }
  async componentDidMount() {
    const { getForm, form, pageRef } = this.props
    if (pageRef) {
      this.props.pageRef(this)
    }
    getForm(form)
  }
  // 提交按钮中转方法
  submit = async v => {
    if (v.status !== 2) {
      // 触发规则校验
      if (this.triggerRuleValid) {
        // 防止校验还没触发完state就已经传值给提交函数
        await this.triggerRuleValid.getValidRule()
        v.onSubmit(this.state)
      } else {
        v.onSubmit(this.state)
      }
    } else {
      v.onSubmit(this.state)
    }
  }

  // 再次发起按钮中转方法
  ok = async v => {
    if (v.status === 3) {
      // 触发规则校验
      if (this.triggerRuleValid) {
        // 防止校验还没触发完state就已经传值给提交函数
        await this.triggerRuleValid.getValidRule()
        v.onOk(this.state)
      } else {
        v.onOk(this.state)
      }
    } else {
      v.onOk(this.state)
    }
  }

  // 用于多类材料时判断是否上传
  getFilesKey = async value => {
    let { upLoadKeys } = this.state
    if (value.hasFiles) {
      if (!upLoadKeys.includes(value.keys)) upLoadKeys.push(value.keys)
    } else {
      upLoadKeys = upLoadKeys.filter(item => !(item === value.keys))
    }
    this.setState({ upLoadKeys })
  }

  // 用于不同模块类的判断是否复选
  toPushCheckKeys = async object => {
    let { checkboxKeys } = this.state
    console.log(object, 'checkboxKeys')
    if (checkboxKeys.length === 0) {
      checkboxKeys.push(object.obj)
    } else if (object.isChecked) {
      checkboxKeys = checkboxKeys.filter(item => !(item.id === object.obj.id))
    } else {
      let ids = []
      checkboxKeys.forEach(item => {
        ids.push(item.id)
      })
      if (!ids.includes(object.obj.id)) checkboxKeys.push(object.obj)
    }
    this.setState({ checkboxKeys })
  }
  render() {
    const { components, onClick, isHeader, TopHeaderProps, categories, form, pageForm, grxmUrl, sxbm } = this.props
    const renderArr = components.map(v => {
      if (v.isShow) {
        let defaultProps = {}
        let persistProps = {}
        switch (v.type) {
          case 'comment':
            defaultProps = {
              defaultValue: '',
              editable: true,
              rows: 5,
              maxLength: 100,
              onChange: value => { this.setState({ comment: value }) }
            }
            break
          case 'matter':
            defaultProps = {
              onChange: value => { this.setState({ matterRows: value === undefined ? {} : value }) }
            }
            break
          case 'files':
            defaultProps = {
              getFiles: value => { this.setState({ hasFiles: value }) },
              getFilesKey: value => { this.getFilesKey(value) }
            }
            break
          case 'rules':
            defaultProps = {
              ruleRef: ref => { this.triggerRuleValid = ref },
              ruleIsNext: value => { this.setState({ ruleIsNext: value }) }
            }
            break
          case 'button':
            persistProps = {
              onSubmit: () => { this.submit(v) },
              onOk: () => { this.ok(v) },
              onCancel: () => { v.onCancel(this.state) }
            }
            break
          default:
        }
        defaultProps.categories = categories
        defaultProps.checkClick = obj => { this.toPushCheckKeys(obj) }
        return componentsRender({ form: pageForm || form, ...defaultProps, ...v, ...persistProps })
      }
    })
    return (
      <div className='SYPage'>
        {
          isHeader
            ? (
              <TopHeader
                onClick={onClick}
                userInfo={TopHeaderProps}
                grxmUrl={grxmUrl}
                grxmParams={sxbm}
              />
            )
            : null
        }
        <Form>
          <SYCard>
            {renderArr}
          </SYCard>
        </Form>
      </div>
    )
  }
}
export default SYPage
