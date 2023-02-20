import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../index.css'
import './TasksFilter.css'

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'all',
    onFilterChange: () => {},
  }

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  }

  buttons = [{ label: 'all' }, { label: 'active' }, { label: 'completed' }]

  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ label }) => {
      const isActive = filter === label
      const clazz = isActive ? 'selected' : ''

      return (
        <li key={label}>
          <button type="button" className={clazz} onClick={() => onFilterChange(label)}>
            {label}
          </button>
        </li>
      )
    })
    return <ul className="filters">{buttons}</ul>
  }
}
