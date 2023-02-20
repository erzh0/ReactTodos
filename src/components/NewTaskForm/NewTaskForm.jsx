import React, { Component } from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.state.label && this.state.label != 0) {
      this.props.onAdded(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          id="input-id"
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <label htmlFor="input-id"></label>
      </form>
    )
  }
}
