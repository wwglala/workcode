import React, { Component } from 'react'
import { Tag, Row, Avatar, Col, Badge } from 'antd'
import { SyRow, SyBlank } from 'sypc'
import moment from 'moment'
import styles from './style.less'
import ContentHeader from 'shineyue-component'

export default class UserInfo extends Component {
    state={}
    render() {
      const headIcon = <Avatar alt='头像' size={80} src={this.props.bbgrxx.filepath ? this.props.bbgrxx.filepath : ''} />
      const name = this.props.bbgrxx.uname ? this.props.bbgrxx.uname : ''
      const nameIcon = <Tag className={styles.tag} color='blue'>{this.props.bbgrxx.zzmm ? this.props.bbgrxx.zzmm : ''}</Tag>
      const zw = this.props.bbgrxx.dname ? this.props.bbgrxx.dname : `${'' + '/'}${this.props.bbgrxx.zwgw}` ? this.props.bbgrxx.zwgw : ''
      const dz = this.props.bbgrxx.wz ? this.props.bbgrxx.wz : ''
      const sj = this.props.bbgrxx.sj ? this.props.bbgrxx.sj : ''
      return (
        <SyRow>
          {/*  <ContentHeader showLine='ture'>{this.props.title ? this.props.title : '发起人'}</ContentHeader> */}

          <div className={styles.userInfo}>
            <Row className={styles.userdiv}>
              <Col className={styles.headIconCol} span={4}>
                <div className={styles.headIconDiv}>{headIcon}</div>
              </Col>
              <Col span={20}>
                <div className={styles.contentDiv}>
                  <p className={styles.name}>
                    {name}
                    {nameIcon}
                  </p>
                  <p className={styles.zw}>{zw}</p>
                  <Row>
                    <Col span={24}>
                      <font className={styles.dz}>{`地点：${dz}`}</font>
                      <font className={styles.sj}>{`时间：${sj}`}</font>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </SyRow>
      )
    }
}
