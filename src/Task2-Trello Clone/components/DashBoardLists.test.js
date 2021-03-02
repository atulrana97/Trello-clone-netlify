import React from 'react'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

import axios from 'axios'
import DashBoardLists from './DashBoardLists'

jest.setTimeout(25000)
jest.mock('axios')

beforeEach(() => {
  render(
    <MemoryRouter>
      <DashBoardLists
        boardId="1"
        list={{ name: 'atul', id: 1 }}
        getBoardsLists={() => {}}
      />
    </MemoryRouter>
  )
})

describe('<DashBoardList/>', () => {
  it('should check is the list is archived', async () => {
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
    const archiveList = await waitFor(
      () => screen.getByTestId('archiveListButton'),
      {
        timeout: 3000
      }
    )
    expect(archiveList).toBeInTheDocument()
    fireEvent.click(archiveList)
  })
  it('should check is the List Name is updated', async () => {
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
    const openListForm = await waitFor(
      () => screen.getByTestId('openListForm'),
      {
        timeout: 3000
      }
    )
    expect(openListForm).toBeInTheDocument()
    fireEvent.click(openListForm)
    const updateCardName = await waitFor(
      () => screen.getByTestId('listNameInputField'),
      {
        timeout: 3000
      }
    )
    expect(updateCardName).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(updateCardName, { target: { value: 'New Name' } })
    })

    const updateCardSubmitButton = await waitFor(
      () => screen.getAllByTestId('updateListSubmitButton'),
      {
        timeout: 3000
      }
    )
    await act(async () => {
      fireEvent.click(updateCardSubmitButton[0])
    })
  })
})
