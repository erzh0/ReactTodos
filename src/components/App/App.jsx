/* eslint-disable indent */
import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './App.css'

export default class App extends Component {
  maxId = 100
  state = {
    taskList: [this.createTask('Completed task'), this.createTask('Editing task'), this.createTask('Active task')],
    filter: 'all',
  }

  filter(list, filter) {
    switch (filter) {
      case 'all':
        return list
      case 'active':
        return list.filter((el) => !el.completed)
      case 'completed':
        return list.filter((el) => el.completed)
      default:
        return list
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    const newArr = this.state.taskList.filter((el) => !el.completed)
    this.setState({
      taskList: newArr,
    })
  }

  createTask(label) {
    return {
      label,
      id: this.maxId++,
      timeNow: Date.now(),
      completed: false,
      edit: false,
    }
  }

  addTask = (label) => {
    const newArr = [...this.state.taskList, this.createTask(label)]
    this.setState({
      taskList: newArr,
    })
  }

  taskEdit = (id) => {
    const indx = this.state.taskList.findIndex((el) => el.id === id)
    let edit = this.state.taskList[indx].edit

    const newArr = this.state.taskList.map((task, i) => {
      const newTask = { ...task }
      if (i === indx) {
        newTask.edit = !edit
      }
      return newTask
    })
    this.setState({
      taskList: newArr,
    })
  }

  taskStatus = (id) => {
    const indx = this.state.taskList.findIndex((el) => el.id === id)
    let completed = this.state.taskList[indx].completed

    const newArr = this.state.taskList.map((task, i) => {
      const newTask = { ...task }
      if (i === indx) {
        newTask.completed = !completed
      }
      return newTask
    })
    this.setState({
      taskList: newArr,
    })
  }

  deleteTask = (id) => {
    const indx = this.state.taskList.findIndex((el) => el.id === id)
    const newArr = [...this.state.taskList.slice(0, indx), ...this.state.taskList.slice(indx + 1)]
    this.setState({
      taskList: newArr,
    })
  }

  render() {
    const { taskList, filter } = this.state

    const numLeft = taskList.length - taskList.filter((el) => el.completed).length

    const visibleItems = this.filter(taskList, filter)

    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <NewTaskForm onAdded={(label) => this.addTask(label)} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onEdit={(id) => this.taskEdit(id)}
            onCompleted={(id) => this.taskStatus(id)}
            onDeleted={(id) => this.deleteTask(id)}
          />
          <Footer
            numLeft={numLeft}
            clearCompleted={() => this.clearCompleted()}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    )
  }
}
