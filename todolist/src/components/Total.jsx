import React, { Component } from 'react'
export default class Total extends Component {
  constructor() {
    super()
    this.changeAllHandler = this.changeAllHandler.bind(this)
  }
  changeAllHandler(e) {
    let { checkAllHandler } = this.props
    checkAllHandler(e.target.checked)
  }
  render() {
    let { checkAll,selectLength,list } = this.props;
    
    return (
      <div className="task-done">
        <div style={{display:'flex',alignItems:'center'}}>
          <p style={{marginRight:'5px'}}>全选全不选</p>
          <input type="checkbox" onChange={this.changeAllHandler} checked={checkAll}/>
        </div>
        
        <p>已完成<span className="single-number">{selectLength}</span> /全部<span className="all-number">{list.length}</span></p>
      </div>
    )
  }
}
