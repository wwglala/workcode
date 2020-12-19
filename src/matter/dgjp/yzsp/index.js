import React, { PureComponent } from 'react'
import {
  Form, Spin, Row, Col, Input, message
} from 'antd'
import { PavementSelectionNew, SYPage, SYSelect } from 'shineyue-component'
import moment from 'moment'
import apiPath from 'Common/apiPath'
import { observer } from 'mobx-react'
import UtilsMine from '../Utils'
import Store from './store'
import { getYwlsh, getBpmid } from '../../../utils/utils'

@observer
class Yzsp extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      bpmid: '',
      ywlsh: '',
      bbgrxx: Object.freeze(window.bbgrxx)
    }
  }

  async componentDidMount() {
    let ywlsh = await getYwlsh()
    this.setState({ ywlsh })
    this.getBpmid()
    this.getyzls()
    await Store.getYZLC({
      zxbm: '01',
      jgbm: '0104',
      ywbm: ' ',
      blqd: 'app_02',
      userid: '4262',
      bmid: '875',
      ywlsh: this.state.ywlsh,
      sxbm: '05014',
      Apiversion: '1.0',
      Bpmid: this.state.bbgrxx.businessKey
    })
  }
  /**
   * 获取bpmid
   */
  getBpmid = async () => {
    let bpmid = await getBpmid()
    this.setState({
      bpmid
    })
  }
  /**
   * 获取用章信息
   */
  getyzls = async () => {
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
    this.setState({
      loading: false
    })
  }

  /**
   * 提交
   * @param {} state
   * @param {类型，根据} type
   */
  submit = async (state, type) => {
    await Store.yztj({
      zxbm: this.state.bbgrxx.zxbm,
      jgbh: this.state.bbgrxx.zxbm,
      blqd: 'zmd',
      userid: this.state.bbgrxx.userid,
      grbh: this.state.bbgrxx.grhb || Store.YZdata.sqrbh,
      mc: '《2020年用章材料》',
      fs: 1,
      lb: Store.YZdata.lb,
      lbbm: '01',
      gs: Store.YZdata.gs,
      gsbh: Store.YZdata.gsbh,
      yz: Store.YZdata.yz,
      yzbh: Store.YZdata.yzbh,
      bz: Store.YZdata.bz,
      bmid: '12345',
      bmmc: Store.YZdata.bmmc,
      spzt: type === 'success' ? 2 : 3,
      lrczy: Store.YZdata.lrczy,
      spyj: Store.YZdata.comment,
      lcbz: type === 'success' ? 2 : 3,
      Apiversion: '1.0',
      cgwbh: ' ',
      cgwms: ' ',
      dxbh: this.state.bbgrxx.dxbh ? this.state.bbgrxx.dxbh : '001',
      fssl: 1,
      hbzl: '01',
      fsje: 0.0,
      fsdd: Store.YZdata.dlwz,
      fqrid: this.state.bbgrxx.userid,
      gsid: this.state.bbgrxx.gsbh,
      gsbm: this.state.bbgrxx.gsbh, // ?
      ywlsh: Store.ywlsh,
      bpmid: this.state.bbgrxx.businessKey,
      taskId: this.state.bbgrxx.taskId,
      xmbh: state.matterRows.xmbh ? state.matterRows.xmbh : ''
    })
  }

  render() {
    console.log('1111111111')
    console.log(Store.ywlsh)
    return (
      <Spin tip='获取中...' spinning={this.state.loading}>
        {
          Store.ywlsh ? (

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
                  status: 2,
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
                  status: 2,
                  content: (
                    <>
                      <Row>
                        <Col span={8} style={{ paddingLeft: 30 }}>
                          名称：
                          {Store.YZdata.mc}
                        </Col>
                        <Col span={8} style={{ paddingLeft: 30 }}>
                          份数：
                          {Store.YZdata.fs}
                        </Col>
                        <Col span={8} style={{ paddingLeft: 30 }}>
                          类别：
                          {Store.YZdata.lb}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8} style={{ paddingLeft: 30 }}>
                          公司：
                          {Store.YZdata.dlwz}
                        </Col>
                        <Col span={8} style={{ paddingLeft: 30 }}>
                          印章：
                          {Store.YZdata.yzbh}
                        </Col>
                        <Col span={8} style={{ paddingLeft: 30 }}>
                          事由：
                          {Store.YZdata.bz}
                        </Col>
                      </Row>

                    </>
                  )
                },
                UtilsMine.upDangAn({
                  status: 2, // 申请页面1，审批页面2.退回页面3
                  userid: this.state.bbgrxx.userid,
                  zxbm: this.state.bbgrxx.zxbm,
                  ywfl: '05',
                  ywlb: '05015',
                  cplx: 'dmPro',
                  proccesskey: 'rlzy_yzsp',
                  taskdefinitionkey: 'sq',
                  // ywlsh: Store.YZdata.ywlsh ? Store.YZdata.ywlsh : this.state.ywlsh, // 业务流水号
                  ywlsh: '202012_0000000807489',
                  username: this.state.bbgrxx.xingming,
                  grbh: this.state.bbgrxx.grbh,
                  bbgrxx: this.state.bbgrxx,
                  ipPort: 'http://113.125.201.131:9300',
                }),
                {
                  type: 'blank',
                  title: '规则',
                  status: 2,
                  isShow: true,
                },
                {
                  type: 'process',
                  title: '流程',
                  status: 2,
                  isShow: true,
                  processId: window.bpmJson.processInstanceId,
                  jgbh: this.state.bbgrxx.zxbm,
                  url: '/PT/business/common/spyj$m=query.service'
                },
                {
                  type: 'button',
                  isShow: true,
                  status: 2,
                  btnOk: '提交下一步',
                  btnCancel: '退回上一步',
                  onOk: state => { this.submit(state, 'success') },
                  onCancel: state => { this.submit(state, 'fail') }
                }

              ]}
            />
          ) : <div style={{ height: '100vh' }}>loading</div>
        }
      </Spin>
    )
  }
}

export default Yzsp
