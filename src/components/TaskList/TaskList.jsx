import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const { todos, onCompleted, onDeleted, onEdit } = this.props

    const tasks = todos.map((task) => {
      const { id, completed } = task
      let classNames = ''

      if (completed) {
        classNames += 'completed'
      }

      return (
        <li className={classNames} key={id}>
          <Task
            taskProps={task}
            onEdit={(id) => onEdit(id)}
            onCompleted={(id) => onCompleted(id)}
            onDeleted={(id) => onDeleted(id)}
          />
        </li>
      )
    })

    return <ul className="todo-list">{tasks}</ul>
  }
}
