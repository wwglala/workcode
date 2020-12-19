/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { Button, Tag, Row } from 'antd'
import { observer, inject } from 'mobx-react'
import Style from './PavementSelectionNew.module.less'

const { CheckableTag } = Tag
@observer
class PavementSelectionNew extends React.Component {
  static defaultProps={
    nameKey: 'label',
    valueKey: 'value',
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedTags: this.props.selectedTags,
    }
  }
  triggerChange = changedValue => {
    // 为form返回value
    const { onChange } = this.props
    if (onChange) {
      onChange(changedValue)
    }
  }
  handleChange(index, checked, value) {
    if (!this.props.disabled) {
      this.setState({ selectedTags: value[this.props.valueKey] })
      let obj = {
        value: value[this.props.valueKey],
        label: value[this.props.nameKey]
      }
      this.triggerChange(obj)
    }
  }
  render() {
    const { selectedTags } = this.state
    return (
      <div style={{ width: '100%' }}>
        {this.props.label ? (
          <div>
            <div className={Style.TagLabel}>
              {this.props.label}
            </div>
            <div className={(this.props.disabled) ? Style.DisableTag : null} style={{ float: 'left', width: this.props.label ? '95%' : '100%' }}>
              {this.props.dataSource ? this.props.dataSource.slice().map((v, index) => (
                <CheckableTag
                  className={(selectedTags === v[this.props.valueKey])
                    ? Style.PavementSelectionStyleChecked
                    : (v[this.props.valueKey] === this.props.value)
                      ? Style.PavementSelectionStyleChecked : Style.PavementSelectionStyle}
                  key={v.value}
                  checked={selectedTags === v[this.props.valueKey] ||
                     v[this.props.valueKey] === this.props.value}
                  onChange={checked => this.handleChange(index, checked, v)}
                >
                  {v[this.props.nameKey]}
                </CheckableTag>
              )) : null}
            </div>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            {this.props.dataSource ? this.props.dataSource.slice().map((v, index) => (
              <CheckableTag
                className={(selectedTags === v[this.props.valueKey])
                  ? Style.PavementSelectionStyleChecked
                  : (v[this.props.valueKey] === this.props.value)
                    ? Style.PavementSelectionStyleChecked : Style.PavementSelectionStyle}
                key={v.value}
                checked={selectedTags === v[this.props.valueKey] ||
                   v[this.props.valueKey] === this.props.value}
                onChange={checked => this.handleChange(index, checked, v)}
              >
                {v[this.props.nameKey]}
              </CheckableTag>
            )) : null}
          </div>
        )}
      </div>
    )
  }
}

export default PavementSelectionNew
