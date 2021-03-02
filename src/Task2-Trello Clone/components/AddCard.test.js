import React from 'react'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import AddCard from './AddCard'
import axios from 'axios'

jest.setTimeout(25000)
jest.mock('axios')

beforeEach(() => {
  render(
    <MemoryRouter>
      <AddCard
        boardId="6034a4de498fab142337023c"
        listId="1"
        getCardsForList={() => {}}
      />
    </MemoryRouter>
  )
})

describe('<AddCard/>', () => {
  it('should check if new card is created', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new'
      }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddCardForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewCardName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: 'new' } })

    const createNewListSubmitButton = screen.getByTestId(
      'createNewCardSubmitButton'
    )

    expect(createNewListSubmitButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(createNewListSubmitButton)
    })
  })
  it('should check if new card not created when empty string is passed', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new'
      }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddCardForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewCardName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: '' } })

    const createNewListSubmitButton = screen.getByTestId(
      'createNewCardSubmitButton'
    )

    expect(createNewListSubmitButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(createNewListSubmitButton)
    })
  })
})
