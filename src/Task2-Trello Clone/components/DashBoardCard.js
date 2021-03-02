import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

import PropTypes from 'prop-types'
import '../task2.css'

function DashBoardCard({ card, getCardsForList, boardId }) {
  const [currentCardName, updateCurrentCard] = useState(card.name)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [cardState, setCardState] = useState(true)

  const deleteCard = async (cardId) => {
    try {
      setLoadingUpdate(true)
      await axios.delete(
        `https://api.trello.com/1/cards/${cardId}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      )
      const getCards = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      )
      getCardsForList(getCards.data)
      setLoadingUpdate(false)
    } catch (e) {
      console.error(e)
    }
  }
  const updateCard = async (e, cardId) => {
    e.preventDefault()
    try {
      setLoadingUpdate(true)
      await axios.put(
        `https://api.trello.com/1/cards/${cardId}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${currentCardName}`
      )

      const getCards = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      )
      setLoadingUpdate(false)
      setCardState(true)
      getCardsForList(getCards.data)
    } catch (e) {
      console.error(e)
    }
  }
  const handleKeyDown = (e, cardId) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      updateCard(e, cardId)
    }
  }

  const handleCardChange = (e) => {
    updateCurrentCard(e.target.value)
  }
  const cardData = cardState ? (
    <h1 className="card-name">{currentCardName}</h1>
  ) : (
    <form
      key={card.id}
      className="update-card-form"
      data-testid="updateForm"
      onSubmit={(e) => updateCard(e, card.id)}
    >
      <input
        className="current-card-title"
        data-testid="updateCardInputField"
        value={currentCardName}
        onKeyDown={(e) => handleKeyDown(e, card.id)}
        onChange={(e) => handleCardChange(e)}
      ></input>

      <input
        type="submit"
        value="update"
        className="update-card-button"
        data-testid="updateCardSubmitButton"
      />
    </form>
  )
  return (
    <div>
      <div className="cards" key={card.id}>
        <div className="update-card" key={card.id}>
          <div
            data-testid="makeCardEditable"
            onClick={() => {
              setCardState(false)
            }}
          >
            {loadingUpdate ? (
              <div className="update-card-loading">
                <div className="lds-facebook">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              cardData
            )}
          </div>
        </div>
        <div className="card-icons">
          <MdDelete
            onClick={() => deleteCard(card.id)}
            data-testid="deleteIcon"
          />
        </div>
      </div>
    </div>
  )
}
DashBoardCard.propTypes = {
  card: PropTypes.object,
  getCardsForList: PropTypes.func,
  boardId: PropTypes.string
}

export default DashBoardCard
