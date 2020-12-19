/* eslint-disable no-nested-ternary */
/* eslint-disable react/prefer-stateless-function */
/*
 * @Author: wgf
 * @Date: 2020-03-30 19:13:55
 * @LastEditors: wgf
 * @LastEditTime: 2020-03-30 19:37:50
 * @Descripttion:
 */
import { Col, Icon, Row } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.less'

class Rules extends Component {
  render() {
    const { dataSource } = this.props
    return (
      <div className={styles.rules}>
        {dataSource &&
                    dataSource.map((v, i) => (
                      <Row key={v.gzmc}>
                        <Col className={styles.col1} span={1}>
                          {v.sftg === '0' ? (
                            <Icon
                              size='xxs'
                              type='check-circle'
                              theme='filled'
                              style={{ color: '#1890FF' }}
                            />
                          ) : v.sftg === '1' ? (
                            <Icon
                              size='xxs'
                              type='close-circle'
                              theme='filled'
                              style={{ color: '#ff0000' }}
                            />
                          ) : (
                            <Icon size='xxs' />
                          )}
                        </Col>
                        <Col className={styles.col2} span={20}>{v.gzmc}</Col>
                      </Row>
                    ))}
      </div>
    )
  }
}
// props 默认值
Rules.defaultProps = {
  dataSource: []
}
// 类型校验
Rules.propTypes = {
  dataSource: PropTypes.array
}
export default Rules
