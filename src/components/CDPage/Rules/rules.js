import { Col, Icon, Row } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styles from './style.less'
import Store from './store'

@observer
class Rules extends Component {
  static defaultProps = {
    dataSource: []
  }
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }
  addGz = newgz => {
    console.log('新加入的规则========', newgz)
    let oldgz = this.state.dataSource
    if (oldgz === []) {
      this.setState({ dataSource: newgz })
    } else {
      for (let i = 0; i < newgz.length; i += 1) {
        let cz = oldgz.find(e => e.key === newgz[i].key)
        if (cz) {
          let j = oldgz.findIndex(e => e.key === newgz[i].key)
          oldgz[j] = newgz[i]
        } else {
          oldgz.push(newgz[i])
        }
      }
      this.setState({ dataSource: oldgz })
    }
  }
  getRule = async (url, val) => {
    await Store.getRules(url, {
      iscalc: 0,
      ...val
    })
    this.addGz(Store.rules)
  }
  getRuleById = async (getRuleByIdUrl, val) => {
    await Store.getIdRules(getRuleByIdUrl, {
      sureid: val.sureid
    })
    this.addGz(Store.idrules)
  }
  render() {
    const { dataSource } = this.state
    return (
      <div className={styles.rules}>
        {dataSource
          ? dataSource.map((v, i) => (
            <Row key={parseInt(i, 10)} style={{ marginTop: (i === 0) ? 0 : 4 }}>
              <Col span={24}>
                {v.sftg === '0' && (
                  <span style={{ paddingRight: 5 }}>
                    <Icon
                      size='xxs'
                      type='check-circle'
                      theme='filled'
                      style={{ color: '#1890FF' }}
                    />
                  </span>
                )}
                {v.sftg === '1' && (
                  <span style={{ paddingRight: 5 }}>
                    <Icon
                      size='xxs'
                      type='close-circle'
                      theme='filled'
                      style={{ color: '#ff0000' }}
                    />
                  </span>
                )}
                <span className={styles.col2}>{v.gzmc}</span>
              </Col>
            </Row>
          ))
          : null}
      </div>
    )
  }
}
// 类型校验
// Rules.propTypes = {
//   dataSource: PropTypes.array
// }
export default Rules
