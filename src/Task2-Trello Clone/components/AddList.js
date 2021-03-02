import React, { useState, useRef } from 'react'
import axios from 'axios'
import config from '../config/config'
import PropTypes from 'prop-types'

function AddList({ boardId, getBoardsLists }) {
  const formStyling = useRef(null)
  const [newListName, setListName] = useState('')
  const handleNewList = (e) => {
    setListName(e.target.value)
  }
  const addNewList = async (e) => {
    e.preventDefault()
    await axios.post(
      `https://api.trello.com/1/lists?key=${config.key}&token=${config.token}&name=${newListName}&idBoard=${boardId}`
    )
    const getLists = await axios.get(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${config.key}&token=${config.token}`
    )
    getBoardsLists(getLists.data)
    openForm()
  }
  const openForm = () => {
    if (formStyling.current.style.display === 'flex') {
      formStyling.current.style.display = 'none'
      setListName('')
    } else {
      formStyling.current.style.display = 'flex'
    }
  }
  return (
    <div className="add-button-wrapper">
      <div className="add-new-list">
        <div
          className="add-list"
          data-testid="openAddListForm"
          onClick={openForm}
        >
          <h1> + Add New List</h1>
        </div>
        <form
          className="add-board-form"
          ref={formStyling}
          onSubmit={addNewList}
        >
          <input
            type="text"
            placeholder="List Name"
            data-testid="inputNewListName"
            value={newListName}
            onChange={handleNewList}
          ></input>
          <input
            type="submit"
            value="Add List"
            data-testid="createNewListSubmitButton"
          />
        </form>
      </div>
    </div>
  )
}
AddList.propTypes = {
  boardId: PropTypes.string,
  getBoardsLists: PropTypes.func
}

export default AddList
