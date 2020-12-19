/*
 * @Author: wgf
 * @Date: 2020-03-19 11:08:56
 * @LastEditors: wgf
 * @LastEditTime: 2020-03-24 16:45:24
 * @Descripttion: wangguofeng@atwasoft.net
 */
import { useState, useEffect } from 'react'
import style from './index.module.less'
import Avatar from './img/empty.png'
import Store from '../store'

function TopHeader(props) {
  const { userInfo = {}, onClick = () => {}, grxmUrl, grxmParams } = props
  const [grxm, setGrxm] = useState('')
  useEffect(() => {
    // let store = new Store()
    Store.getDataSource(
      grxmUrl,
      grxmParams
    ).then(() => {
      if (Store.dataSource[0]) {
        setGrxm(Store.dataSource[0].MC)
      }
    })
  }, [])
  const { avatar, badge, name, des, belong, location, time } = userInfo
  return (
    <div className={style['top-header']} onClick={() => { onClick({ avatar, badge, name, des, belong, location, time }) }}>
      <div className={style.avatar}>
        <img className={style.img} src={avatar || (Avatar)} alt='avatar' />
      </div>
      <div className={style['user-info']}>
        <div className={style['name-des']}>
          <span className={style.name}>{name || '无名氏'}</span>
          { (des === 'undefiend' || des === ' ')
            ? <span className={style.des}>群众</span>
            : <span className={style.des}>{des || '群众'}</span>}
          {
            badge ? <img className={style.badge} src={badge} alt='badge' /> : null
          }
        </div>
        <div className={style.belong}>{belong}</div>
        <div className={style['location-time']}>
          <span className={style.location}>{`地点：${location}`}</span>
          <span className={style.time}>{`时间：${time}`}</span>
        </div>
      </div>
      <div className={style.khxm}><div className={style.khxmSpan}>{grxm}</div></div>
    </div>
  )
}

export default TopHeader
