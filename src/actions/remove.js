import {
  selectTask,
  dropChildren,
  removeChild,
  deleteItem,
} from './basic'

import {
  getContext,
  dispatchOver,
  iterateOverChildren,
} from '../helpers'

/*
Removes the task, deletes its entry from the propsFromId map, deletes all
descendants, drops entries from the childrenFromId map where applicable.
*/
export function remove () {
  return (dispatch, getState) => {
    const {
      id,
      parentId,
      siblingsIds,
      index,
    } = getContext(getState())

    if (id && getState().showSelected) {
      if (siblingsIds.size === 1) {
        dispatch(selectTask(parentId))
      } else {
        dispatch(selectTask(siblingsIds.get(
          id === siblingsIds.last() ? index - 1 : index + 1
        )))
      }

      dispatch(removeChild(parentId, id))
      dispatchOver(
        [deleteItem, dropChildren],
        [id, ...iterateOverChildren(id)],
      )
    }
  }
}
