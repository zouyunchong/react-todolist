import React from 'react'
import Item from './Item'
export default function List(props) {
  let { list,checkHandler,checkAllHandler,delHandler } = props;
  return (
    <ul className="task-list">
         {
           list.map(item => (<Item item={item} key={item.id} checkHandler={checkHandler} checkAllHandler={checkAllHandler} delHandler={delHandler}></Item>))
         }
       </ul>
  )
}
