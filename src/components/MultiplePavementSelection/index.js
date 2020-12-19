import React, { Component } from 'react'
import { Button, Tag, Row } from 'antd'
import { observer, inject } from 'mobx-react'
import Style from './style.module.less'

const { CheckableTag } = Tag
@observer
class MultiplePavementSelection extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state={
      selectedTags: [],
      selectedArr: []
    }
    componentWillMount() {
      if (this.props.selectedTags !== undefined) {
        this.setSelectedTags(this.props.selectedTags)
      }
      if (this.props.value !== undefined) {
        this.setSelectedTags(this.props.value)
      }
    }
    async componentDidMount() {
      await this.props.dataSource ? this.props.dataSource.slice().map((v, index) => {
        if (this.props.checked) {
          if (this.props.checked.indexOf(v[this.props.checkedName]) >= 0) {
            this.setSelectedTags(index, v)
          }
        }
      }) : null
    }
    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.props = nextProps
      }
    }
    setSelectedTags=(index, v) => {
      const { selectedTags, selectedArr } = this.state
      this.setState({ selectedTags: [...selectedTags, index], selectedArr: [...selectedArr, v] })
    }
    // handleChange(index, checked, value) {
    //   const { selectedTags } = this.state
    //   const nextSelectedTags = checked ? index : selectedTags
    //   this.setState({ selectedTags: nextSelectedTags })
    //   if (this.props.selected) {
    //     this.props.selected(value)
    //   }
    // }
    triggerChange = changedValue => {
      // 为form返回value
      const { onChange } = this.props
      if (onChange) {
        onChange(changedValue)
      }
    }
    handleChange(index, checked, value) {
      const { selectedTags, selectedArr } = this.state
      let nextSelectedTags = checked
        ? [...selectedTags, index] : selectedTags.filter(t => t !== index)
      let selectArr = checked ? [...selectedArr, value]
        : selectedArr.filter(t => t.value !== value.value)
      this.setState({ selectedTags: nextSelectedTags, selectedArr: selectArr })
      if (this.props.selected) {
        this.props.selected(selectArr)
      }
      this.triggerChange(selectArr)
    }
    render() {
      const { selectedTags } = this.state
      return (
        <div>
          {this.props.label ? (
            <div style={{ float: 'left', width: '5%' }}>
              {this.props.label}
            </div>
          ) : null}
          <div style={{ float: 'left', width: this.props.label ? '95%' : '100%' }}>
            {this.props.dataSource ? this.props.dataSource.slice().map((v, index) => (
              <CheckableTag
                className={(selectedTags.indexOf(index) > -1)
                  ? Style.PavementSelectionStyleChecked : Style.PavementSelectionStyle}
                // eslint-disable-next-line react/no-array-index-key
                key={v.value}
                checked={selectedTags.indexOf(index) > -1}
                onChange={checked => this.handleChange(index, checked, v)}
              >
                {v[this.props.title]}
              </CheckableTag>
            )) : null}
          </div>

        </div>
      )
    }
}

export default MultiplePavementSelection
