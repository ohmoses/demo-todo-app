import {
  selectTask,
  updateItem,
} from './basic'

import {
  getContext,
} from '../helpers'

/*
  Selects the task above the currently selected one.
*/
export function selectAbove () {
  return (dispatch, getState) => {
    const {
      id,
      parentId,
      siblingsIds,
      index,
    } = getContext(getState())

    if (id) {
      if (id !== siblingsIds.first()) {
        dispatch(selectTask(getLastVisibleDescendant(siblingsIds.get(index - 1))))
      } else if (parentId !== 'ROOT') {
        dispatch(selectTask(parentId))
      }
    }

    function getLastVisibleDescendant (id) {
      const {
        taskProps: {
          expanded,
        },
        childrenIds,
      } = getContext(getState(), id)

      if (expanded && childrenIds.size) {
        return getLastVisibleDescendant(childrenIds.last())
      } else {
        return id
      }
    }
  }
}

/*
  Selects the task below the currently selected one.
*/
export function selectBelow () {
  return (dispatch, getState) => {
    const {
      id,
      taskProps: {
        expanded,
      },
      childrenIds,
    } = getContext(getState())

    if (id) {
      if (expanded && childrenIds.size) {
        dispatch(selectTask(childrenIds.first()))
      } else {
        dispatch(selectTask(getNextVisibleTask(id) || id))
      }
    }

    function getNextVisibleTask (id) {
      const {
        parentId,
        siblingsIds,
        index,
      } = getContext(getState(), id)

      if (id !== siblingsIds.last()) {
        return siblingsIds.get(index + 1)
      } else if (parentId !== 'ROOT') {
        return getNextVisibleTask(parentId)
      }
    }
  }
}

/*
  If the task is expanded and has children, collapses it; otherwise selects the
  parent.
*/
export function goLeft () {
  return (dispatch, getState) => {
    const {
      id,
      taskProps: {
        expanded,
      },
      parentId,
      childrenIds,
    } = getContext(getState())

    if (id && getState().showSelected) {
      if (expanded && childrenIds.size) {
        dispatch(updateItem(id, { expanded: false }))
      } else if (parentId !== 'ROOT') {
        dispatch(selectTask(parentId))
      }
    }
  }
}

/*
  If the task is collapsed and has children, expands it; otherwise selects the
  task below.
*/
export function goRight () {
  return (dispatch, getState) => {
    const {
      id,
      taskProps: {
        expanded,
      },
      childrenIds,
    } = getContext(getState())

    if (id && getState().showSelected) {
      if (!expanded && childrenIds.size) {
        dispatch(updateItem(id, { expanded: true }))
      } else {
        dispatch(selectBelow())
      }
    }
  }
}
