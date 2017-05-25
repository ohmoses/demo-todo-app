import React from 'react'
import './main.scss'

export default () => {
  const desc =
    <div>
      <p>
        This is a demo app to serve as a code sample for employers.
      </p>
      <p>
        I fell in love with <a href='http://www.checkvist.com' target='blank'>Checkvist</a>'s keyboard-centric UI, so instead of a regular bland to-do app, I decided to go with a super simplified knockoff of Checkvist.
      </p>
      <p>
        Check out the code in the <a href='https://github.com/oh-moses/demo-todo-app' target='blank'>Github repo</a>.
      </p>
      <p>
        For now, it uses cookies to store your list. (I'll add features until someone decides to hire me, so if you come back in three months and it's hosted on Heroku and uses MongoDB, that means I <em>really</em> suck at interviews. Ha, ha.)
      </p>
      <p>
        Incidentally, if you're hiring developers in Brno, Vienna, or Bratislava, get in touch through <a href='http://www.linkedin.com/in/mosesskoda' target='blank'>LinkedIn</a> or <a href='mailto:moses.skoda@gmail.com'>e-mail</a>.
      </p>
    </div>

  const shortcuts = [
    ['Enter / Alt+Enter', 'Add a new task above/below'],
    ['Shift+Enter', 'Add a new subtask'],
    ['ee', 'Edit'],
    ['Del', 'Delete'],
    ['Space', 'Complete/reopen task'],
    ['Shift+Space', 'Invalidate task'],
    ['\u2191 / \u2193', 'Select task above/below'],
    ['\u2190 / \u2192', 'Expand/collapse task'],
    ['Ctrl+\u2191 / Ctrl+\u2193', 'Move task up/down'],
    ['Ctrl+\u2192 (Tab)', 'Indent task'],
    ['Ctrl+\u2190 (Shift+Tab)', 'Unindent task'],
  ]

  return (
    <div className='about'>
      <h2>About</h2>
      {desc}

      <h3>Keyboard shortcuts</h3>
      <table>
        <tbody>
          {shortcuts.map(row => (
            <tr key={row[0]}>
              <td className='left'>{row[0]}</td>
              <td className='right'>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
