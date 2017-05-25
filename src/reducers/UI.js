/*
A collection of small presentation-related reducers.
*/

export { isEdited, selectedTask, showSelected, showCompleted }

// returns whether a task is being edited or not
function isEdited (state = false, action) {
  switch (action.type) {
    case 'EDIT ON':
      return true
    case 'EDIT OFF':
      return false
    case 'TOGGLE EDIT':
      return !state
    default:
      return state
  }
}

// returns the id of the selected task
function selectedTask (state = null, action) {
  if (action.type === 'SELECT TASK') {
    return action.payload.id || null
  } else {
    return state
  }
}

// returns whether the selected task is highlighted
function showSelected (state = true, action) {
  switch (action.type) {
    case 'SELECTED ON':
      return true
    case 'SELECTED OFF':
      return false
    default:
      return state
  }
}

// returns whether completed and invalidated tasks are displayed or not
function showCompleted (state = true, action) {
  if (action.type === 'TOGGLE COMPLETED') {
    return !state
  } else {
    return state
  }
}
