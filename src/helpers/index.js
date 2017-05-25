import { List } from 'immutable'
import store from '../store'

export function getContext (state, id = state.selectedTask) {
  const taskProps = state.propsFromId.get(id, {})
  const parentId = state.propsFromId.get(id, {}).parent || 'ROOT'
  const siblingsIds = state.childrenFromId.get(parentId, List())
  const childrenIds = state.childrenFromId.get(id, List())
  const siblings = siblingsIds.map(id => state.propsFromId.get(id))
  const children = childrenIds.map(id => state.propsFromId.get(id))
  const index = siblingsIds.indexOf(id)

  return {
    id,
    taskProps,
    parentId,
    siblingsIds,
    childrenIds,
    siblings,
    children,
    index,
  }
}

export function * iterateOverAncestors (id) {
  let nextId

  while ((nextId = store.getState().propsFromId.get(id).parent) !== 'ROOT') {
    id = nextId
    yield nextId
  }
}

export function * iterateOverChildren (id, predicate) {
  for (let childId of (store.getState().childrenFromId.get(id, List()))) {
    if (!predicate || predicate(childId)) {
      yield childId
      yield * iterateOverChildren(childId, predicate)
    }
  }
}

// allows dispatching an action or a list of actions over an array of ids
export function dispatchOver (actions, ids, payload) {
  for (let id of ids) {
    if (Array.isArray(actions)) {
      for (let action of actions) {
        store.dispatch(action(id, payload))
      }
    } else {
      store.dispatch(actions(id, payload))
    }
  }
}
