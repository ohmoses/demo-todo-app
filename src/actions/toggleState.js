import {
  updateItem,
} from './basic'

import {
  getContext,
  dispatchOver,
  iterateOverChildren,
  iterateOverAncestors,
} from '../helpers'

/*
  If the selected task is 'completed' or 'invalidated', this fn opens it,
  as well as all its ancestors and descendants.

  If the task is 'open', this fn completes it, as well as all open descendants.
*/
export function toggleCompleteTask () {
  return (dispatch, getState) => {
    const { id, taskProps: { state } } = getContext(getState())

    if (id && getState().showSelected) {
      if (state === 'open') {
        dispatchOver(
          updateItem,
          [
            id,
            ...iterateOverChildren(
              id,
              id => getState().propsFromId.get(id).state === 'open'
            ),
          ],
          { state: 'completed' }
        )
      } else {
        dispatchOver(
          updateItem,
          [
            id,
            ...iterateOverChildren(id),
            ...iterateOverAncestors(id),
          ],
          { state: 'open' }
        )
      }
    }
  }
}

/*
  Invalidates the task and all its open descendants.
*/
export function invalidateTask () {
  return (dispatch, getState) => {
    const { id, taskProps: { state } } = getContext(getState())

    if (id && getState().showSelected && state !== 'invalidated') {
      dispatchOver(
        updateItem,
        [
          id,
          ...iterateOverChildren(
            id,
            id => getState().propsFromId.get(id).state === 'open'
          ),
        ],
        { state: 'invalidated' }
      )
    }
  }
}
