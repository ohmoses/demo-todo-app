import { combineReducers } from 'redux'
import childrenFromId from './childrenFromId'
import propsFromId from './propsFromId'
import {
  isEdited,
  showSelected,
  showCompleted,
  selectedTask,
} from './UI'

export default combineReducers({
  selectedTask,
  isEdited,
  showSelected,
  showCompleted,
  childrenFromId,
  propsFromId,
})
