import React, { PureComponent, Component, Fragment } from 'react'
import { Select, Pagination, Spin } from 'antd'
import _ from 'lodash'
import { observer, inject } from 'mobx-react'
import { disable } from 'promise/lib/rejection-tracking'
import Store from './store'
import style from './style.less'

const { Option, OptGroup } = Select
@observer
class SYSelect extends Component {
    // 定义默认props
    static defaultProps={
      searchKey: 'search', // 搜索参数
      nameKey: 'name', // option的显示文本
      valueKey: 'value', // option的value
      optionKey: 'id', // option的key
      resultKey: 'results', // 请求返回数据
      limit: 5, // 多选模式选择个数
      // mode: 'multiple',// 多选模式
      filterOption: false,
      defaultActiveFirstOption: false,
      autoClearSearchValue: false,
      params: {},
      onChange: () => {},
      control: true,
      // onSearch: () => {}
      disabled: false
    }

    componentWillMount() {
    // 创建store
      this.store = new Store()
      this.initStore(this.props)
      // 获取数据
      const { url, params, onError } = this.store
      if (url) {
        this.store.loadData({ url, params, onError })
      }
      this.props.onMount(this.store)
    }

    initStore=props => {
      // 获取用户传入配置
      const {
        url,
        params,
        onError,
        pagination,

        // select组件参数
        searchKey,
        style,
        onChange,
        disabled,
        onSearch,
        ...options

      } = props

      // 默认配置
      const styleProps = { width: 250, ...style }
      const paginationProps = {
        onChange: (page, pageSize) => {
          const { pagination, url, params, onError } = this.store
          this.store.setStore({
            pagination: {
              ...pagination, current: page, pageSize }
          })

          if (url) {
            this.store.loadData({ url, params, onError })
          }
        },
        simple: true,
        pageSize: 10,
        ...pagination,
      }
      // 组件状态变化更新store
      const handleChange = value => {
        const { mode, limit } = this.store
        if (mode === 'multiple' && value.length > limit) return
        this.store.setStore({ value })
        onChange && onChange(value)
      }
      const handleSearch = _.throttle((searchValue, options) => {
        const { url, params, onError } = this.props
        const { pagination } = this.store
        if (!url) return
        // 搜索时重置当前页码
        this.store.setStore({
          searchValue,
          dataSource: [],
          pagination: { ...pagination, current: 1 }
        })
        // 传入onSearch事件时，使用传入的方法
        if (onSearch) {
          onSearch(searchValue, options)
        } else {
          this.store.loadData({
            url,
            params: {
              customer: {
                jgbh: this.props.jgbh, // 必传，公共参数
                [searchKey]: searchValue
              }
            },
            onError })
        }
      }, 500)

      // 合并传入配置与默认配置
      let config = {
        url,
        params,
        onError,
        onChange: handleChange,
        onSearch: handleSearch,
        style: styleProps,
        pagination: paginationProps,
      }

      // 合并剩余配置
      config = { ...config, ...options }
      this.store.setStore(config)
    }

    render() {
      const { mode, page, value, pagination, control, dataSource = [], children,
        valueKey, optionKey, nameKey, loading, ...options } = this.store
      const dropdownPagination = (
        <Pagination {...pagination} />
      )
      // 从store获取组件状态
      return (
        <Select
          mode={mode}
          dropdownClassName={style.SYSelectDropdown}
          notFoundContent={loading ? <Spin /> : null}
          value={control ? this.props.value : value}
          {...options}
        >
          {page
            ? (
              <OptGroup label={dropdownPagination}>
                {dataSource &&
                    dataSource.map(
                      v => {
                        return (
                          <Option
                            value={String(v[valueKey])}
                            key={v[optionKey]}
                          >
                            {String(v[nameKey])}
                          </Option>
                        )
                      }
                    )}
              </OptGroup>
            )
            : dataSource &&
               dataSource.map(
                 v => (
                   <Option value={String(v[valueKey])} key={String(v[optionKey])}>
                     {String(v[nameKey])}
                   </Option>
                 )
               )}
          {children}
        </Select>
      )
    }
}
export default SYSelect
