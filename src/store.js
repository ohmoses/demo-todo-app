import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import transit from 'transit-immutable-js'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import idGenerator from './storeMW/idGenerator'
import highlightSelected from './storeMW/highlightSelected'
import { TaskRecord } from './reducers/propsFromId'

// reducers to save to localStorage
const reducersToSave = [
  'childrenFromId',
  'propsFromId',
  'showCompleted',
]

const store = createStore(
  rootReducer,
  getInitialState(),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      idGenerator,
      highlightSelected,
    )
  )
)

export default store

// load from localStorage
function getInitialState () {
  const state = {}

  for (let reducer of reducersToSave) {
    const reducerState = window.localStorage.getItem(reducer)

    if (reducerState) {
      state[reducer] = transit.withRecords([TaskRecord]).fromJSON(reducerState)
    }
  }

  state.selectedTask = state.childrenFromId && state.childrenFromId.get('ROOT', { first: () => null }).first() || null

  return state
}

// save to localStorage
store.subscribe(makeLogToStorage())

function makeLogToStorage () {
  let curr = {}

  return () => {
    const prev = curr
    curr = store.getState()

    for (let reducer of reducersToSave) {
      if (curr[reducer] !== prev[reducer]) {
        window.localStorage.setItem(
          reducer,
          transit.withRecords([TaskRecord]).toJSON(curr[reducer]),
        )
      }
    }
  }
}
