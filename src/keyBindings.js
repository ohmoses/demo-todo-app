import Combokeys from 'combokeys'
import store from './store'
import * as actions from './actions'

const combokeys = new Combokeys(document)
require('combokeys/plugins/global-bind')(combokeys)

const keymap = [
  [ 'up', actions.selectAbove ],
  [ 'down', actions.selectBelow ],
  [ 'left', actions.goLeft ],
  [ 'right', actions.goRight ],
  [ 'alt+enter', actions.addNewAbove ],
  [ 'shift+enter', actions.addNewChild ],
  [ 'ctrl+up', actions.moveUp ],
  [ 'ctrl+down', actions.moveDown ],
  [ ['ctrl+left', 'shift+tab'], actions.unindent ],
  [ ['ctrl+right', 'tab'], actions.indent ],
  [ 'del', actions.remove ],
  [ 'e e', actions.editTask ],
  [ 'space', actions.toggleCompleteTask ],
  [ 'shift+space', actions.invalidateTask ],
]

const keymapGlobal = [
  [ 'enter', actions.enterKey ],
  [ 'esc', actions.escapeKey ],
]

const bindCallback = (callback) => () => {
  store.dispatch(callback())

  // prevent defaults and bubbling for all events
  return false
}

for (let binding of keymap) {
  combokeys.bind(binding[0], bindCallback(binding[1]))
}

for (let binding of keymapGlobal) {
  combokeys.bindGlobal(binding[0], bindCallback(binding[1]))
}
