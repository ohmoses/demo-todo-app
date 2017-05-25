import React from 'react'
import { connect } from 'react-redux'
import { getContext } from '../helpers'
import TaskList from './TaskList'
import './main.scss'

const TaskEditor = ({ children }) => {
  const tasks =
    <TaskList
      children={children}
    />

  const placeholder =
    <ul className='taskList'>
      <li className='placeholder'>
        <div>
          <div className='pretask' />
          <div className='task'>
            [Press Enter to add a task.]
          </div>
        </div>
      </li>
    </ul>

  return (
    <div className='taskEditor'>
      <h1>demo-todo-app</h1>
      {(children.size) ? tasks : placeholder}
    </div>
  )
}

const mapState = state => ({
  children: getContext(state, 'ROOT').children,
})

export default connect(mapState)(TaskEditor)
