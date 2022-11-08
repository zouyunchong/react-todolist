import React from 'react'
export default function Total(props) {
  let { checkAll,selectLength,list } = props;
  const changeAllHandler=((e)=>{
    let { checkAllHandler } = props
    checkAllHandler(e.target.checked)
  })
  return (
    <div className="task-done">
             <div style={{display:'flex',alignItems:'center'}}>
               <p style={{marginRight:'5px'}}>全选全不选</p>
               <input type="checkbox" onChange={changeAllHandler} checked={checkAll}/>
             </div>
            
             <p>已完成<span className="single-number">{selectLength}</span> /全部<span className="all-number">{list.length}</span></p>
    </div>
  )
}
