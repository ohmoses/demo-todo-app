// UI

export function editOn () {
  return {
    type: 'EDIT ON',
  }
}

export function editOff () {
  return {
    type: 'EDIT OFF',
  }
}

export function selectedOn () {
  return {
    type: 'SELECTED ON',
  }
}

export function selectedOff () {
  return {
    type: 'SELECTED OFF',
  }
}

export function selectTask (id) {
  return {
    type: 'SELECT TASK',
    payload: { id: id === 'ROOT' ? null : id },
  }
}

// childrenFromId

export function dropChildren (parentId) {
  return {
    type: 'DROP CHILDREN',
    payload: { parentId },
  }
}

export function insertChild (parentId, id, index) {
  return {
    type: 'INSERT CHILD',
    payload: { parentId, id, index },
  }
}

export function removeChild (parentId, id) {
  return {
    type: 'REMOVE CHILD',
    payload: { parentId, id },
  }
}

export function replaceChild (parentId, id, newId) {
  return {
    type: 'REPLACE CHILD',
    payload: { parentId, id, newId },
  }
}

export function moveChild (parentId, id, direction = 1) {
  return {
    type: 'MOVE CHILD',
    payload: { parentId, id, direction },
  }
}

// propsFromId

export function createItem (payload) {
  return {
    type: 'CREATE ITEM',
    payload,
  }
}

export function updateItem (id, props) {
  return {
    type: 'UPDATE ITEM',
    payload: { id, props },
  }
}

export function deleteItem (id) {
  return {
    type: 'DELETE ITEM',
    payload: { id },
  }
}
