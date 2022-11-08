import React,{useState} from 'react'
import { nanoid } from 'nanoid'
import { bus as $bus } from './bus'

export default function Input() {
  const [value,setValue] = useState('')
  const addHandler=()=>{

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
    setValue('')
  }
  const changeHandler=((e)=>{
    setValue(e.target.value)
  })
  return (
    <div className="input">
      <input type="text" value={value} placeholder='请输入你的任务名称，按Enter键确认' onChange={changeHandler}/>
      <button className="btn btn-success" onClick={addHandler}>添加</button>
    </div>
  )
}

