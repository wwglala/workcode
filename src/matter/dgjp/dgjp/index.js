import React, { Component } from 'react'
import {
  Form, Spin, Row, Col, Modal, DatePicker, Button, Cascader, Input, message
} from 'antd'
import { SYTable, SYTextArea, PavementSelectionNew, AddButton, SYInputMoney, Option, SYPage, HistoryList, SYSelect } from 'shineyue-component'
import moment from 'moment'
// import SYSelect from 'Components/SYSelect'
import apiPath from 'Common/apiPath'
import { ssStorage } from 'Util/storage'
import className from 'classnames'
import { inject, observer } from 'mobx-react'
import styles from './index.less'
import UtilsMine from '../Utils'
import Store from './store'

const SyCenterRow = props => {
  const { children, test } = props
  return (
    <Row type='flex' justify='center' align='middle' className={className({ [styles.testRed]: test }, styles.syrow)} {...props}>{children}</Row>
  )
}
const FormItem = Form.Item

@Form.create()
@observer
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // eslint-disable-next-line react/no-unused-state
      resetStatus: true,
      modalMxVisible: false,
      bbgrxx: {},
      // eslint-disable-next-line react/no-unused-state
      dateSource: {},
      shiyou: '', // 事由
      xm: '', // 项目
      sfzz: '', // 是否中转
      // eslint-disable-next-line react/no-unused-state
      bz: '', // 备注
      xmbh: '', // 项目编号
      // eslint-disable-next-line react/no-unused-state
      bpmid: '', // 流程id
      gcid: 0, // 过程id
      // eslint-disable-next-line react/no-unused-state
      gcbzid: 0,
      xmbm: '',
      xmmcs: '',
      // eslint-disable-next-line react/no-unused-state
      replease: true,
      disable: false,
      shiyouSe: '',
      zzSe: ''

    }
  }

  async UNSAFE_componentWillMount() {
    let bbgrxx = ssStorage.getItem('bbgrxx')
    await this.setState({
      bbgrxx
    })
    await Store.getJpxx({
      zxbm: this.state.bbgrxx.zxbm,
      jgbh: this.state.bbgrxx.zxbm,
      dxbm: '009',
      blqd: this.state.bbgrxx.blqd,
      userid: this.state.bbgrxx.userid,
      lrczyid: this.state.bbgrxx.userid,
      apiversion: '1.0',
      sxbm: '05015',
      spzt: '0',
      page: 1,
      size: 20
    })

    if (Store.jpxx3 > 0) {
      Store.ywlsh = Store.jpxx2.ywlsh
      Store.xmbh = Store.jpxx2.xmbh
      Store.gcid = Store.jpxx2.gcid
      await this.setState({
        ywlsh: Store.ywlsh,
        xmbh: Store.xmbh,
        gcid: Store.gcid,
      })
    } else {
      await Store.getYwlsh({ jgbh: bbgrxx.zxbm })
      await Store.getBpmid()
      await Store.getXmbh({
        sxbm: '05015',
        jgbh: bbgrxx.zxbm,
        userid: bbgrxx.userid,
        page: 1,
        size: 10
      })
      await this.setState({
        bpmid: Store.bpmid,
        ywlsh: Store.ywlsh,
        xmbh: Store.xmbh,
      })
    }

    console.log('qqqqqqqqqq')
    console.log(Store.spdate)
  }

  async componentDidMount() {
    console.log(this.props)
    let bbgrxx = ssStorage.getItem('bbgrxx')
    if (this.props.location.pathname === '/td') {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        disable: true
      })

      await Store.getSpfx({
        zxbm: bbgrxx.zxbm,
        jgbh: bbgrxx.zxbm,
        dxbm: '009',
        blqd: bbgrxx.blqd,
        lrczyid: bbgrxx.userid,
        userid: bbgrxx.userid,
        apiversion: '1.0',
        sxbm: '05015',
        // spzt: '3',
        page: 1,
        size: 20,
        bpmid: window.bpmJson.bpmid
      })
      console.log('============')
      console.log(Store.spdate[0])
      // eslint-disable-next-line react/no-did-mount-set-state
      await this.setState({
        shiyouSe: '01',
        zzSe: '01',
      })

      console.log(Store.spdate[0].shiyou)
    }
  }

  mxClick = () => {
    if (this.state.sfzz === '') {
      message.warning('请先选择是否中转')
      return
    }
    if (this.state.sfzz === '02' && Store.jpxx1.length >= 1) {
      message.warning('非中转只能购买一张机票')
      return
    }
    if (this.state.sfzz === '01' && Store.jpxx1.length >= 2) {
      message.warning('中转只能购买两张张机票')
      return
    }
    this.setState({
      modalMxVisible: true
    })
    Store.getCfdSfData({
      bmlx: 'province',
      page: 1,
      size: 100
    })
    Store.getMddSfData({
      bmlx: 'province',
      page: 1,
      size: 100
    })
  }
  mxCancel = () => {
    this.setState({
      modalMxVisible: false
    })
  }
  jpjgChange = async v => {
    Store.jpjg = v
    console.log('机票价格', Store.jpjg)
  }
  // 目的地联动
  mddSfSelectloadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    // load options lazily
    setTimeout(async () => {
      targetOption.loading = false
      await Store.getMddCsData({
        bmlx: 'city',
        bm1: targetOption.value,
        page: 1,
        size: 100
      })
      if (Store.mddCsData) {
        targetOption.children = Store.mddCsData
      } else {
        targetOption.children = []
      }

      Store.mddSfData = [...Store.mddSfData]
    }, 100)
  }
  // 出发地联动
  cfdSfSelectloadData = selectedOptions => {
    console.log('selectedOptions', selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    // load options lazily
    setTimeout(async () => {
      targetOption.loading = false
      await Store.getCfdCsData({
        bmlx: 'city',
        bm1: targetOption.value,
        page: 1,
        size: 100
      })
      if (Store.cfdCsData) {
        targetOption.children = Store.cfdCsData
      } else {
        targetOption.children = []
      }

      Store.cfdSfData = [...Store.cfdSfData]
    }, 100)
  }
  // 出发地
  cfdSelectChange = (value, selectedOptions) => {
    console.log('出发地-->', value, selectedOptions)
    if (selectedOptions.length !== 0) {
      Store.cfsfbm = selectedOptions[0].value
      Store.cfsfmc = selectedOptions[0].label
      console.log('出发省份-bm-mc->', Store.cfsfbm, Store.cfsfmc)
      Store.sfcsbm = selectedOptions[1].value
      Store.sfcsmc = selectedOptions[1].label
      console.log('出发城市-bm-mc->', Store.sfcsbm, Store.sfcsmc)
    }
  };

  bcClick = async () => {
    console.log(this.props.form)
    const { getFieldDecorator, getFieldValue, validateFieldsAndScroll } = this.props.form
    let yz1 = ['cfsf', 'sfcs', 'mdsf', 'mdcs', 'hbsj', 'hbbc', 'jpjg', 'cfd', 'mdd']
    await this.props.form.validateFields(yz1, async (err, values) => {
      if (!err) {
        if (Store.sfcsmc === Store.mdcsmc) {
          message.warning('出发地和目的地不能相同')
          return
        }
        console.log('Store.jpxx1Store.jpxx1Store.jpxx1', Store.jpxx1)
        if (Store.jpxx1.length === 1) {
          if (Store.jpxx1[0].hbsj > moment(getFieldValue('hbsj')).format('YYYY-MM-DD')) {
            message.warning('第二趟航班应在第一趟之后')
            return
          }
          if (Store.jpxx1[0].mdcs !== Store.sfcsmc) {
            message.warning('第一趟航班目的地应与第二趟航班出发地相同')
            return
          }
        }
        await Store.getXxbc({
          xmbh: this.state.xmbh, // 项目编号
          xmlb: '01',
          jgbh: this.state.bbgrxx.zxbm, // 机构编号
          sxbm: '05015', // 事项编号
          xmmc: '订购机票', // 项目名称

          userName: this.state.bbgrxx.username,
          dlwz: this.state.bbgrxx.locationMsg.data.address,
          userid: this.state.bbgrxx.userid,
          fsdd: this.state.bbgrxx.locationMsg.data.address,
          fssj: moment().format('YYYY-MM-DD HH:mm:ss'),
          hbzl: '01', // 货币种类
          fsje: 100, // 发生金额
          fssl: 1, // 发生数量
          hfgs: 1, // 耗费工时
          ywlsh: this.state.ywlsh, // 业务流水号
          blqd: this.state.bbgrxx.blqd, // 办理渠道
          cgwbh: ' ', // 成果物编号
          cgwms: ' ', // 成果物名称
          dxbm: '009', // 对象编码
          dxbh: this.state.bbgrxx.grbh,
          bpmid: 0, // 流程id
          spzt: '0', // 审批状态

          gcid: this.state.gcid, // 过程id

          cfsf: Store.cfsfmc, // 出发城市名称
          sfcs: Store.sfcsmc, // 出发省份名称
          mdsf: Store.mdsfmc, // 目的城市名称
          mdcs: Store.mdcsmc, // 目的省份名称
          cfsfbm: Store.cfsfbm, // 出发城市编码
          sfcsbm: Store.sfcsbm, // 出发省份编码
          mdsfbm: Store.mdsfbm, // 目的城市编码
          mdcsbm: Store.mdcsbm, // 目的省份编码

          hbsj: moment(getFieldValue('hbsj')).format('YYYY-MM-DD'), // 航班时间
          hbbc: getFieldValue('hbbc'), // 航班班次
          jpjg: Store.jpjg, // 机票价格
          grbh: this.state.bbgrxx.grbh, // 个人编号
          apiversion: '1.0', // api版本号
        })
        if (Store.xxbc) {
          message.success('保存成功')
          this.mxCancel()
          await this.setState({
            resetStatus: false
          })
          Store.zj = 0
          Store.jpxx1 = []
          Store.jpxx3 = 0
          await Store.getJpxx({
            zxbm: this.state.bbgrxx.zxbm,
            jgbh: this.state.bbgrxx.zxbm,
            dxbm: '009',
            blqd: this.state.bbgrxx.blqd,
            userid: this.state.bbgrxx.userid,
            lrczyid: this.state.bbgrxx.userid,
            apiversion: '1.0',
            sxbm: '05015',
            spzt: '0',
            page: 1,
            size: 20
          })
          if (Store.jpxx3 > 0) {
            Store.gcid = Store.jpxx2.gcid
            this.setState({
              gcid: Store.gcid,
            })
            console.log('gcid.....', this.state.gcid)
          }
          await this.setState({
            resetStatus: true
          })
        } else {
          message.error('保存失败')
        }
      } else {
        // message.destroy()
        // message.error('请输入对应信息')
        // eslint-disable-next-line no-useless-return
        return
      }
    })
  }
  submit = async () => {
    if (this.state.xm === '') {
      message.error('选择项目')
      return
    }
    if (this.state.sfzz === '') {
      message.error('选择中转')
      return
    }
    let isld = 0
    if (this.state.bbgrxx.postbz === '1' || this.state.bbgrxx.postbz === '2' || this.state.bbgrxx.postbz === '3') {
      isld = 1
    } else {
      isld = 0
    }

    await Store.getBpmid()
    await Store.getjpfq({
      xmbh: this.state.xmbh,
      xmlb: '01',
      jgbh: this.state.bbgrxx.zxbm,
      // jgbh: '2208820002',
      sxbm: '05015',
      xmmc: '订购机票',
      zxbm: this.state.bbgrxx.zxbm,
      // zxbm: '2208820002',
      isld,

      userName: this.state.bbgrxx.username,
      dlwz: this.state.bbgrxx.locationMsg.data.address,
      userid: this.state.bbgrxx.userid,
      fsdd: this.state.bbgrxx.locationMsg.data.address,
      fssj: moment().format('YYYY-MM-DD HH:mm:ss'),
      hbzl: '01',
      fsje: Store.zj,
      fssl: 1,
      hfgs: 1,
      ywlsh: this.state.ywlsh,
      blqd: this.state.bbgrxx.blqd,
      cgwbh: ' ',
      cgwms: ' ',
      dxbm: '009',
      dxbh: this.state.bbgrxx.grbh,
      bpmid: Store.bpmid, // 提代码换一下bpmJson.bpmid
      spzt: '2',
      gcid: this.state.gcid,
      lcbz: 0,
      lrczy: this.state.bbgrxx.username,
      lrczyid: this.state.bbgrxx.userid,
      deptname: this.state.bbgrxx.deptname,

      sfzz: this.state.sfzz,
      xmbm: this.state.xmbm,
      xmmcs: this.state.xmmcs,
      shiyou: this.state.shiyou,
      bz: this.props.form.getFieldValue('bz'),
      sjhm: this.state.bbgrxx.sjhm,
      zjhm: this.state.bbgrxx.zjhm,
      zj: Store.zj,

      grbh: this.state.bbgrxx.grbh,
      apiversion: '1.0',
      description: `您好，【${this.state.bbgrxx.deptname}-${this.state.bbgrxx.username}】发起了【订购机票】申请，请您审批。`,
      spyj: '【同意】',
      comment: '【同意】',

      sqrDepName: this.state.bbgrxx.deptname,
      sqrFilepath: this.state.bbgrxx.headphoto,
      sqrZzmm: this.state.bbgrxx.zzmm,
      sqCzy: this.state.bbgrxx.xingming,
      sqrgrbh: this.state.bbgrxx.grbh,
      sqruserid: this.state.bbgrxx.userid,
      fqrid: this.state.bbgrxx.userid,
    })
    if (Store.jpfqData) {
      message.destroy()
      await message.success('发起成功')
    } else {
      message.destroy()
      await message.error('发起失败')
    }
    await this.setState({
      loading: false
    })
  }

  xmChange = async (v, a, b) => {
    console.log('项目啊啊啊', v)
    console.log('项目波波波', a.props.name)
    console.log('bbbbbbb', b)
    if (typeof (a) === 'undefined') {
      let params = {
        project: {
          xmlb: '02',
          jgbh: this.state.bbgrxx.zxbm,
        },
        size: 10,
        page: 1
      }
      await Store.getXmcx(params)
    } else {
      let params = {
        project: {
          xmlb: '02',
          jgbh: this.state.bbgrxx.zxbm,
          xmmc: a.key,
        },
        size: 10,
        page: 1
      }
      await Store.getXmcx(params)
    }
    await this.setState({
      xmbm: v,
      xmmcs: a.props.name
    })
    console.log('项目编码-->', this.state.xmbm)
    console.log('项目名称-->', this.state.xmmcs)
  }

  syChange = v => {
    this.setState({ sfzz: v.value })
  }

  // 删除
  scClick = async value => {
    await Store.getXxsc({
      zxbm: this.state.bbgrxx.zxbm,
      jgbh: this.state.bbgrxx.zxbm,
      ywlsh: this.state.ywlsh,
      sxbm: '05015',
      xmbh: this.state.xmbh,
      blqd: this.state.bbgrxx.blqd,
      userid: this.state.bbgrxx.userid,
      apiversion: '1.0',
      gcbzid: Store.jpxx4[value]
    })

    // 删除后再次获取机票信息
    await Store.getJpxx({
      zxbm: this.state.bbgrxx.zxbm,
      jgbh: this.state.bbgrxx.zxbm,
      dxbm: '009',
      blqd: this.state.bbgrxx.blqd,
      userid: this.state.bbgrxx.userid,
      lrczyid: this.state.bbgrxx.userid,
      apiversion: '1.0',
      sxbm: '05015',
      spzt: '0',
      page: 1,
      size: 20
    })
    if (Store.jpxx3 > 0) {
      Store.ywlsh = Store.jpxx2.ywlsh
      Store.xmbh = Store.jpxx2.xmbh
      Store.gcid = Store.jpxx2.gcid
      await this.setState({
        ywlsh: Store.ywlsh,
        xmbh: Store.xmbh,
        gcid: Store.gcid,
      })
    } else {
      await Store.getYwlsh({ jgbh: this.state.bbgrxx.zxbm })
      await Store.getBpmid()
      await Store.getXmbh({
        sxbm: '05015',
        jgbh: this.state.bbgrxx.zxbm,
        userid: this.state.bbgrxx.userid,
        page: 1,
        size: 10
      })
      await this.setState({
        bpmid: Store.bpmid,
        ywlsh: Store.ywlsh,
        xmbh: Store.xmbh,
      })
    }
  }

  render() {
    console.log('render did')
    console.log(Store.zzSe)

    const titleData = [
      // { title: '', dataIndex: '1', key: '1', width: '10%' },
      { title: '航班日期', dataIndex: 'hbsj', key: 'hbsj', width: '20%', align: 'center' },
      { title: '航班', dataIndex: 'hbbc', key: 'hbbc', width: '20%', align: 'center' },
      { title: '出发地', dataIndex: 'sfcs', key: 'sfcs', width: '20%', align: 'center' },
      { title: '目的地', dataIndex: 'mdcs', key: 'mdcs', width: '20%', align: 'center' },
      {
        title: '操作',
        key: 'cz',
        width: '20%',
        align: 'center',
        render: (text, record, index) => (
          <span style={{ display: (this.props.location.pathname === '/td' ? 'none' : 'block') }}>
            <a style={{ color: '#D0021B' }} onClick={() => this.scClick(index)}>
              删除
            </a>
          </span>
        )
      },
    ]
    const { getFieldDecorator } = this.props.form
    const config = {
      size: 'middle',
      columns: titleData,
      checkBox: false,
      autoLoad: false,
      numberer: false,
      pageStatus: false,
      url: apiPath.GET_DGJP_XXCX,
      params: {
        zxbm: this.state.bbgrxx.zxbm,
        jgbh: this.state.bbgrxx.zxbm,
        dxbm: '009',
        blqd: this.state.bbgrxx.blqd,
        userid: this.state.bbgrxx.userid,
        apiversion: '1.0',
        sxbm: '05015',
        spzt: '0',
        page: 1,
        size: 20
      },
    }
    return (
      <div>
        <Spin tip='提交中...' spinning={this.state.loading}>
          <div>
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
              // showSideBar
              // categories={['category1', 'category2']}
              // loginToken={'这是一个token参数'}
              components={[
                {
                  type: 'matter',
                  title: '项目',
                  isShow: true,
                  status: 2,
                  content: (
                    <Row style={{ paddingLeft: 30 }}>
                      <Col span={8}>
                        所属项目:
                        {this.state.bbgrxx ? this.state.bbgrxx.description : ''}
                      </Col>
                    </Row>
                  ),
                  onClick: item => { console.log(item) }
                },
                {
                  type: 'history',
                  status: 2,
                  content: (
                    <div style={{ marginLeft: 14 }}>
                      <table>
                        <tr>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>预定次数</td>
                        </tr>
                      </table>
                    </div>
                  )
                },
                {
                  type: 'content',
                  title: '内容',
                  isShow: true,
                  titleProps: { id: 'category3' },
                  status: 1,
                  content: (
                    <>
                      <Row style={{ paddingLeft: '30px', paddingBottom: '10px' }}>
                        <Col span={8}>
                          <p>事由：</p>
                          <FormItem>
                            <PavementSelectionNew title='mc' value={{ value: Store.shiyouSe }} dataSource={[{ value: '01', label: '项目' }, { value: '02', label: '拜访' }, { value: '03', label: '演示' }, { value: '04', label: '其他' }]} onChange={this.syChange} />
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <p>项目：</p>
                          <FormItem>
                            <SYSelect
                              page
                              url={apiPath.GET_XMMC}
                              params={{
                                project: {
                                  ProjectBasicInfo: [{ jgbh: this.state.bbgrxx.zxbm }]
                                },
                                page: 1,
                                size: 20
                              }}
                              nameKey='xmmc'
                              valueKey='xmbh'
                              searchKey='xmmc'
                              optionKey='xmmc'
                              showSearch
                              onChange={this.xmChange}
                            />

                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8} style={{ paddingLeft: 30 }}>
                          <p>是否中转：</p>
                          <PavementSelectionNew value={{ value: Store.zzSe }} dataSource={[{ value: '01', label: '是' }, { value: '02', label: '否' }]} onChange={this.syChange} />
                        </Col>
                        <Col span={8} style={{ paddingLeft: 30 }}>
                          <p>总价：</p>
                          {getFieldDecorator('zj', {
                            initialValue: Store.zj,
                            rules: [
                              {
                                required: true, message: '*反显总价'
                              }]
                          })(
                            <SYInputMoney
                              width='93%'
                              placeholder='反显'
                              disabled
                              precision={2}
                              onChange={val => console.log('1', val)}
                            />
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={16} style={{ paddingLeft: 30, paddingTop: 15 }}>
                          <p>详情：</p>

                          {
                            getFieldDecorator('desc', {
                              rules: [
                                {
                                  required: true,
                                  message: '添加详情aa '
                                }
                              ]
                            })(<SYTextArea
                              disabled={this.state.disable}
                              textareaId='ffff'
                              defaultValue=''
                              autosize
                              placeholder='请输入'
                            />)
                          }
                        </Col>
                      </Row>

                    </>
                  )
                },
                {
                  type: 'content',
                  isShow: true,
                  title: '预订信息',
                  status: 1,
                  content: (
                    <>
                      <Row>
                        <Col span={16} style={{ paddingLeft: 30, paddingTop: 15 }}>
                          <SYTable {...config} dataSource={Store.jpxx1} />
                        </Col>
                      </Row>
                      <Row style={{ display: (this.state.disable ? 'none' : 'block') }}>
                        <Col span={16} style={{ display: 'flex', justifyContent: 'center' }}>
                          <AddButton title='新增信息' onClick={() => { this.mxClick() }} />
                        </Col>
                      </Row>
                    </>
                  )
                },
                UtilsMine.upDangAn({
                  status: 1, // 申请页面1，审批页面2.退回页面3
                  downloadBoard: false,
                  userid: this.state.bbgrxx.userid, // 用户id
                  zxbm: this.state.bbgrxx.zxbm, // zxbm
                  ywfl: '05', // 业务分类，按自己模块赋值
                  ywlb: '05015', // 业务类别，按自己模块赋值
                  cplx: 'dmPro', // 产品类型dmPro,sycw...
                  proccesskey: 'gr_dgjp', // 按自己模块流程传值
                  taskdefinitionkey: 'sq', // 暂时不动
                  ywlsh: this.state.ywlsh, // 业务流水号
                  username: this.state.bbgrxx.xingming, // 姓名
                  grbh: this.state.bbgrxx.grbh, // 个人编号
                  bbgrxx: this.state.bbgrxx // ticket解析的bbgrxx，暂时不动
                  // ipPort: 'http://113.125.201.131:9300',
                }),
                {
                  type: 'rules',
                  status: 1,
                  isShow: true,
                  getRuleParams: {}
                },
                {
                  type: 'content',
                  isShow: !this.state.disable,
                  status: 1,
                  content: (
                    <Row>
                      <Col span={16} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size='large' style={{ width: '200px' }} type='primary' onClick={this.submit}>提交</Button>
                      </Col>
                    </Row>
                  )
                },
                {
                  type: 'rules',
                  status: 1,
                  isShow: true,
                  getRuleParams: {}
                },
                UtilsMine.upDangAn({
                  status: 3, // 申请页面1，审批页面2.退回页面3
                  downloadBoard: false,
                  userid: this.state.bbgrxx.userid, // 用户id
                  zxbm: this.state.bbgrxx.zxbm, // zxbm
                  ywfl: '05', // 业务分类，按自己模块赋值
                  ywlb: '05015', // 业务类别，按自己模块赋值
                  cplx: 'dmPro', // 产品类型dmPro,sycw...
                  proccesskey: 'gr_dgjp', // 按自己模块流程传值
                  taskdefinitionkey: 'sq', // 暂时不动
                  ywlsh: this.state.ywlsh, // 业务流水号
                  username: this.state.bbgrxx.xingming, // 姓名
                  grbh: this.state.bbgrxx.grbh, // 个人编号
                  bbgrxx: this.state.bbgrxx // ticket解析的bbgrxx，暂时不动
                  // ipPort: 'http://113.125.201.131:9300',
                }),

              ]}
            />
          </div>
        </Spin>
        <Modal
          title='新增信息'
          width={600}
          height={300}
          destroyOnClose
          centered
          maskClosable={false}
          visible={this.state.modalMxVisible}
          footer={[
          ]}
          onCancel={this.mxCancel}
        >
          <Row style={{ margin: '8px 0px' }}>
            <Col span={12}>
              <div>
                <p>出发地：</p>
                <FormItem label='' style={{ margin: '-13px 0 0 0' }} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('cfd', {
                    // initialValue: !Store.Dqrzw ? Store.publicParam.username : undefined,
                    rules: [
                      {
                        required: true, message: '*请选择出发地'
                      }]
                  })(
                    <Cascader
                      style={{ width: '93%' }}
                      options={Store.cfdSfData}
                      onChange={this.cfdSelectChange}
                      className='basic1'
                      loadData={this.cfdSfSelectloadData}
                      placeholder='请选择'
                    />
                  )}
                </FormItem>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <p>时间：</p>
                <FormItem label='' style={{ margin: '-13px 0 0 0' }} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('hbsj', {
                    // initialValue: !Store.Dqrzw ? Store.publicParam.username : undefined,
                    rules: [
                      {
                        required: true, message: '*请选择时间'
                      }]
                  })(
                    <DatePicker className='basic' style={{ width: '93%' }} format='YYYY-MM-DD' placeholder='请选择' />
                  )}
                </FormItem>
              </div>
            </Col>
          </Row>

          <Row style={{ margin: '8px 0px' }}>
            <Col span={12}>
              <div>
                <p>目的地：</p>
                <FormItem label='' style={{ margin: '-13px 0 0 0' }} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('mdd', {
                    // initialValue: !Store.Dqrzw ? Store.publicParam.username : undefined,
                    rules: [
                      {
                        required: true, message: '*请选择目的地'
                      }]
                  })(
                    <Cascader
                      style={{ width: '93%' }}
                      options={Store.mddSfData}
                      onChange={this.mddSelectChange}
                      className='basic1'
                      loadData={this.mddSfSelectloadData}
                      placeholder='请选择'
                    />
                  )}
                </FormItem>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <p>航班：</p>
                <FormItem label='' style={{ margin: '-13px 0 0 0' }} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('hbbc', {
                    // initialValue: !Store.Dqrzw ? Store.publicParam.username : undefined,
                    rules: [
                      {
                        required: true, message: '*请输入航班'
                      }]
                  })(
                    <Input className='basic' style={{ width: '93%' }} placeholder='请输入' />
                  )}
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row style={{ margin: '8px 0px' }}>
            <Col span={12}>
              <div>
                <p>票价：</p>
                <FormItem label='' style={{ margin: '-13px 0 0 0' }} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('jpjg', {
                    // initialValue: !Store.Dqrzw ? Store.publicParam.username : undefined,
                    rules: [
                      {
                        required: true, pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '*请输入规范金额'
                      }]
                  })(
                    <SYInputMoney
                      width='93%'
                      placeholder='请输入'
                      precision={2}
                      onChange={val => this.jpjgChange(val)}
                    />
                  )}
                </FormItem>
              </div>
            </Col>
          </Row>
          <SyCenterRow style={{ paddingTop: '30px', paddingBottom: '4px' }}>
            <Button className='sybutton-ok' style={{ minWidth: '80px', height: '31px', marginRight: '12px' }} onClick={this.bcClick}>保存</Button>
            <Button style={{ width: '80px', height: '31px', marginLeft: '12px' }} onClick={this.mxCancel}>取消</Button>
          </SyCenterRow>
        </Modal>
      </div>
    )
  }
}
export default index
