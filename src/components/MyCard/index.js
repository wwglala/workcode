/*
 * @Author: 陈鑫
 * @Date: 2020-03-25 09:18:47
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2020-07-08 13:45:07
 * @Description: file content
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import arrow from './arrow.png'
import './index.less'

class CardContentHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: true
    }
  }

  onExpandchange = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
  }

  render() {
    const { showLine, stripVisible, color, title, isLinkArrow, isAccorArrow, marginBottom } = this.props
    const { onLink, style, className, isHeader } = this.props
    const { expand } = this.state

    return (
      <div className={`card-content-header ${!expand && 'expand-wrapper'} ${className}`}
        ref={this.wrapperRef}
        style={{
          marginBottom: `${marginBottom}px`,
          boxShadow: '0px 2px 4px 0px rgba(208, 208, 208, 0.5)',
          ...style
        }}
      >
        {isHeader && (
          <div className='header'>
            <div className={`border-wrapper ${showLine ? 'has-border' : 'no-border'}`}>
              {stripVisible && (<span className='strip-visible' style={{ backgroundColor: color }}>&nbsp;</span>)}
              <span className='title'>{title}</span>
              {isLinkArrow && <i className='link-arrow' onClick={onLink}><Icon type='right' /></i>}
              {isAccorArrow && <i className='accor-arrow' onClick={this.onExpandchange}><img className={`${expand && 'arrow-up'}`} src={arrow} alt='' /></i>}
            </div>
          </div>
        )}
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

CardContentHeader.propTypes = {
  marginBottom: PropTypes.string,
  color: PropTypes.string,
  showLine: PropTypes.bool,
  stripVisible: PropTypes.bool,
  title: PropTypes.string,
  isLinkArrow: PropTypes.bool,
  isAccorArrow: PropTypes.bool,
  onLink: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  isHeader: PropTypes.bool
}

CardContentHeader.defaultProps = {
  isHeader: true,
  className: '',
  style: {},
  marginBottom: '20',
  color: '#4A90E2',
  showLine: false,
  stripVisible: true,
  title: '标题',
  isLinkArrow: false,
  isAccorArrow: false,
  onLink: () => { }
}

export default CardContentHeader
