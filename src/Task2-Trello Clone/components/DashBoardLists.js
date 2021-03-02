import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { MdArchive } from 'react-icons/md'

function DashBoardLists({ list, getBoardsLists }) {
  const [currentListName, setCurrentListName] = useState(list.name)

  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const listChangeHandler = (e) => {
    setCurrentListName(e.target.value)
  }
  const updateListName = async (e, listId) => {
    e.preventDefault()
    try {
      setLoadingUpdate(true)
      await axios.put(
        `https://api.trello.com/1/lists/${listId}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${currentListName}`
      )
      const getLists = await axios.get(
        `https://api.trello.com/1/boards/${list.idBoard}/lists?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      )
      getBoardsLists(getLists.data)
      setLoadingUpdate(false)
    } catch (e) {
      console.error(e)
    }
  }
  const archiveList = async (listId) => {
    try {
      await axios.put(
        `https://api.trello.com/1/lists/${listId}/closed?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&value=true`
      )
      const getLists = await axios.get(
        `https://api.trello.com/1/boards/${list.idBoard}/lists?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      )
      getBoardsLists(getLists.data)
    } catch (e) {
      console.error(e)
    }
  }
  const inputField = loadingUpdate ? (
    <div className="update-card-loading">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <input
      type="text"
      value={currentListName}
      data-testid="listNameInputField"
      onChange={(e) => {
        listChangeHandler(e)
      }}
    />
  )
  return (
    <div className="list-name-container">
      <div className="board-list-name" data-testid="openListForm">
        <form
          onSubmit={(e) => {
            updateListName(e, list.id)
          }}
        >
          {inputField}
          <input
            type="submit"
            value="update"
            data-testid="updateListSubmitButton"
          />
        </form>
      </div>
      <div className="archive-list-button">
        <MdArchive
          title="Archive List"
          onClick={() => archiveList(list.id)}
          data-testid="archiveListButton"
        />
      </div>
    </div>
  )
}
DashBoardLists.propTypes = {
  list: PropTypes.object,
  getBoardsLists: PropTypes.func
}
export default DashBoardLists
