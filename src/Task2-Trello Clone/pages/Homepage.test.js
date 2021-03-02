/* istanbul ignore file */
import React from 'react'
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import HomePage from './HomePage'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
jest.setTimeout(25000)
jest.mock('axios')

beforeEach(async () => {
  await act(async () => {
    const boardData = {
      data: [
        {
          id: '1',
          name: 'BoardName 1',
          prefs: {
            backgroundImage: 'url'
          }
        }
      ]
    }
    axios.get.mockImplementation(async (url) => {
      return boardData
    })
    axios.put.mockImplementation(() => {})
    axios.delete.mockImplementation(() => {})
  })
  await act(async () => {
    render(
      <MemoryRouter>
        <HomePage currentSearch="" />
      </MemoryRouter>
    )
  })
})

describe('<HomePage/>', () => {
  it('should show HomePage title after api calls are made', async () => {
    const title = await waitFor(() => screen.getByTestId('homePageTitle'), {
      timeout: 3000
    })

    expect(title).toBeInTheDocument()
  })
  it('should check if input field is displayed when the clicked on board Name', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()

    fireEvent.click(addNewBoard)

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')

    expect(inputForAddingBoard).toBeInTheDocument()
  })
  it('should check if input field is closed when clicked again', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()

    fireEvent.click(addNewBoard)

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()

    fireEvent.click(addNewBoard)

    expect(screen.queryByText('BoardName')).toBe(null)
  })
  it('should check if New Board is created and deleted', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addNewBoard)
    })

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(inputForAddingBoard, {
        target: { value: 'createNewBoard' }
      })
    })

    const addBoardButton = await waitFor(
      () => screen.getByTestId('addBoardButton'),
      {
        timeout: 3000
      }
    )
    await act(async () => {
      fireEvent.click(addBoardButton)
    })

    const deleteButton = await waitFor(() => screen.getByTestId('deleteCard'), {
      timeout: 3000
    })
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton)

    const spy = jest.spyOn(axios, 'delete')
    expect(spy).toHaveBeenCalled()
  })
})
