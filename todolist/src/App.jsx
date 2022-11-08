import React,{useState,useEffect,useCallback} from 'react'
import Input from './components/Input'
import List from './components/List'
import Total from './components/Total'
import Mask from './components/Mask'
import Footer from './components/Footer'
import { bus as $bus } from './components/bus'
import './App.css'

export default function App() {
  const [flag,setFlag] = useState(false)
  const [list,setList] =useState([])
  const [checkAll,setCheckAll] = useState(false)
  const [selectLength,setSelectLength] = useState(0)
  const [item,setItem] = useState({})

  localStorage.setItem("list",JSON.stringify(list)) 
  localStorage.setItem("flag",JSON.stringify(flag))
  localStorage.setItem("checkAll",JSON.stringify(checkAll))
  localStorage.setItem("selectLength",JSON.stringify(selectLength))
  localStorage.setItem("item",JSON.stringify(item))

  //全选全不选
const checkAllHandler=(checked)=>{
  const newList = list.map(item =>{
          return {...item,checked}
        })
        setList(newList)
        setCheckAll(checked)
}
  //单选单不选
  const CheckHandler =(id,checked)=> {
    console.log('id',id)
    console.log('checked',checked)
    const newList = list.map(item => {
      return item.id === id ? {...item,checked} : item
    })
    let checkAll = newList.length && newList.every(item => item.checked)
    setList(newList)
    setCheckAll(checkAll)
   
  }
  useEffect(()=>{
    doneLenth()
  }) 


  // 删除
  const delHandler = (id)=> {
    const newList = list.filter(item => item.id !==id)
    let checkAll = newList.length && newList.every(item => item.checked)
    setList(newList)
    setCheckAll(checkAll)
   
  }

  // 已完成 
  const doneLenth=()=> {
    console.log("length",list.length)
    const newList = list.filter(item => item.checked)
    
    let selectLength = newList.length
    console.log('selectLength',selectLength)
    setTimeout(()=>{
      setSelectLength(
        selectLength
      )
    })
  }
  // 添加 
  const addHandler = useCallback((obj)=>{
    let newList = [...list,obj]
    setList(newList)
  },[list])
  // 编辑
 const  editHandler = (items)=>{
  setItem(
    items
    )
  }
  //更新
  const update = useCallback((content)=>{
    let obj = Object.assign(item,{content})
    const newList = list.map(v =>{
      if(v.id === obj.id) {
        v = {...obj}
      }
      return v
    })
    setItem(obj)
    setList(newList)
  },[item,list])
  useEffect(()=>{
    setFlag(JSON.parse(localStorage.getItem('flag')) || false)
    setList(JSON.parse(localStorage.getItem('list')) || [])
    setCheckAll(JSON.parse(localStorage.getItem('checkAll')) || false)
    setSelectLength(JSON.parse(localStorage.getItem('selectLength')) || 0)
    setItem(JSON.parse(localStorage.getItem('item')) || {})
    
  },[])
  useEffect(()=>{
    const unSubscribe = $bus.addListener("getFlag",(flag)=>{setFlag(flag)})
    return () => {
      return ()=>{
        $bus.removeListener(unSubscribe)
      }  
    }
  },[])
  useEffect(()=>{
    const unSubscribe1 = $bus.addListener("sendValue",(obj)=>{addHandler(obj)})
      return () => {
        return ()=>{
          $bus.removeListener(unSubscribe1)
        }
  
      }
  },[addHandler])
  useEffect(()=>{
    const  unSubscribe3 = $bus.addListener("getItem",(item)=>{editHandler(item)})
      return () => {
        return ()=>{
          $bus.removeListener(unSubscribe3)
        } 
      }
  },[])
  
  useEffect(()=>{
    const unSubscribe4 = $bus.addListener("update",(content)=>{update(content)})
      return () => {
        return ()=>{
          $bus.removeListener(unSubscribe4)
        }  
      }
  },[update])

  return (
    <div className='container'>
         {/* 表头 */}
           <h1 className='title' style={{marginBottom:'20px'}}>This is Todo List</h1>
         {/* 输入框 */}
         <Input></Input>
         {/* 列表 */}
         <List list={list} checkHandler={CheckHandler} delHandler={delHandler}></List>
         {/* 统计 */}
         <Total checkAllHandler={checkAllHandler} checkAll={checkAll} selectLength={selectLength} list={list}></Total>
         {/* 编辑弹框 */}
         { flag ? <Mask ></Mask> : ''}
         <Footer list={list} selectLength={selectLength}></Footer>

       </div>
  )
}

