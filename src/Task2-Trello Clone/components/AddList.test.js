import React from 'react'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddList from './AddList'
import axios from 'axios'

jest.setTimeout(25000)
jest.mock('axios')

beforeEach(() => {
  render(
    <MemoryRouter>
      <AddList boardId="6034a4de498fab142337023c" getBoardsLists={() => {}} />
    </MemoryRouter>
  )
})
describe('<AddList/>', () => {
  it('should check if new list is created', async () => {
    act(() => {
      const data = { id: '1', idBoard: '6034a4de498fab142337023c', name: 'new' }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const listData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(listData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddListForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewListName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: 'new' } })

    const createNewListSubmitButton = screen.getByTestId(
      'createNewListSubmitButton'
    )

    expect(createNewListSubmitButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(createNewListSubmitButton)
    })
  })
  it('should check that addList form is closed when clicked again', async () => {
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddListForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    act(() => {
      fireEvent.click(addListContainer)
    })
  })
})
