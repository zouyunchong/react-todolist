import React, { Component } from 'react'
import { bus as $bus } from './bus'
export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  changeHandler = (id)=>{
    let { checkHandler } = this.props;
    return (e)=>{
      checkHandler(id,e.target.checked)
    }
  }
  removeHandler(){
    let { delHandler } = this.props;
    delHandler(arguments[0])
  }
  editHadnler = (item)=>{
    $bus.emit("getFlag",true)
    localStorage.setItem("obj",JSON.stringify(item))
    $bus.emit("getItem",item)
  }
  render() {
    let { item } = this.props;
    return (
      <li className="task-item">
        <input type="checkbox" checked={item.checked} onChange={this.changeHandler(item.id)}/>
        <div className="content">
          {item.content}
        </div>
        <button className={`btn btn-success ${!item.checked ? "d-none" : "d-block"}`} onClick={()=> this.editHadnler(item)}>编辑</button>
        <button className={`btn btn-danger ${!item.checked ? "d-none" : "d-block"}`} onClick={this.removeHandler.bind(this,item.id)}>删除</button>
      </li>
    )
  }
}