/*
 * @Author: 姜跃龙
 * @Date: 2020-04-01 15:24:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-22 14:33:31
 * @Description: file content
 */

import { Form, Row, Col } from 'antd'
import { FixedButton, SYProcess } from 'shineyue-component'
import SYTextArea from '../SYTextArea'
import ContentHeader from './ContentHeader'
import MatterOfNr from './MatterOfNr'
import Matter from './Matter'
import SYObject from './SYObject'
import History from './History'
import FileUpload from './FileUpload'
import Rules from './Rules'

const all = [
  {
    type: 'empty',
    render: ({ isShow = true, content }) => (isShow
      ? (
        <div>
          <div>
            {content}
          </div>
        </div>
      )
      : null
    )
  },
  {
    type: 'blank',
    render: ({ isShow = true, status = 1, titleProps = {}, title,
      checkClick, categories, content }) => (
      isShow
        ? (
          <div>
            <ContentHeader status={status} categories={categories} checkClick={checkClick} {...titleProps}>
              {title}
            </ContentHeader>
            <div>
              {content}
            </div>
          </div>
        )
        : null
    )
  },
  {
    type: 'history',
    render: props => {
      const { title, isShow = true, status = 1, content, titleProps = {},
        checkClick, categories, ...otherProps } = props
      return (
        isShow
          ? (
            <div>
              <ContentHeader status={status} checkClick={checkClick} categories={categories} {...titleProps}>
                {title || '历史'}
              </ContentHeader>
              <div>
                {content || <History {...otherProps} />}
              </div>
            </div>
          )
          : null
      )
    }
  },
  {
    type: 'content',
    render: props => {
      const { title, isShow = true, status = 1, content,
        checkClick, categories, titleProps = {}, matterOpt, objectOpt, ...otherProps } = props
      return (
        isShow ? (
          <div>
            <ContentHeader status={status} checkClick={checkClick} categories={categories} {...titleProps}>
              {title || '内容'}
            </ContentHeader>
            <Row style={{ margin: '0 13.5px' }}>
              {/* <ContentHeader status={status} checkClick={checkClick} categories={categories} {...titleProps}>
                {title || '项目'}
              </ContentHeader> */}
              <Col span={8} style={{ padding: '0 16.5px' }}>
                <SYObject status={status} {...otherProps} {...objectOpt} />
              </Col>
              <Col span={8} style={{ padding: '0 16.5px' }}>
                <MatterOfNr status={status} {...otherProps} {...matterOpt} />
              </Col>
            </Row>
            <div>
              {content}
            </div>
          </div>
        )
          : null
      )
    }
  },
  {
    type: 'matter',
    render: props => {
      const { title, isShow = true, status = 1, content, titleProps = {},
        checkClick, categories, ...otherProps } = props
      return (
        isShow
          ? (
            <div>
              <ContentHeader status={status} checkClick={checkClick} categories={categories} {...titleProps}>
                {title || '项目'}
              </ContentHeader>
              <div>
                {content || <Matter status={status} {...otherProps} />}
              </div>
            </div>
          )
          : null
      )
    }
  },
  {
    type: 'files',
    render: props => {
      const { title, isShow = true, hasHeader = true, checkClick, categories,
        status = 1, content, titleProps = {}, ...otherProps } = props
      return (
        isShow
          ? (
            <div>
              {hasHeader ? (
                <ContentHeader status={status} checkClick={checkClick} categories={categories} {...titleProps}>
                  {title || '材料'}
                </ContentHeader>
              ) : content}

              <div>
                <div><FileUpload status={status} {...otherProps} /></div>
              </div>
            </div>
          )
          : null
      )
    }
  },
  {
    type: 'rules',
    render: props => {
      const { isShow = true, status = 1, content, titleProps = {},
        checkClick, categories, ...otherProps } = props
      return (
        isShow
          ? (
            <div>
              <ContentHeader status={status} checkClick={checkClick} categories={categories} {...titleProps}>
                {props.title || '规则'}
              </ContentHeader>
              <div>
                <div style={{ paddingLeft: 30, paddingRight: 30 }}>
                  {content || <Rules status={status} {...otherProps} />}
                </div>
              </div>
            </div>
          )
          : null
      )
    }
  },
  {
    type: 'comment',
    render: props => {
      const { title, isShow = true, status = 1, content, cardProps, titleProps = {},
        checkClick, categories, form: { getFieldDecorator }, ...otherProps } = props
      return (
        isShow
          ? (
            <div>
              <ContentHeader status={status} checkClick={checkClick} categories={categories} {...titleProps}>
                {props.title || '审批意见'}
              </ContentHeader>
              <div>
                {content || (
                  <div style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <Form.Item>
                      {getFieldDecorator('comment', {
                        rules: [{ required: true, message: '*请输入审批意见' }],
                      })(
                        <SYTextArea
                          autosize
                          {...otherProps}
                        />
                      )}
                    </Form.Item>
                  </div>
                )}
              </div>
            </div>
          )
          : null
      )
    }
  },
  {
    type: 'process',
    render: props => {
      const { isShow = true, status = 1, content, titleProps = {},
        checkClick, categories, ...otherProps } = props
      return (
        isShow
          ? (
            <div>
              <ContentHeader status={status} checkClick={checkClick} categories={categories} {...titleProps}>
                {props.title || '流程'}
              </ContentHeader>
              <div>
                <div style={{ paddingLeft: 30, paddingRight: 30 }}>
                  {content || (
                    <SYProcess
                      {...otherProps}
                    />
                  ) }
                </div>
              </div>
            </div>
          )
          : null
      )
    }
  },
  {
    type: 'button',
    render: props => {
      const { title, isShow = true, status = 1, content, ...otherProps } = props
      return (
        <div>
          <div>
            {content || (
              isShow
                ? (
                  <FixedButton
                    status={status}
                    {...otherProps}
                  />
                )
                : null
            )}
          </div>
        </div>
      )
    }
  },
]
export default function comonents(opt) {
  const { type = 'blank', ...otherOpt } = opt
  const cur = all.filter(v => type === v.type)[0]
  return cur ? cur.render(otherOpt) : null
}
