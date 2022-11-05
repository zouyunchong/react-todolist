import React, {  PureComponent } from 'react'
import Input from './components/Input'
import List from './components/List'
import Total from './components/Total'
import Mask from './components/Mask'
import Footer from './components/Footer'
import { bus as $bus } from './components/bus'
import './App.css'
export default class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      list: JSON.parse(localStorage.getItem('list')) || [],
      flag:  JSON.parse(localStorage.getItem('flag')) || false,
      checkAll:  JSON.parse(localStorage.getItem('checkAll')) || false,
      selectLength: JSON.parse(localStorage.getItem('selectLength')) || 0,
      item: JSON.parse(localStorage.getItem('item')) || {}
    }
  }
  // 全选全不选
  checkAllHandler(checked) {
    const { list } = this.state
    const newList = list.map(item =>{
      return {...item,checked}
    })
    this.setState({list:newList,checkAll: checked},()=>{
      this.doneLenth()
    })
  }
  // 单选单不选
  checkHandler =(id,checked)=> {
    const { list } = this.state
    const newList = list.map(item => {
      return item.id === id ? {...item,checked} : item
    })
    let checkAll = newList.length && newList.every(item => item.checked)
    this.setState(() => ({list: newList,checkAll}),()=>{
      this.doneLenth()
    })
  }
  // 添加 
  addHandler = (obj)=>{
    let { list } = this.state;
    let newList = [...list,obj]
    this.setState({
      list: newList,
    },()=>{
      this.doneLenth()
    })
  } 

  // 删除
  delHandler = (id)=> {
    const { list } = this.state
    const newList = list.filter(item => item.id !==id)
    let checkAll = newList.length && newList.every(item => item.checked)
    this.setState(() => ({list: newList,checkAll}),()=>{
      this.doneLenth()
    })
  }
  // 编辑
  editHandler = (items)=>{
    this.setState({
      item: items
    })
  }
  // 更新
  update = (content)=>{
    const { list,item } = this.state
    let obj = Object.assign(item,{content})
    const newList = list.map(v =>{
      if(v.id === obj.id) {
        v = {...obj}
      }
      return v
    })
    this.setState({
      list: newList,
      item: obj
    })
  }
  // 已完成 
  doneLenth=()=> {
    const { list } = this.state
    const newList = list.filter(item => item.checked)
    let selectLength = newList.length
    setTimeout(()=>{
      this.setState({
        selectLength
      })
    })
  }
  // 挂载
  componentDidMount() {

    this.unSubscribe = $bus.addListener("getFlag",(flag)=>{
      this.setState({flag})
    })
    this.unSubscribe1 = $bus.addListener("sendValue",(obj)=>{
     this.addHandler(obj)
    })
    // this.unSubscribe2 = $bus.addListener("searchValue",(value)=>{
    //  this.searchHandler(value)
    // })
    this.unSubscribe3 = $bus.addListener("getItem",(item)=>{
     this.editHandler(item)
    })
    this.unSubscribe4 = $bus.addListener("update",(content)=>{
     this.update(content)
    })
  }
  // 卸载
  componentWillUnmount() {
    // $bus.removeListener(this.unSubscribe)
    // $bus.removeListener(this.unSubscribe1)
    // $bus.removeListener(this.unSubscribe2)
    // $bus.removeListener(this.unSubscribe3)
    // $bus.removeListener(this.unSubscribe4)
  }
  render() {
    let { flag, list,checkAll,selectLength } = this.state;
    localStorage.setItem('list',JSON.stringify(this.state.list));
    localStorage.setItem('flag',JSON.stringify(this.state.flag));
    localStorage.setItem('checkAll',JSON.stringify(this.state.checkAll));
    localStorage.setItem('selectLength',JSON.stringify(this.state.selectLength));
    localStorage.setItem('item',JSON.stringify(this.state.item));

    return (
      <div className='container'>
        {/* 表头 */}
          <h1 className='title' style={{marginBottom:'20px'}}>This is Todo List</h1>
        {/* 输入框 */}
        <Input></Input>
        {/* 列表 */}
        <List list={list} checkHandler={this.checkHandler} delHandler={this.delHandler}></List>
        {/* 统计 */}
        <Total checkAllHandler={this.checkAllHandler.bind(this)} checkAll={checkAll} selectLength={selectLength} list={list}></Total>
        {/* 编辑弹框 */}
        { flag ? <Mask ></Mask> : ''}
        <Footer list={list} selectLength={selectLength}></Footer>

      </div>
    )
  }
}
