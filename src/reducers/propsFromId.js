/*
propsFromId
-----------

Returns a Map: String => Record, mapping task ids to a record of their properties.
*/

import { Map, Record } from 'immutable'

export const TaskRecord = Record({
  id: '',
  content: '',
  parent: '',
  state: 'open',
  expanded: true,
}, 'TaskRecord')

export default function (state = Map(), action) {
  if (!(action.payload && action.payload.id)) return state

  switch (action.type) {

    case 'CREATE ITEM':
      return state.set(action.payload.id, new TaskRecord(action.payload))

    case 'UPDATE ITEM':
      const item = state.get(action.payload.id)
      return state.set(action.payload.id, new TaskRecord({ ...item.toJS(), ...action.payload.props }))

    case 'DELETE ITEM':
      return state.delete(action.payload.id)

    default:
      return state
  }
}
