import React, { Component } from 'react'
import './ToDo.css'

class ToDo extends Component {
  constructor() {
    super()
    this.state = {
      toDoArray: [],
      currentItem: {
        key: '',
        value: ''
      }
    }
    this.listContainer = React.createRef()
  }

  addItems = (e) => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.value !== '') {
      const items = [...this.state.toDoArray, newItem]
      this.setState({
        toDoArray: items,
        currentItem: {
          key: '',
          value: ''
        }
      })
      this.listContainer.current.style.border = 'solid 0.3rem black'
      this.listContainer.current.style.boxShadow =
        '0.125rem 0.125rem rgb(212, 96, 96)'
    }
  }

  handleInputChange = (e) => {
    this.setState({
      currentItem: {
        key: Date.now(),
        value: e.target.value
      }
    })
  }

  deleteItem = (key) => {
    const filteredItems = this.state.toDoArray.filter(
      (item) => item.key !== key
    )
    this.setState({
      toDoArray: filteredItems
    })
    if (this.state.toDoArray.length === 1) {
      this.listContainer.current.style.border = 'solid 0rem black'
      this.listContainer.current.style.boxShadow = '0rem 0rem rgb(212, 96, 96)'
    }
  }

  updateToDoArray = (event, key) => {
    console.log('items:' + this.state.toDoArray)
    const items = this.state.toDoArray
    items.map((item) => {
      item.value = item.key === key ? event.target.value : item.value
      return item
    })
    this.setState({
      toDoArray: items
    })
  }

  render() {
    return (
      <div className="final-container">
        <h1 id="heading" data-testid="toDoTitle">
          To Do (
          <span data-testid="toDoCount">{this.state.toDoArray.length}</span>)
        </h1>
        <form onSubmit={this.addItems} data-testid="formTestId">
          <input
            className="todo-input"
            type="text"
            onChange={this.handleInputChange}
            data-testid="inputTextField"
            value={this.state.currentItem.value}
          ></input>
          <input
            data-testid="submitBtn"
            type="submit"
            value="Add Item"
            name="AddItem"
            className="submit-btn"
          />
        </form>
        <div
          className="todo-container"
          id="toDoContainer"
          ref={this.listContainer}
        >
          <ul className="items-list">
            {this.state.toDoArray.map((ele) => (
              <li className="items" key={ele.key}>
                <p>
                  <input
                    data-testid="addedItem"
                    type="text"
                    id={ele.key}
                    value={ele.value}
                    onChange={(e) => {
                      this.updateToDoArray(e, ele.key)
                    }}
                  ></input>
                </p>
                <button
                  data-testid="deleteBtn"
                  type="button"
                  className="delete-button"
                  onClick={() => {
                    this.deleteItem(ele.key)
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default ToDo
