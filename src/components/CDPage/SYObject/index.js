/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Row, Col, Form, Button } from 'antd'
import { SYSelect } from 'shineyue-component'
import Store from './store'
import Store1 from '../store'
import './style.less'

@observer
class SYObject extends Component {
  static defaultProps = {
    value: {
      title: '对象',
      content: ''
    },
    url: '/DM/common/dxbm$m=query.service',
    nameKey: 'xmmc',
    valueKey: 'xmbh',
    searchKey: 'xmmc',
    fixedFirst: false,
    defaultValue: undefined
  }
  constructor(props) {
    super(props)
    this.state = {
      selectStore: {},
      datas: [],
      isLoadSource: false,
      params: {},
      defaultValue: undefined,
      URL: '',
      PARAMS: {},
      valueKey: '',
      searchKey: '',
      nameKey: ''
    }
  }
  async componentDidMount () {
    const { sxbm } = this.props
    window.bbgrxx.zxbm = '1301100006'
    await Store1.getDxlb(
      {
        sxbm,
        type: 'dxbmnew'
      }
    ).then(() => {
      if (Store1.dxlbRes[0]) {
        console.log('客户--->', Store1.dxlbRes[0].MC)
        switch (Store1.dxlbRes[0].MC) {
          case '客户':
            this.setState({
              URL: '/PT/business/core/customer$m=query.service',
              PARAMS: {
                customer: {
                  khlx: '01',
                  jgbh: window.bbgrxx.zxbm
                },
                page: 1,
                size: 10
              },
              searchKey: 'khmc',
              nameKey: 'khmc',
              valueKey: 'khbh',
              isLoadSource: false
            })
            break
          case '实物':
            this.setState({
              URL: '/PT/business/core/goods$m=query.service',
              PARAMS: {
                goods: {
                  jgbh: window.bbgrxx.zxbm
                },
                page: 1,
                size: 10
              },
              searchKey: 'mc',
              nameKey: 'mc',
              valueKey: 'bh',
              isLoadSource: false
            })
            break
          case '机构':
            this.setState({
              URL: '/PT/business/core/organization$m=query.service',
              PARAMS: {
                organization: {
                  jgbh: window.bbgrxx.zxbm
                },
                page: 1,
                size: 10
              },
              searchKey: 'jgmc',
              nameKey: 'jgmc',
              valueKey: 'jgbh',
              isLoadSource: false
            })
            break
          case '供应商':
            this.setState({
              URL: '/PT/business/core/customer$m=query.service',
              PARAMS: {
                customer: {
                  jgbh: window.bbgrxx.zxbm,
                  khlx: '05'
                },
                page: 1,
                size: 10
              },
              searchKey: 'khmc',
              nameKey: 'khmc',
              valueKey: 'khbh',
              isLoadSource: false
            })
            break
          case '往来单位':
            this.setState({
              URL: '/PT/business/core/customer$m=query.service',
              PARAMS: {
                customer: {
                  jgbh: window.bbgrxx.zxbm,
                  khlx: '02,03,04'
                },
                page: 1,
                size: 10
              },
              searchKey: 'khmc',
              nameKey: 'khmc',
              valueKey: 'khbm',
              isLoadSource: false
            })
            break
          case '合同':
            this.setState({
              URL: '/PT/business/core/contract$m=query.service',
              PARAMS: {
                contract: {
                  jgbh: window.bbgrxx.zxbm,
                },
                page: 1,
                size: 10
              },
              searchKey: 'htmc',
              nameKey: 'htmc',
              valueKey: 'htbm',
              isLoadSource: false
            })
            break
          case '部门':
            this.setState({
              URL: '/Zzjg/manage/dept$m=query',
              PARAMS: {
                product_id: window.bbgrxx.zxbm,
                page: 1,
                size: 10
              },
              searchKey: 'mc',
              nameKey: 'mc',
              valueKey: 'bm',
              isLoadSource: false
            })
            break
          default:
            console.log('无匹配接口')
            break
        }
        // this.setState({
        //   isLoadSource: true
        // })
      }
    })
    this.init()
  }
  init = async() => {
    const { url, params, status, onChange = () => { }, fixedFirst, defaultValue } = this.props
    this.setState({ defaultValue })
    if (status === 1) {
      await Store.getDataSource(this.state.URL, this.state.PARAMS)
      const len = Store.dataSource.length
      if (len > 1) {
        console.log('state--->', this.state)
        this.setState({ isLoadSource: true, params })
        if (fixedFirst) {
          this.setState({ defaultValue: Store.dataSource[0].xmbh })
          onChange(Store.dataSource[0])
        }
      } else if (len === 1) {
        this.setState({ isLoadSource: false, datas: Store.dataSource })
        onChange(Store.dataSource[0])
      }
    }
  }
  selected = async (value, option) => {
    const { onChange = () => { }, valueKey } = this.props
    const { dataSource } = this.state.selectStore
    if (value === 'undefined' || value === null) {
      onChange({})
    } else {
      let obj = dataSource.find(item => {
        return item[this.state.valueKey] === value
      })
      onChange(toJS(obj))
    }
  }

