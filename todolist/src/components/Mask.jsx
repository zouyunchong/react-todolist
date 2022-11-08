import React,{useState,useEffect} from 'react'
import { bus as $bus } from './bus'
export default function Mask() {
  const [value,setValue] = useState('');
  useEffect(()=>{
    let obj = JSON.parse(localStorage.getItem("obj"))
    setValue(obj.content)
  },[])

  const closeMask = (()=>{
    $bus.emit("getFlag",false)
  })
  const onChange=((e)=>{
    setValue(e.target.value)
  })
  const updateHandler=(()=>{
    $bus.emit("getFlag",false)
    $bus.emit("update",value)
  })
  return (
    <div>
             <div className="mm-mask" >
             <div className="mm-modal">
               <div className="mm-title">
                 <span className="mm-edit">编辑</span>
                 <span className="mm-close" onClick={closeMask}>x</span>
               </div>
               <div className="mm-content">
                 <input type="text" value={value} placeholder="任务名称" onInput={(e)=>{onChange(e)}}/>
               </div>
               <div className="mm-box-btn">
                 <div className="mm-update" onClick={updateHandler}>更新</div>
                 <div className="mm-cancel" onClick={closeMask}>取消</div>
               </div>
             </div>
           </div>
           </div>
  )
}
