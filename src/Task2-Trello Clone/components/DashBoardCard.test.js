import React from 'react'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

import axios from 'axios'
import DashBoardCard from '../components/DashBoardCard'

jest.setTimeout(25000)
jest.mock('axios')
beforeEach(() => {
  render(
    <MemoryRouter>
      <DashBoardCard
        boardId="1"
        card={{ name: 'atul', id: 1 }}
        getCardsForList={() => {}}
      />
    </MemoryRouter>
  )
})
describe('<DashBoardCard />', () => {
  it('should check is the card is deleted', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new'
      }
      axios.delete.mockImplementation(() => Promise.resolve(data))
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
    const deleteIcon = await waitFor(() => screen.getByTestId('deleteIcon'), {
      timeout: 3000
    })
    expect(deleteIcon).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(deleteIcon)
    })
  })
  it('should check is the card is updated', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new'
      }
      axios.put.mockImplementation(() => Promise.resolve(data))
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
    const updateCardName = await waitFor(
      () => screen.getByTestId('updateCardInputField'),
      {
        timeout: 3000
      }
    )
    expect(updateCardName).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(updateCardName, { target: { value: 'New Name' } })
    })

    const updateCardSubmitButton = await waitFor(
      () => screen.getByTestId('updateCardSubmitButton'),
      {
        timeout: 3000
      }
    )
    await act(async () => {
      fireEvent.click(updateCardSubmitButton)
    })
  })
})
