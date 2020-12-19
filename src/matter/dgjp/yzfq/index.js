import React, { PureComponent } from 'react'
import {
  Form, Spin, Row, Col, Input, message, Button
} from 'antd'
import { PavementSelectionNew, SYPage, SYSelect, MultiplePavementSelection } from 'shineyue-component'
import moment from 'moment'
import { observer } from 'mobx-react'
import UtilsMine from '../Utils'
import Store from './store'
import InputWrapper from './components/InputWrapper'
import { getYwlsh, getBpmid } from '../../../utils/utils'

const FormItem = Form.Item
@Form.create()
@observer
class Yzsq extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      ywlsh: null,
      bpmid: '',
      isDisable: false,
      lbmc: '', // 类别名称
      gsmc: '', // 公司名称
      btnSelect: [],
      bbgrxx: Object.freeze(window.bbgrxx),
    }
    this.dataSource = [{ value: '01', label: '公章' }, { value: '02', label: '合同章' }, { value: '03', label: '法人章' }, { value: '04', label: '其他章' }]
  }

  componentDidMount() {
    this.getXmbh()
    if (this.props.location.pathname === '/yzfq') {
      this.getYwlsh()
    }
    this.getBpmid()
    if (this.props.location.pathname === '/yzth') {
      this.getYZLC()
      this.checkStatus()
    }
  }

  /**
   * 根据 任务状态 flowType 回应不同的响应
   */
  checkStatus = () => {
    if (this.state.bbgrxx.flowtype === 'yf') {
      this.setState({
        isDisable: true
      })
    }
    if (this.state.bbgrxx.flowtype === 'db') {
      this.setState({
        isDisable: false
      })
    }
  }

  /**
   * 获取用章历史
   */
  getYZLC = async () => {
    this.setState({
      loading: true
    })
    await Store.getYZLS({
      zxbm: this.state.bbgrxx.zxbm,
      jgbm: this.state.bbgrxx.jgbm,
      ywbm: ' ',
      userid: this.state.bbgrxx.userid,
      bpmid: this.state.bbgrxx.businessKey,
      xmbh: this.state.bbgrxx.xmbh,
      grbh: this.state.bbgrxx.grbh,
      xmmc: '用章',
      sxbm: '05014',
      blqd: this.state.bbgrxx.blqd,
      apiversion: this.state.bbgrxx.apiversion,
    })
    console.log('*********************')
    console.log(Store.YZdata.yz)
    let arr = Store.YZdata.yz.split(',')
    this.setState((prevState, prevProps) => {
      delete prevState.btnSelect
      return prevState
    })
    this.setState({
      btnSelect: arr
    })

    this.setState({
      loading: false,
    })
    this.setItems()
  }

  /**
   * input回显
   */
  setItems = async () => {
    const { getFieldsValue, setFieldsValue } = this.props.form
    // let keys = Object.keys(getFieldsValue())
    // for (let item of keys) {
    //   let obj = {}
    //   obj[item] = Store.YZdata[item]
    //   setFieldsValue(obj)
    // }
    setFieldsValue({ mc: Store.YZdata.mc })
    setFieldsValue({ fs: Store.YZdata.fs })
    setFieldsValue({ sy: Store.YZdata.bz })
    setFieldsValue({ yz: Store.YZdata.yz })
  }

  /**
   * 获取项目编号
   */
  getXmbh = async () => {
    await Store.getXmbh({
      sxbm: '05015',
      jgbh: this.state.bbgrxx.zxbm,
      userid: this.state.bbgrxx.userid,
      page: 1,
      size: 10
    })
  }
  /**
   * 获取业务流水号
   */
  getYwlsh = async () => {
    let ywlsh = await getYwlsh()
    this.setState({
      ywlsh
    })
  }
  /**
   * 获取 bpmid
   * @param {*} state
   */
  getBpmid = async () => {
    let bpmid = await getBpmid()
    this.setState({ bpmid })
  }

  /**
   * 提交用章
   * @param {} state button按钮传入的值
   */
  submit = (state, type) => {
    const { validateFields } = this.props.form
    validateFields(async (errs, value) => {
      console.log(value)

      if (!state.hasFiles) {
        message.error('请上传附件')
        return
      }
      let valid = Object.keys(value).every(item => {
        return typeof value[item] !== 'undefined'
      })
      if (valid) {
        this.setState({
          loading: true
        })
        await Store.yztj({
          zxbm: this.state.bbgrxx.zxbm,
          jgbh: this.state.bbgrxx.zxbm,
          jgbm: this.state.bbgrxx.jgbm,
          grbh: this.state.bbgrxx.grbh, // 公共参数
          blqd: this.state.bbgrxx.blqd, // 公共参数
          userid: this.state.bbgrxx.userid, // 公共参数'
          apiversion: this.state.bbgrxx.apiversion, // 公共参数
          bmmc: this.state.bbgrxx.deptname, // 公共参数
          lrczy: this.state.bbgrxx.xingming, // 公共参数
          fsdd: this.state.bbgrxx.locationMsg ? this.state.bbgrxx.locationMsg.data.address : '', // 公共参数
          dlwz: this.state.bbgrxx.locationMsg ? this.state.bbgrxx.locationMsg.data.address : '', // 公共参数
          username: this.state.bbgrxx.xingming, // 公共参数
          dxbh: this.state.bbgrxx.grbh,
          // getFieldValue('gs') ? getFieldValue('gs') : '', // 写死都传这个
          // 固定
          lcbz: type || 0, // 流程标志 0发起 1再次发起 2审批通过 3退回  4撤销
          spzt: '2', // 1审批通过，2发起，3退回，4撤销
          spyj: ' ', // 写死都传这个
          bpmid: 0, // 发起传空 审批公共参数会给
          taskname: '', // 发起传空 审批查询返现会给
          taskId: '', // 发起传空 审批公共参数会给
          ywlsh: this.state.ywlsh, // 发起传空 审批查询返现会给
          fsje: 0,
          hbzl: '01',
          fssl: 1,
          hfgs: 0,
          cgwbh: ' ',
          cgwms: ' ',
          comment: '同意',

          // 页面参数
          xmbh: state.matterRows.xmbh ? state.matterRows.xmbh : '',
          ssxm: state.matterRows.xmmc ? state.matterRows.xmmc : '',
          ssxmbh: state.matterRows.xmbh ? state.matterRows.xmbh : '',
          mc: value.mc ? value.mc : '',
          fs: window.parseInt(value.fs ? value.fs : ''),
          lb: this.state.lbmc,
          lbbh: value.lb ? value.lb : '',
          gs: this.state.gsLabel,
          gsbh: value.dw ? value.dw : '',
          gsid: Store.gsid,
          gsbm: Store.gsbm,
          yz: value.yz.reduce((pre, cur) => { return `${pre + cur.value},` }, '') || '',
          yzbh: value.yz.reduce((pre, cur) => { return `${pre + cur.label},` }, '') || '',
          bz: value.sy ? value.sy : '',
          sfht: 0,

          sqrDeptName: this.state.bbgrxx.deptname,
          sqrFilePath: this.state.bbgrxx.headphoto,
          sqrZzmm: this.state.bbgrxx.zzmm,
          sqCzy: this.state.bbgrxx.xingming,
          sqrbh: this.state.bbgrxx.grbh,
          sqrid: this.state.bbgrxx.userid,
          sqrgsbh: this.state.bbgrxx.gsbh,
          sqrbmbh: this.state.bbgrxx.bmbh,
          ywfl: '05', // 业务分类，按自己模块赋值
          ywlb: '05014', // 业务类别，按自己模块赋值
          proccesskey: 'rlzy_yzsq', // 按自己模块流程传值
          zwjb: this.state.bbgrxx.postbz

        })

        this.setState({
          loading: false
          // eslint-disable-next-line no-nested-ternary
        }, () => { message.info(type ? type === 1 ? '已再次提交' : '返回上一级' : '发起成功') })
      }
    })
  }

  /**
   * 判断当前路由是否时 退回页面路由
   */
  getShow = () => this.props.location.pathname === '/yzth'

  /**
   * 文件上传 params 处理
   */
  getFileParams = () => {
    let params = {
      // eslint-disable-next-line no-nested-ternary
      status: this.getShow() ? this.state.bbgrxx.flowtype === 'yf' ? 2 : 3 : 1, // 申请页面1，审批页面2.退回页面3
      userid: this.state.bbgrxx.userid,
      zxbm: this.state.bbgrxx.zxbm,
      ywfl: '05',
      ywlb: '05015',
      cplx: 'dmPro',
      // proccesskey: 'rlzy_yzsp',
      proccesskey: 'gr_dgjp',
      taskdefinitionkey: 'sq',
      // ywlsh: Store.YZdata.ywlsh ? Store.YZdata.ywlsh : this.state.ywlsh, // 业务流水号
      ywlsh: '202012_0000000807489',
      username: this.state.bbgrxx.xingming,
      grbh: this.state.bbgrxx.grbh,
      bbgrxx: this.state.bbgrxx,
    }
    if (!this.getShow()) {
      params.ipPort = 'http://113.125.201.131:9300'
    }
    return params
  }

  /**
   * btn 点击
   */
  btnClick = v => {
    console.log(v)
  }

  render() {
    console.log('============')
    console.log(this.state.btnSelect)
    console.log(Store.ywlsh)

    const { getFieldDecorator } = this.props.form
    return (
      <Spin tip='加载中...' spinning={this.state.loading}>
        {
          ((this.getShow() && Store.ywlsh) || this.state.ywlsh)
            ? (
              <SYPage
                status={1}
                TopHeaderProps={
                  {
                    avatar: this.state.bbgrxx.headphoto,
                    badge: '',
                    name: this.state.bbgrxx.xingming,
                    des: this.state.bbgrxx.zzmm,
                    belong: this.state.bbgrxx.deptname,
                    location: this.state.bbgrxx.locationMsg ? this.state.bbgrxx.locationMsg.data.address : '',
                    time: moment().format('YYYY-MM-DD HH:mm:ss')
                  }
                }
                components={[
                  {
                    type: 'matter',
                    title: '项目',
                    isShow: true,
                    status: 1,
                    params: {
                      sxbm: '05014', // 写死sxbm
                      userid: this.state.bbgrxx.userid,
                      page: '1',
                      size: '20',
                      jgbh: this.state.bbgrxx.zxbm,
                      xmmc: ''
                    },
                    labelKey: 'xmmc',
                    valueKey: 'xmbh',

                  },
                  {
                    type: 'history', // 历史
                    status: 3,
                    isShow: true,
                    params: {
                      jgbh: this.state.bbgrxx.zxbm, // 传zxbm
                      hzzq: '年', // 汇总周期
                      hzxx: '',
                      key1: '05015', // sxbm
                      key2: this.state.bbgrxx.grbh, // grbh
                      key3: '',
                      key4: '',
                      ksrq: moment(new Date(new Date().getFullYear(), moment().month(), 1)).format('YYYY-MM-DD') // 查询日期
                    },
                    labelKey: 'hzxxmc', // 默认不动
                    valuelKey: 'qmz', // 默认不动
                  },
                  {
                    type: 'content',
                    title: '内容',
                    isShow: true,
                    status: 1,
                    content: (
                      <>
                        <Row>
                          <Col span={8} style={{ paddingLeft: 14 }}>
                            <FormItem label='名称:'>

                              {
                                getFieldDecorator('mc', {
                                  rules: [{ required: true, message: '填写名称' }]
                                })(<Input disabled={this.state.isDisable} className='basic' style={{ width: '93%' }} placeholder='请输入' />)
                              }
                            </FormItem>
                          </Col>
                          <Col span={8} style={{ paddingLeft: 14 }}>
                            <FormItem label='份数:'>
                              {
                                getFieldDecorator('fs', {
                                  rules: [{ required: true, message: '填写份数' }]
                                })(<Input disabled={this.state.isDisable} className='basic' style={{ width: '93%' }} placeholder='请输入' />)
                              }
                            </FormItem>
                          </Col>
                          <Col span={8} style={{ paddingLeft: 14 }}>
                            <FormItem label='类别:'>
                              {
                                getFieldDecorator('lb', {
                                  rules: [{ required: true, message: '填写类别' }],
                                  initialValue: Store.YZdata.lbbh || ''
                                })(<SYSelect
                                  onMount={k => { console.log(k, 'xxxxxxxxx') }}
                                  onChange={(k, v, m) => { this.setState({ lbmc: m[0].mc }) }}
                                  disabled={this.state.isDisable}
                                  placeholder='请选择'
                                  url='/PT/business/common/jgbmb$m=query.service'
                                  params={{
                                    bmlx: 'yzwjlb',
                                    jgbh: this.state.bbgrxx.zxbm,
                                    page: 1,
                                    size: 20
                                  }}
                                  className='basic'
                                  nameKey='mc'
                                  valueKey='bm'
                                />)
                              }
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={8} style={{ paddingLeft: 14 }}>
                            <FormItem label='单位:'>
                              {
                                getFieldDecorator('dw', {
                                  rules: [{ required: true, message: '填写单位' }],
                                  initialValue: Store.YZdata.gsbh || ''
                                })(<SYSelect
                                  disabled={this.state.isDisable}
                                  onChange={(k, v, m) => { this.setState({ gsmc: m[0].GSMC }) }}
                                  placeholder='请选择'
                                  className='basic'
                                  url='/DM/yzsq/jg/yzsq$m=companyquery.service'
                                  params={{
                                    jgbh: this.state.bbgrxx.zxbm,
                                    product_id: this.state.bbgrxx.zxbm,
                                    page: 1,
                                    size: 10
                                  }}
                                  style={{ width: '93%' }}
                                  nameKey='GSMC'
                                  valueKey='GSBM'
                                />)
                              }
                            </FormItem>
                          </Col>
                          {
                            this.state.btnSelect ? (
                              <Col span={16} style={{ paddingLeft: 14 }}>
                                <FormItem label='印章:'>
                                  {((this.state.btnSelect !== []) || !this.getShow())
                                    ? getFieldDecorator('yz', {
                                      rules: [{ required: true, message: '选择印章' }]
                                    })(<MultiplePavementSelection
                                      dataSource={this.dataSource}
                                      title='label'
                                      onChange={v => this.btnClick(v)}
                                      checked={this.state.btnSelect}
                                      checkedName='value'
                                    />)
                                    : <div></div>}

                                </FormItem>
                              </Col>
                            )
                              : <div></div>
                          }
                        </Row>
                        <Row>
                          <Col span={16} style={{ paddingLeft: 14 }}>
                            <FormItem label='事由:'>
                              {
                                getFieldDecorator('sy', {
                                  rules: [{ required: true, message: '填写事由' }]
                                })(<Input disabled={this.state.isDisable} className='basic' style={{ width: '93%' }} placeholder='请输入' />)
                              }
                            </FormItem>
                          </Col>
                        </Row>
                      </>
                    )
                  },
                  UtilsMine.upDangAn(this.getFileParams()),
                  {
                    type: 'blank',
                    status: 1,
                    isShow: true,
                    title: '规则',
                    content: (
                      <>
                      </>
                    )
                  },
                  {
                    type: 'button',
                    isShow: !this.getShow(),
                    status: 1,
                    btn: '提交',
                    onSubmit: state => this.submit(state),
                  },
                  {
                    type: 'button',
                    isShow: !this.state.isDisable && this.getShow(),
                    status: 3,
                    btnOk: '提交下一步',
                    btnCancel: '返回上一步',
                    onOk: state => this.submit(state, 1),
                    onCancel: state => this.submit(state, 4),
                  }

                ]}
              />
            )
            : <div>loading</div>
        }
      </Spin>
    )
  }
}

export default Yzsq
