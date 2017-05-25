import {
  insertChild,
  removeChild,
  moveChild,
  updateItem,
} from './basic'

import {
  getContext,
} from '../helpers'

/*
  Indents task one level.
*/
export function indent () {
  return (dispatch, getState) => {
    const {
      id,
      parentId,
      siblingsIds,
      index,
    } = getContext(getState())

    if (id && index && getState().showSelected) {
      const previousSiblingId = siblingsIds.get(index - 1)
      const nephews = getContext(getState(), previousSiblingId).childrenIds

      dispatch(removeChild(parentId, id))
      dispatch(insertChild(previousSiblingId, id, nephews.size))
      dispatch(updateItem(id, { parent: previousSiblingId }))
      dispatch(updateItem(previousSiblingId, { expanded: true }))
    }
  }
}

/*
  Unindents task one level, listing it directly after its parent.
*/
export function unindent () {
  return (dispatch, getState) => {
    const {
      id,
      parentId,
    } = getContext(getState())

    if (id && parentId !== 'ROOT' && getState().showSelected) {
      const {
        parentId: grandpa,
        index: parentIndex,
      } = getContext(getState(), parentId)

      dispatch(removeChild(parentId, id))
      dispatch(insertChild(grandpa, id, parentIndex + 1))
      dispatch(updateItem(id, { parent: grandpa }))
    }
  }
}

/*
  Moves selected task one up, Checkvist-style.
*/
export function moveUp () {
  return move('up')
}

/*
  Moves selected task one down.
*/
export function moveDown () {
  return move('down')
}

function move (dir) {
  return (dispatch, getState) => {
    const { id, parentId, siblingsIds } = getContext(getState())

    if (id && getState().showSelected) {
      // Trivial case: if there is a sibling in the direction of the move, switch
      // places with it.
      if (id !== siblingsIds[dir === 'down' ? 'last' : 'first']()) {
        dispatch(moveChild(parentId, id, dir === 'down' ? 1 : -1))

        // If the selected task is the first/last child of its parent, find suitable
        // move target if one exists.
      } else if (parentId !== 'ROOT') {
        // findMoveTarget returns undefined if no suitable target exists.
        const newParent = findMoveTarget(parentId, 0, dir)

        if (newParent) {
          const { id, parentId } = getContext(getState())
          const { childrenIds: newSiblings } = getContext(getState(), newParent)

          dispatch(removeChild(parentId, id))
          dispatch(insertChild(newParent, id, dir === 'down' ? 0 : newSiblings.size))
          dispatch(updateItem(id, { parent: newParent }))
        }
      }
    }

    // Find the first ancestor which has an expanded sibling above/below it; that
    // sibling will be the new ancestor.
    function findMoveTarget (id, level, dir) {
      const {
        parentId,
        siblings,
        index,
      } = getContext(getState(), id)

      if (id === siblings[dir === 'down' ? 'last' : 'first']().id) {
        if (parentId !== 'ROOT') {
          return findMoveTarget(parentId, level + 1, dir)
        }
        // else we got all the way up to ROOT without finding an expanded sibling,
        // return undefined
      } else {
        const newTask = siblings.get(dir === 'down' ? index + 1 : index - 1)

        if (newTask.expanded) {
          // Once the new ancestor is found, find an expanded children as close
          // to the original indentation level as possible.
          return findChildAtLevel(newTask.id, level, dir)
        } else {
          return findMoveTarget(newTask.id, level, dir)
        }
      }
    }

    function findChildAtLevel (id, level, dir) {
      const { children } = getContext(getState(), id)

      if (level && children.size) {
        const finder = dir === 'down' ? 'find' : 'findLast'
        const last = children[finder](task => task.expanded, null, { id }).id

        return findChildAtLevel(last, level - 1, dir)
      } else {
        return id
      }
    }
  }
}
