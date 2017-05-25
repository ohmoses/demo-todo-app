import {
  editOn,
  selectTask,
  insertChild,
  createItem,
  updateItem,
} from './basic'

import {
  getContext,
} from '../helpers'

/*
  Opens an input field to create a new task above the currently selected task.
*/
export function addNewAbove () {
  return addNewRelativeToIndex(0)
}

/*
  Opens an input field to create a new task below the currently selected task.
*/
export function addNewBelow () {
  return addNewRelativeToIndex(1)
}

function addNewRelativeToIndex (direction) {
  return (dispatch, getState) => {
    const { parentId, index } = getContext(getState())
    const id = dispatch(createItem({ content: '', parent: parentId }))

    dispatch(selectTask(id))
    dispatch(editOn())
    dispatch(insertChild(parentId, id, index + direction))
  }
}

/*
  Opens an input field to create a new task as the first child of the currently
  selected task.
*/
export function addNewChild () {
  return (dispatch, getState) => {
    const { id } = getContext(getState())

    if (id && getState().showSelected) {
      const childId = dispatch(createItem({ content: '', parent: id }))

      dispatch(selectTask(childId))
      dispatch(editOn())
      dispatch(insertChild(id, childId, 0))
      dispatch(updateItem(id, { expanded: true }))
    }
  }
}
