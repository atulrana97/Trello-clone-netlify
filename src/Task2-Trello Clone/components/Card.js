import React from 'react'
import PropTypes from 'prop-types'
import '../task2.css'
import { AiFillDelete } from 'react-icons/ai'
// import { GrUpdate } from 'react-icons/gr'
import axios from 'axios'
import config from '../config/config'
import { Link } from 'react-router-dom'

function Card({ value, setHomePageData }) {
  const deleteBoardCard = async () => {
    await axios.delete(
      `https://api.trello.com/1/boards/${value.id}?key=${config.key}&token=${config.token}`
    )
    const getBoards = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${config.key}&token=${config.token}`
    )

    setHomePageData(getBoards.data)
  }

  return (
    <div
      className="homepage-card"
      style={{
        backgroundImage: `url(${value.prefs.backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: `${value.prefs.backgroundColor}`
      }}
    >
      <Link
        key={value.id}
        to={`/dashBoard/${value.id}`}
        style={{ textDecoration: 'none', width: '100%' }}
      >
        <div>
          <div>
            <div className="homepage-card-data">
              <h1 data-testid="newBoardName">{value.name}</h1>
            </div>
          </div>
        </div>
      </Link>
      <div className="delete-icon-container">
        <AiFillDelete
          title="Delete Board"
          data-testid="deleteCard"
          className="delete-icon"
          onClick={deleteBoardCard}
        />
      </div>
    </div>
  )
}

Card.propTypes = {
  value: PropTypes.object.isRequired,
  setHomePageData: PropTypes.func.isRequired
}
export default Card
