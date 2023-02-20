import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter'

import './Footer.css'

export default class Footer extends Component {
  static defaultProps = {
    numLeft: 0,
    clearCompleted: () => {},
  }

  static propTypes = {
    numLeft: PropTypes.number,
    clearCompleted: PropTypes.func,
  }

  render() {
    const { numLeft, clearCompleted, filter, onFilterChange } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{numLeft} item left</span>
        <TaskFilter filter={filter} onFilterChange={(name) => onFilterChange(name)} />
        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
