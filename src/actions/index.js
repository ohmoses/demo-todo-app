import {
  editOn,
  selectedOff,
  selectTask,
  updateItem,
} from './basic'

import {
  addNewAbove,
  addNewBelow,
  addNewChild,
} from './add'

import {
  remove,
} from './remove'

import {
  confirmEdit,
  cancelEdit,
} from './edit'

import {
  toggleCompleteTask,
  invalidateTask,
} from './toggleState'

import {
  selectAbove,
  selectBelow,
  goLeft,
  goRight,
} from './select'

import {
  moveUp,
  moveDown,
  indent,
  unindent,
} from './move'

import {
  getContext,
} from '../helpers'

export {
  enterKey,
  escapeKey,
  editTask,
  toggleExpandTask,
  selectTask,
  addNewAbove,
  addNewBelow,
  addNewChild,
  remove,
  confirmEdit,
  cancelEdit,
  toggleCompleteTask,
  invalidateTask,
  selectAbove,
  selectBelow,
  goLeft,
  goRight,
  moveUp,
  moveDown,
  indent,
  unindent,
}

function enterKey () {
  return (dispatch, getState) => {
    if (getState().isEdited) {
      dispatch(confirmEdit())
    } else {
      dispatch(addNewBelow())
    }
  }
}

function escapeKey () {
  return (dispatch, getState) => {
    if (getState().isEdited) {
      dispatch(cancelEdit())
    } else {
      dispatch(selectedOff())
    }
  }
}

function editTask () {
  return (dispatch, getState) => {
    if (getState().selectedTask) {
      dispatch(editOn())
    }
  }
}

function toggleExpandTask (id) {
  return (dispatch, getState) => {
    const { taskProps: { expanded } } = getContext(getState(), id)

    dispatch(updateItem(id, { expanded: !expanded }))
  }
}
