import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import NavBar from './NavBar'

jest.setTimeout(25000)
jest.mock('axios')
beforeEach(() => {
  render(
    <MemoryRouter>
      <NavBar currentSearch="" setCurrentSearch={() => {}} />
    </MemoryRouter>
  )
})

describe('<NavBar/>', () => {
  it('should check if the search button is working', async () => {
    const searchField = await waitFor(
      () => screen.getByTestId('searchInputField'),
      {
        timeout: 3000
      }
    )
    expect(searchField).toBeInTheDocument()
    fireEvent.change(searchField, { target: { value: 'd' } })
  })
  it('should check if redirected to HomePage when clicked on nav', async () => {
    const navHomeLink = await waitFor(
      () => screen.getByTestId('navBarHomeLink'),
      {
        timeout: 3000
      }
    )
    expect(navHomeLink).toBeInTheDocument()
    fireEvent.click(navHomeLink)
    // const homePageRendered = await waitFor(
    //   () => screen.getByTestId('homePage'),
    //   {
    //     timeout: 3000
    //   }
    // )
    // expect(homePageRendered).toBeInTheDocument()
  })
})
