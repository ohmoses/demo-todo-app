/*
childrenFromId
--------------

Returns a Map: String => List, mapping task ids to a list of their direct
children's ids.
*/

import { Map, List } from 'immutable'

export default function (state = Map(), action) {
  const {
    parentId,
    id,
    index,
    newId,
    direction,
  } = action.payload || {}

  const children = state.get(parentId, List())
  const indexOfId = children.indexOf(id)

  let newChildren

  switch (action.type) {

    case 'DROP CHILDREN':
      return state.delete(parentId)

    case 'INSERT CHILD':
      newChildren = children.insert(index, id)
      return state.set(parentId, newChildren)

    case 'REMOVE CHILD':
      newChildren = children.delete(indexOfId)
      if (!children.size) {
        return state.delete(parentId)
      } else {
        return state.set(parentId, newChildren)
      }

    case 'REPLACE CHILD':
      newChildren = children.delete(indexOfId).insert(indexOfId, newId)
      return state.set(parentId, newChildren)

    case 'MOVE CHILD':
      newChildren = children.delete(indexOfId).insert(indexOfId + direction, id)
      return state.set(parentId, newChildren)

    default:
      return state
  }
}
