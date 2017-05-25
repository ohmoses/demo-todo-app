import {
  editOff,
  updateItem,
} from './basic'

import {
  remove,
} from './remove'

import {
  getContext,
  dispatchOver,
  iterateOverAncestors,
} from '../helpers'

/*
  Confirms edit; if the new content is empty, deletes the task.
*/
export function confirmEdit () {
  return (dispatch, getState) => {
    const { id, taskProps: { state } } = getContext(getState())
    const inputValue = document.getElementById('textarea').value

    if (inputValue === '') {
      dispatch(remove())
    } else {
      dispatch(updateItem(id, { content: inputValue }))
      // If a new task is created, its ancestors need to be open.
      if (state === 'open') {
        dispatchOver(updateItem, iterateOverAncestors(id), { state: 'open' })
      }
    }

    dispatch(editOff())
  }
}

/*
  Cancels edit; in the case of a new task being added, removes the task again.
*/
export function cancelEdit () {
  return (dispatch, getState) => {
    const { taskProps: { content } } = getContext(getState())

    if (content === '') {
      dispatch(remove())
    }

    dispatch(editOff())
  }
}
