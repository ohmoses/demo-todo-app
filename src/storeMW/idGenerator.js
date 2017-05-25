/*
idGenerator
-----------

Generates a unique id for each new task using Eric Elliot's cuid module.
*/

import cuid from 'cuid'

export default store => next => action => {
  if (action.type === 'CREATE ITEM') {
    const id = cuid()

    action.payload.id = id

    next(action)
    /*
    The generated id gets returned out of the dispatch call to be used in
    subsequent dispatches.
    */
    return id
  }

  return next(action)
}
