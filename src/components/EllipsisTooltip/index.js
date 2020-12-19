import React, { Component } from 'react'
import { Tooltip } from 'antd'
import style from './EllipsisTooltip.module.less'

class EllipsisTooltip extends React.Component {
  static defaultProps = {
    clickClose: false
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  handleVisibleChange = visible => {
    if ((this.container.clientWidth < this.container.scrollWidth) ||
     (this.container.clientWidth === 0)) {
      this.setState({
        visible
      })
    }
  }
  handleChildrenClick = visible => {
    if (this.props.clickClose) {
      this.setState({
        visible: false
      })
    }
  }
  render() {
    const { clickClose, otherOpt } = this.props
    return (
      <Tooltip
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        title={this.props.title}
        overlayClassName={style.EllipsisTooltip}
        {...otherOpt}
      >
        <div ref={node => { this.container = node }}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
          onClick={this.handleChildrenClick}
        >
          {this.props.children}
        </div>
      </Tooltip>
    )
  }
}
export default EllipsisTooltip

