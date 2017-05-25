/*
highlightSelected
-----------------

The highlighting of the selected task can be turned off with `esc`; this turns it
back on if the user selects a task again.
*/

export default store => next => action => {
  if (action.type === 'SELECT TASK') {
    store.dispatch({ type: 'SELECTED ON' })
  }

  return next(action)
}
