
import React, { Component } from 'react'
import { bus as $bus } from './bus'

export default class mask extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  closeMask = ()=>{ // 关闭弹窗
    $bus.emit("getFlag",false)
  }
  updateHandler = ()=>{
    $bus.emit("getFlag",false)
    $bus.emit("update",this.state.value)
  }
  onChange = (e) =>{
    this.setState({
      value: e.target.value
    })
  }
  componentDidMount() {
    let obj = JSON.parse(localStorage.getItem("obj"))
    this.setState({
      value: obj.content
    })
  }
  render() {
    let { value } = this.state
    return (
      <div>
        <div className="mm-mask" >
        <div className="mm-modal">
          <div className="mm-title">
            <span className="mm-edit">编辑</span>
            <span className="mm-close" onClick={this.closeMask}>x</span>
          </div>
          <div className="mm-content">
            <input type="text" value={value} placeholder="任务名称" onInput={this.onChange}/>
          </div>
          <div className="mm-box-btn">
            <div className="mm-update" onClick={this.updateHandler}>更新</div>
            <div className="mm-cancel" onClick={this.closeMask}>取消</div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
