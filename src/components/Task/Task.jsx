import React, { Component } from 'react'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static defaultProps = {
    onCompleted: () => {},
    onDeleted: () => {},
    taskProps: { id: '', label: 'Error', timeNow: 0 },
  }

  static propTypes = {
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
    taskProps: PropTypes.object,
  }

  state = {
    label: this.props.taskProps.label,
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.state.label && this.state.label != 0) {
      this.props.taskProps.edit = false
      this.props.taskProps.label = this.state.label
    }
    this.setState({
      label: this.props.taskProps.label,
    })
  }

  render() {
    const { onCompleted, onDeleted, onEdit, taskProps } = this.props
    const { id, label, timeNow, completed, edit } = taskProps

    const lastTime = new Date(timeNow)

    const timeBetween = formatDistanceToNowStrict(
      new Date(
        lastTime.getFullYear(),
        lastTime.getMonth(),
        lastTime.getDate(),
        lastTime.getHours(),
        lastTime.getMinutes(),
        lastTime.getSeconds()
      )
    )
    if (edit) {
      return (
        <form onSubmit={this.onSubmit}>
          <li className="editing">
            <input
              id={id}
              type="text"
              className="edit"
              value={this.state.label}
              autoFocus
              onChange={this.onLabelChange}
            />
            <label htmlFor={id} className="edit-label"></label>
          </li>
        </form>
      )
    }
    return (
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={completed} onChange={() => onCompleted(id)} />
        <label htmlFor={id}>
          <span className="description">{label}</span>
          <span className="created">created {timeBetween} ago</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={() => onEdit(id)}></button>
        <button type="button" className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
      </div>
    )
  }
}
