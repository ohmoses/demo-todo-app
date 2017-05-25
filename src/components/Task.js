import React from 'react'
import { connect } from 'react-redux'
import TaskList from './TaskList'
import InputField from './InputField'
import './main.scss'
import { selectTask, editTask, confirmEdit, toggleExpandTask } from '../actions'
import { getContext } from '../helpers'

const Task = ({
  task,
  isEdited,
  selectedTask,
  showSelected,
  children,
  callbacks,
}) => {
  // helper consts
  const isSelected = selectedTask === task.id
  const highlightSelection = isSelected && showSelected && !isEdited

  // elements
  const triangle =
    <div className='pretask triangle' onClick={callbacks.toggleExpand}>
      {(task.expanded) ? '\u25be' : '\u25b8'}
    </div>

  const inputField =
    <InputField content={task.content} confirm={callbacks.confirm} />

  const content =
    <span className={task.state}>
      {task.content}
    </span>

  // element props
  const taskProps = {
    className: 'task' + ((highlightSelection) ? ' selected' : ''),
    onClick: callbacks.select,
    onDoubleClick: callbacks.edit,
  }

  return (
    <li>

      {/* the task itself */}
      <div>

        {/* triangle indicating expanded/collapsed task */}
        {(children.size) ? triangle : <div className='pretask' />}

        {/* content */}
        <div {...taskProps}>
          {(isSelected && isEdited) ? inputField : content}
        </div>

      </div>

      {/* the task's children */}
      <TaskList children={(task.expanded) ? children : []} />

    </li>
  )
}

const mapState = (state, { id }) => {
  const { isEdited, selectedTask, showSelected } = state
  const { taskProps, children } = getContext(state, id)

  return {
    isEdited,
    selectedTask,
    showSelected,
    task: taskProps,
    children,
  }
}

const mapDispatch = (dispatch, { id }) => ({
  callbacks: {
    select: () => { dispatch(selectTask(id)) },
    edit: () => { dispatch(editTask()) },
    confirm: () => { dispatch(confirmEdit()) },
    toggleExpand: () => { dispatch(toggleExpandTask(id)) },
  },
})

export default connect(mapState, mapDispatch)(Task)
