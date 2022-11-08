

import React from 'react'
import { bus as $bus } from './bus'
export default function Item(props) {
  
  let { item } = props;
  console.log('item222222',item)
    // localStorage.setItem("obj",JSON.stringify(item))
  const changeHandler=(id,e)=>{
    let { checkHandler } =props;
      checkHandler(id,e.target.checked)
    
  }

  const editHadnler=(item)=>{
    $bus.emit("getFlag",true)
    localStorage.setItem("obj",JSON.stringify(item))
    $bus.emit("getItem",item)
  }
  const removeHandler=(id)=>{
    console.log('id',id)
    let { delHandler } = props;
        delHandler(id)
  }
  return (
    <li className="task-item">
        <input type="checkbox" checked={item.checked} onChange={(e)=>{changeHandler(item.id,e)}}/>
         <div className="content">
           {item.content}
         </div>
        <button className={`btn btn-success ${!item.checked ? "d-none" : "d-block"}`} onClick={()=>{editHadnler(item)}}>编辑</button>
         <button className={`btn btn-danger ${!item.checked ? "d-none" : "d-block"}`} onClick={()=>{removeHandler(item.id)}}>删除</button>
       </li>
  )
}