  // 模糊查询
  // onSearch = async (value) =>{
  //   const { url, params} = this.props
  //    let param = params
  //    param.xmmc = value
  //   await Store.getDataSource(url, params)
  //   this.setState({ datas: Store.dataSource })
  // }
  render() {
    const { value, url,
      onChange = () => { }, status,
      fixedFirst,
      onClick = () => { },
      form: { getFieldDecorator }, ...otherProps } = this.props
    // const dataSource = [{ xmbh: '打发的', xmmc: 'aldja' }, { xmbh: '打发的1', xmmc: 'aldja1' }]
    const data = this.state.datas
    const { isLoadSource, params, defaultValue, URL, PARAMS, searchKey, valueKey, nameKey } = this.state
    let len = 0
    if (status === 1) {
      len = this.state.datas.length
    }

    return (
      <div className='matterStyle'>
        {/* <Row style={{ margin: '0' }}> */}
        {status === 1
          ? (isLoadSource
            ? (
              <div>
                <div>
                  <span className='vlaueTitle'>
                    {value.title}
                    :
                  </span>
                </div>
                <div style={{ paddingTop: 5 }}>
                  <Form.Item>
                    {getFieldDecorator('object', {
                      initialValue: defaultValue,
                      rules: [{ required: true, message: '*请选择对象' }],
                    })(
                      <SYSelect
                        {...otherProps}
                        control={false}
                        placeholder='请选择'
                        showSearch
                        url={URL}
                        searchKey={searchKey}
                        params={PARAMS}
                        //  onSearch={(value) =>{this.onSearch(value)}}
                        // dataSource={dataSource}
                        style={{ width: '100%' }}
                        //   totalKey={Store.totalcount}
                        onMount={store => {
                          this.setState({ selectStore: store })
                          // console.log(store, '888888888888888')
                        }}
                        onChange={(valueKey, optionKey) => { this.selected(valueKey, optionKey) }}
                        valueKey={valueKey}
                        nameKey={nameKey}
                        optionKey={nameKey}
                        disabled={fixedFirst}
                        page
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
            )
            : (
              <Col span={23}>
                <span className='vlaueTitle'>
                  {value.title}
                  :
                  <span onClick={() => { onClick(data[0]) }} className='vlaueContent'>{(len !== 0) ? data[0][nameKey] : ''}</span>
                </span>
              </Col>
            )
          )
          : (
            <Col span={23}>
              <span className='vlaueTitle'>
                {value.title}
                :
                <span onClick={() => { onClick(value) }} className='vlaueContent'>{value.content}</span>
              </span>
            </Col>
          )}
        {/* </Row> */}
      </div>
    )
  }
}
export default SYObject
