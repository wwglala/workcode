import React, { Component } from 'react'
import checkedIcon from './assets/checked.png'
import uncheckedIcon from './assets/unchecked.png'
import './font.css'
import './style.less'

export default class ContentHeader extends Component {
  static defaultProps={
    isShowCheck: false,
  }
  constructor(props) {
    super(props)
    this.state = {
      color: '#4A90E2',
      padding: '20px 30px 10px 20px',
      isShowCheck: false,
      checked: false
    }
  }
  componentDidMount() {
    this.initPropsState()
  }
  initPropsState = () => {
    if (this.props.color) {
      this.setState({ color: this.props.color })
    }
    if (this.props.padding) {
      this.setState({ padding: this.props.padding })
    }
    const { id, checkClick, categories } = this.props
    if (id && categories.includes(id)) {
      checkClick({ obj: { id, value: '' }, isChecked: false })
      this.setState({ isShowCheck: true })
    } else {
      this.setState({ isShowCheck: false })
    }
  }

  checkClick = (e, value) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ checked: value })
    const { id, checkClick, children } = this.props
    checkClick({ obj: { id, key: children, value: '' }, isChecked: value })
  }
  render() {
    const { isShowCheck, checked } = this.state
    return (
      <div className={this.props.className ? this.props.className : ''}>
        <div className='contentHeader'>
          {/* <div style={{width:10,height:20,backgroundColor:'red',display:'inlne'}}></div> */}
          <span className='header'>
            <div style={{ display: 'inline-block' }}>
              <div className='widthBorder' style={{ backgroundColor: this.state.color }}></div>
            </div>
            <span>{this.props.children}</span>
            {isShowCheck && (
              <div className='SYcheckbox' onClick={e => { this.checkClick(e, !checked) }}>
                <img src={checked ? checkedIcon : uncheckedIcon} alt='' />
              </div>
            )}
          </span>
        </div>
      </div>
    )
  }
}
