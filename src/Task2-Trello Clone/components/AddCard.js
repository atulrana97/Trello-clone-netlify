import React, { useState, useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

function AddCard({ listId, boardId, getCardsForList }) {
  const formStyling = useRef(null)
  const [newCardName, setCardName] = useState('')
  const handleNewCard = (e) => {
    setCardName(e.target.value)
  }
  const addNewCard = async (e) => {
    try {
      e.preventDefault()
      if (newCardName !== '') {
        await axios.post(
          `https://api.trello.com/1/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&idList=${listId}&name=${newCardName}`
        )
        const getCards = await axios.get(
          `https://api.trello.com/1/boards/${boardId}/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
        )
        getCardsForList(getCards.data)
        setCardName('')
        openForm()
      }
    } catch (e) {
      console.error(e)
    }
  }
  const openForm = () => {
    if (formStyling.current.style.display === 'flex') {
      formStyling.current.style.display = 'none'
    } else {
      formStyling.current.style.display = 'flex'
    }
  }
  return (
    <div className="add-card-button-wrapper">
      <div className="add-new-card">
        <div
          className="add-card"
          onClick={openForm}
          data-testid="openAddCardForm"
        >
          <h1>+ Add Card</h1>
        </div>
        <div className="add-card-form" ref={formStyling}>
          <form className="form" onSubmit={addNewCard}>
            <textarea
              type="text"
              placeholder="Enter a title for this card..."
              value={newCardName}
              onChange={handleNewCard}
              data-testid="inputNewCardName"
            ></textarea>
            <input
              type="submit"
              value="Add Card"
              data-testid="createNewCardSubmitButton"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
AddCard.propTypes = {
  listId: PropTypes.string,
  boardId: PropTypes.string,
  getCardsForList: PropTypes.func
}

export default AddCard
