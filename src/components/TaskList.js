import React from 'react'
import Task from './Task'
import './main.scss'

export default ({ children }) =>
  <ul className='taskList'>
    {children.map(child =>
      <Task
        key={child.id}
        id={child.id}
      />
    )}
  </ul>
