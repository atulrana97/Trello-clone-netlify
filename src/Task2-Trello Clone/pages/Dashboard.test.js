import React from 'react'
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import axios from 'axios'

jest.setTimeout(25000)
jest.mock('axios')

describe('<Dashboard/>', () => {
  beforeEach(async () => {
    await act(async () => {
      const boardData = {
        data: {
          id: '1',
          name: 'BoardName 1',
          prefs: {
            backgroundImage: 'url'
          }
        }
      }
      const cardsData = {
        data: [
          {
            id: '1',
            idBoard: '12',
            idList: '123',
            name: 'task0'
          }
        ]
      }
      const listData = {
        data: [
          {
            id: '123',
            idBoard: '123',
            name: 'task0'
          }
        ]
      }
      axios.get.mockImplementation(async (url) => {
        if (
          url.includes('https://api.trello.com/1/boards') &&
          url.includes('cards')
        ) {
          return cardsData
        } else if (
          url.includes('https://api.trello.com/1/board') &&
          url.includes('lists')
        ) {
          return listData
        } else if (url.includes('https://api.trello.com/1/board')) {
          return boardData
        }
      })
      axios.put.mockImplementation(() => {})
    })
    await act(async () => {
      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      )
    })
  })
  it('should check if input field is closed when the clicked on close icon', async () => {
    const openBoardForm = await waitFor(
      () => screen.getByTestId('openBoardNameUpdateForm'),
      {
        timeout: 3000
      }
    )
    expect(openBoardForm).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(openBoardForm)
    })

    const closeBoardForm = await waitFor(() => screen.getByTestId('cancel'), {
      timeout: 3000
    })
    expect(closeBoardForm).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(closeBoardForm)
    })
  })
  it('should check is the board name is updated successfully', async () => {
    const updateBoardName = await waitFor(
      () => screen.getByTestId('openBoardNameUpdateForm'),
      {
        timeout: 3000
      }
    )
    expect(updateBoardName).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(updateBoardName)
    })

    const updateBoardInputField = await waitFor(
      () => screen.getByTestId('updateFormInputField'),
      {
        timeout: 3000
      }
    )

    expect(updateBoardInputField).toBeInTheDocument()

    await act(async () => {
      fireEvent.change(updateBoardInputField, {
        target: { value: 'NewName' }
      })
    })

    const updateBoardSubmitButton = await waitFor(
      () => screen.getByTestId('updateFormSubmitButton'),
      {
        timeout: 3000
      }
    )
    await act(async () => {
      fireEvent.click(updateBoardSubmitButton)
    })
    const spy = jest.spyOn(axios, 'put')
    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
})

describe('<DashBoard />', () => {
  beforeEach(async () => {
    await act(async () => {
      const boardData = {
        data: {
          id: '1',
          name: 'BoardName 2',
          prefs: {
            backgroundImage: null
          }
        }
      }
      const cardsData = {
        data: [
          {
            id: '1',
            idBoard: '12',
            idList: '123',
            name: 'task0'
          }
        ]
      }
      const listData = {
        data: [
          {
            id: '1',
            idBoard: '123',
            name: 'task0'
          }
        ]
      }
      axios.get.mockImplementation(async (url) => {
        if (
          url.includes('https://api.trello.com/1/boards') &&
          url.includes('cards')
        ) {
          return cardsData
        } else if (
          url.includes('https://api.trello.com/1/board') &&
          url.includes('lists')
        ) {
          return listData
        } else if (url.includes('https://api.trello.com/1/board')) {
          return boardData
        }
      })
      axios.put.mockImplementation(() => {})
    })
    await act(async () => {
      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      )
    })
  })
  it('should check if input field is displayed when the clicked on add List', async () => {
    const pageBackground = await waitFor(
      () => screen.findByTestId('pageBackground'),
      {
        timeout: 3000
      }
    )
    expect(pageBackground).toBeInTheDocument()
  })
})
