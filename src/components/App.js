import React from 'react'
import TaskEditor from './TaskEditor'
import About from './About'
import './main.scss'

export default () =>
  <div className='app'>
    <TaskEditor />
    <About />
  </div>
