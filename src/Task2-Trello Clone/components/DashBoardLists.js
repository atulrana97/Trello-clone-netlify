import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import config from '../config/config'
import { MdArchive } from 'react-icons/md'

function DashBoardLists({ list, getBoardsLists }) {
  const [currentListName, setCurrentListName] = useState(list.name)

  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const listChangeHandler = (e) => {
    setCurrentListName(e.target.value)
  }
  const updateListName = async (e, listId) => {
    e.preventDefault()
    setLoadingUpdate(true)
    await axios.put(
      `https://api.trello.com/1/lists/${listId}?key=${config.key}&token=${config.token}&name=${currentListName}`
    )
    const getLists = await axios.get(
      `https://api.trello.com/1/boards/${list.idBoard}/lists?key=${config.key}&token=${config.token}`
    )
    getBoardsLists(getLists.data)
    setLoadingUpdate(false)
  }
  const archiveList = async (listId) => {
    await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${config.key}&token=${config.token}&value=true`
    )
    const getLists = await axios.get(
      `https://api.trello.com/1/boards/${list.idBoard}/lists?key=${config.key}&token=${config.token}`
    )
    getBoardsLists(getLists.data)
  }
  const inputField = loadingUpdate ? (
    <div className="update-card-loading">
      <img src="/loading.gif" />
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
