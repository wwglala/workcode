import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import style from './index.module.less'

class SYBottomFixedModel extends React.Component {
  static defaultProps={
    title: 'title',
    width: '80%',
    destroyOnClose: false,
    visible: false,
    onOk: () => {},
    handleCancel: () => {},
  }

  handleOk = () => {
    const { handleOk } = this.props
    handleOk && handleOk()
  };

  handleCancel = () => {
    const { handleCancel } = this.props
    handleCancel && handleCancel()
  };

  render() {
    const footer = (
      <div>
        <div>
          {this.props.footer}
        </div>
        <div className={style.footer}>
          <Button onClick={this.handleOk} className={`${style.btnOk} ${style.btn}`}>确定</Button>
          <Button onClick={this.handleCancel} className={`${style.btnCancel} ${style.btn}`}>取消</Button>
        </div>
      </div>
    )
    const { otherOpt } = this.props
    return (
      <div>
        <Modal
          className={`${style.SYBottomFixedModel} ${this.props.className}`}
          title={this.props.title}
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={this.props.width}
          destroyOnClose={this.props.destroyOnClose}
          footer={footer}
          {...otherOpt}
        >
          {this.props.children}
        </Modal>
      </div>
    )
  }
}
export default SYBottomFixedModel
