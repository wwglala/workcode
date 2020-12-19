/*
 * @Author: wgf
 * @Date: 2020-03-21 11:13:33
 * @LastEditors: wgf
 * @LastEditTime: 2020-03-30 15:07:16
 * @Descripttion:
 */
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './store'
import add from './img/add.png'
import del from './img/del.png'
import icon from './img/icon.png'
import styles from './style.module.less'

@observer
class SYPersonnelSelection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false,
            flagPerson: false
        }
    }
    componentWillMount() {
        Store.setStore(this.props.dataSource || [])
        Store.setStorePerson(this.props.dataSourcePerson || [])
    }
    change = async index => {
        if (this.state.flag) {
            await Store.delStore(index)
            this.props.CallbackData(Store.dataSource)
        }
    }
    changePerson = async index => {
        if (this.state.flagPerson) {
            await Store.delStorePerson(index)
            this.props.CallbackDataPerson(Store.dataSource)
        }
    }
    delte = () => {
        this.setState(pveState => ({
            flag: !pveState.flag
        }))
    }
    deltePerson = () => {
        this.setState(pveState => ({
            flagPerson: !pveState.flagPerson
        }))
    }

    render() {
        const { type = 'all', deptName = '部门名称', personName = '参会人' } = this.props
        const flag = type === 'dept' || type === 'all'
        const flags = type === 'person' || type === 'all'
        return (
            <div>
                {
                    flag ? <div>
                        <div>{`${deptName}：`}</div>
                        <div className={styles.flex}>
                            {
                                Store.dataSource.map((item, index) => {
                                    return (
                                        <div
                                            key={index.toString()}
                                            className={styles.tal}
                                            onClick={() => { this.change(index) }}
                                        >
                                            <img src={item.img} alt='头像' />
                                            <img className={`${styles.icon} ${this.state.flag ? styles.select : styles.unselect}`} src={icon} alt='删除' />
                                            <div>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                            <div className={styles.tal} onClick={() => { this.props.onClick() }}>
                                <img src={add} alt='添加' />
                                <div>添加</div>
                            </div>
                            <div className={styles.tal} onClick={() => { this.delte() }}>
                                <img src={del} alt='删除' />
                                <div>删除</div>
                            </div>
                        </div>
                    </div> : null
                }
                {
                    flags ? <div>
                        <div style={{ marginTop: 20 }}>{`${personName}：`}</div>
                        <div className={styles.flex}>
                            {
                                Store.dataSourcePerson.map((item, index) => {
                                    return (
                                        <div
                                            key={index.toString()}
                                            className={styles.tal}
                                            onClick={() => { this.changePerson(index) }}
                                        >
                                            <img src={item.img} alt='头像' />
                                            <img className={`${styles.icon} ${this.state.flagPerson ? styles.select : styles.unselect}`} src={icon} alt='删除' />
                                            <div>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                            <div className={styles.tal} onClick={() => { this.props.onClickPerson() }}>
                                <img src={add} alt='添加' />
                                <div>添加</div>
                            </div>
                            <div className={styles.tal} onClick={() => { this.deltePerson() }}>
                                <img src={del} alt='删除' />
                                <div>删除</div>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        )
    }
}
export default SYPersonnelSelection
