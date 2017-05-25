import React from 'react'

class InputField extends React.Component {

  componentDidMount () {
    document.getElementById('textarea').select()
  }

  render () {
    return (
      <textarea
        id='textarea'
        defaultValue={this.props.content}
        onBlur={this.props.confirm}
        rows='1'
      />
    )
  }
}

export default InputField
