import React, { Component } from 'react'
import Item from './Item'
import PropTypes from 'prop-types'
export default class List extends Component {
  static propTypes = {
        list:PropTypes.array.isRequired,
    }
  render() {
    let { list,checkHandler,checkAllHandler,delHandler } = this.props;
    console.log('list',list)
    return (
      <ul className="task-list">
        {
          list.map(item => (<Item item={item} key={item.id} checkHandler={checkHandler} checkAllHandler={checkAllHandler} delHandler={delHandler}></Item>))
        }
      </ul>
    )
  }
}
