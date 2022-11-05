import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { bus as $bus } from './bus'
export default class Input extends Component {
  constructor() {
    super()
    this.state = {
      value:""
    }
  }
  // 输入框输入事件
  changeHandler = (e)=>{
    this.setState({
      value: e.target.value
    })
  }
  // 添加
  addHandler = ()=>{
    let { value } = this.state;
    let obj = {
      id: nanoid(),
      content: value,
      done: false
    }
    if(value) {
      $bus.emit("sendValue",obj)
    } else {
      alert("请输入")
    }
    this.setState({
        value:""
    })
  }
  render() {
    let { value } = this.state
    return (
      <>
        <div className="input">
          <input type="text" value={value} placeholder='请输入你的任务名称，按Enter键确认' onChange={this.changeHandler}/>
          <button className="btn btn-success" onClick={this.addHandler}>添加</button>
        </div>
      </>
    )
  }
}
