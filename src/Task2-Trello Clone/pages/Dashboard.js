import React, { useState, useEffect } from 'react'
import '../task2.css'
import { useParams } from 'react-router'
import axios from 'axios'
// import { FaCheck } from 'react-icons/fa'
import AddCard from '../components/AddCard'
import AddList from '../components/AddList'
import config from '../config/config'
import DashBoardCard from '../components/DashBoardCard'
import DashBoardLists from '../components/DashBoardLists'

function Dashboard() {
  const { finalId } = useParams()

  const [boardLists, getBoardsLists] = useState([])
  const [boardListCards, getCardsForList] = useState([])
  const [currentBoardName, setCurrentBoardName] = useState('')
  const [currentBackgroundImage, setCurrentImage] = useState({})
  const [loading, setLoading] = useState(true)
  const [checkBoardName, setBoardName] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const getLists = await axios.get(
        `https://api.trello.com/1/boards/${finalId}/lists?key=${config.key}&token=${config.token}`
      )

      const getCards = await axios.get(
        `https://api.trello.com/1/boards/${finalId}/cards?key=${config.key}&token=${config.token}`
      )

      const getCurrentBoardName = await axios.get(
        `https://api.trello.com/1/boards/${finalId}?key=${config.key}&token=${config.token}`
      )

      setLoading(false)
      setCurrentBoardName(getCurrentBoardName.data.name)
      getCardsForList(getCards.data)
      getBoardsLists(getLists.data)
      setCurrentImage(getCurrentBoardName.data.prefs)
    }
    fetchData()
  }, [])

  const handleBoardName = (e) => {
    setCurrentBoardName(e.target.value)
  }
  const updateBoardName = async (e) => {
    e.preventDefault()
    await axios.put(
      `https://api.trello.com/1/boards/${finalId}?key=${config.key}&token=${config.token}&name=${currentBoardName}`
    )
    const getCurrentBoardName = await axios.get(
      `https://api.trello.com/1/boards/${finalId}?key=${config.key}&token=${config.token}`
    )
    setCurrentBoardName(getCurrentBoardName.data.name)
    setBoardName(false)
  }
  const changeBoardState = () => {
    if (checkBoardName === true) {
      setBoardName(false)
    } else {
      setBoardName(true)
    }
  }

  const boardName = checkBoardName ? (
    <div className="update-board-name">
      <form onSubmit={updateBoardName}>
        <input
          type="text"
          value={currentBoardName}
          onChange={handleBoardName}
          data-testid="updateFormInputField"
        ></input>
        <input
          type="submit"
          value="update"
          data-testid="updateFormSubmitButton"
        />
      </form>
      <h1 className="cancel" onClick={changeBoardState} data-testid="cancel">
        X
      </h1>
    </div>
  ) : (
    <div onClick={changeBoardState} data-testid="openBoardNameUpdateForm">
      <h1 data-testid={currentBoardName}>{currentBoardName}</h1>
    </div>
  )
  const backgroundSet = {
    backgroundImage: `url(${currentBackgroundImage.backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: `${currentBackgroundImage.backgroundColor}`
  }

  if (loading) {
    return (
      <div className="loading" data-testid="loading">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
      </div>
    )
  }
  return (
    <div
      className="dash-board-page"
      style={backgroundSet}
      data-testid="pageBackground"
    >
      <div className="current-board">{boardName}</div>
      <div className="dash-board">
        {boardLists.map((ele) => {
          return (
            <div key={ele.id} className="board-list-container">
              <DashBoardLists list={ele} getBoardsLists={getBoardsLists} />
              <div className="list-cards">
                {boardListCards.map((element) => {
                  if (element.idList === ele.id) {
                    return (
                      <DashBoardCard
                        key={element.id}
                        card={element}
                        getCardsForList={getCardsForList}
                        boardId={finalId}
                      />
                    )
                  } else {
                    return <div key={element.id}></div>
                  }
                })}
              </div>
              <div>
                <AddCard
                  key={ele.id}
                  listId={ele.id}
                  boardId={finalId}
                  getCardsForList={getCardsForList}
                />
              </div>
            </div>
          )
        })}
        <AddList boardId={finalId} getBoardsLists={getBoardsLists} />
      </div>
    </div>
  )
}

export default Dashboard
