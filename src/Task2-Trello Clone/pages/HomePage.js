import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import {
  IoPersonOutline,
  IoPeopleSharp,
  IoSettingsSharp
} from 'react-icons/io5'
import { DiTrello } from 'react-icons/di'
import { BiHomeSmile, BiTable } from 'react-icons/bi'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { FiCheckSquare } from 'react-icons/fi'

import { BsHeart } from 'react-icons/bs'
import PropTypes from 'prop-types'

function HomePage({ currentSearch }) {
  const [homePageData, setHomePageData] = useState([])
  const [newBoardName, setBoardName] = useState('')
  const [loading, setLoadingState] = useState(true)
  const formStyling = useRef(null)
  useEffect(() => {
    try {
      const fetch = async () => {
        const getHomePageData = await axios.get(
          `https://api.trello.com/1/members/me/boards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
        )
        setLoadingState(false)
        setHomePageData(getHomePageData.data)
      }

      fetch()
    } catch (e) {
      console.error(e)
    }
  }, [])
  const openForm = () => {
    if (formStyling.current.style.display === 'block') {
      formStyling.current.style.display = 'none'
    } else {
      formStyling.current.style.display = 'block'
    }
  }
  const createNewBoard = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `https://api.trello.com/1/boards/?key=${process.env.REACT_APP_KEY}&token=${process.env.TOKEN}&name=${newBoardName}`
      )
      const updatedBoards = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      )
      setBoardName('')
      setHomePageData(updatedBoards.data)
      openForm()
    } catch (e) {
      console.error(e)
    }
  }
  const handleBoardName = (e) => {
    setBoardName(e.target.value)
  }
  if (loading) {
    return (
      <div className="loading">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
  return (
    <div className="home-page-content">
      <div className="home-page" data-testid="homePage">
        <div className="sideBar">
          <div className="sidebar-div active">
            <DiTrello />
            <h1>Board</h1>
          </div>
          <div className="sidebar-div">
            <DiTrello />
            <h1>Templates</h1>
          </div>
          <div className="sidebar-div">
            <BiHomeSmile />
            <h1>Home</h1>
          </div>
          <div className="sidebar-drop-down">
            <div className="header">
              <h1>Teams</h1>
              <h1>+</h1>
            </div>
            <div className="drop-down">
              <div className="drop-down-header">
                <IoPeopleSharp />
                <h1>{`Atul Rana's WorkSpace`}</h1>
              </div>

              <RiArrowDropDownLine />
            </div>
            <div className="drop-down-items">
              <div className="drop-down-item">
                <FiCheckSquare />
                <h1>{`Getting Started`}</h1>
              </div>
            </div>
            <div className="drop-down-items">
              <div className="drop-down-item">
                <DiTrello />
                <h1>{`Board`}</h1>
              </div>
            </div>
            <div className="drop-down-items">
              <div className="drop-down-item">
                <BsHeart />
                <h1>{`Highlights`}</h1>
              </div>
            </div>
            <div className="drop-down-items">
              <div className="drop-down-item">
                <BiTable />
                <h1>{`Team Table`}</h1>
              </div>
            </div>
            <div className="drop-down-items">
              <div className="drop-down-item">
                <IoPeopleSharp />
                <h1>{`Members`}</h1>
              </div>
            </div>
            <div className="drop-down-items">
              <div className="drop-down-item">
                <IoSettingsSharp />
                <h1>{`Settings`}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="home-page-block">
          <div className="home-page-title" data-testid="homePageTitle">
            <IoPersonOutline />
            <h1>Personal Boards</h1>
          </div>

          <div className="home-page-container">
            {homePageData
              .filter((ele) =>
                ele.name.toLowerCase().includes(currentSearch.toLowerCase())
              )
              .map((ele) => {
                return (
                  <Card
                    value={ele}
                    key={ele.id}
                    boardState={homePageData}
                    setHomePageData={setHomePageData}
                  ></Card>
                )
              })}
            <div className="add-button-wrapper">
              <div className="add-new-board">
                <div
                  className="add-board-card"
                  onClick={openForm}
                  data-testid="addNewBoard"
                >
                  <h1>Create New Board</h1>
                </div>
                <form
                  className="add-board-form"
                  ref={formStyling}
                  onSubmit={createNewBoard}
                >
                  <textarea
                    type="text"
                    placeholder="BoardName"
                    data-testid="inputForAddingBoard"
                    onChange={handleBoardName}
                  ></textarea>
                  <input
                    type="submit"
                    value="Create New Board"
                    data-testid="addBoardButton"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
HomePage.propTypes = {
  currentSearch: PropTypes.string
}
export default HomePage
