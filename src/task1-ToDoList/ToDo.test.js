import React from 'react'
import {
  render,
  fireEvent,
  getByTestId,
  getAllByTestId
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import ToDo from './ToDo'

let container = null
beforeEach(() => {
  container = render(<ToDo />).container
})
afterEach(() => {
  container = null
})
describe('Test for ToDo', () => {
  it('renders correctly todo component', () => {
    const tree = renderer.create(<ToDo />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should show title of toDo', () => {
    expect(getByTestId(container, 'toDoTitle')).toBeInTheDocument()
  })
  it('should show form of toDo', () => {
    expect(getByTestId(container, 'formTestId')).toBeInTheDocument()
  })
  it('should check if the add items buttons adds the task', async () => {
    const inputText = getByTestId(container, 'inputTextField')
    fireEvent.change(inputText, { target: { value: 'atul' } })
    const button = getByTestId(container, 'submitBtn')
    fireEvent.click(button)
    const toDoCount = await getByTestId(container, 'toDoCount').textContent
    const addedText = await getByTestId(container, 'addedItem').value
    expect(addedText).toBe('atul')
    expect(toDoCount).toBe('1')
  })
  it('should check if the delete items buttons deletes the task card', async () => {
    const inputText = getByTestId(container, 'inputTextField')
    fireEvent.change(inputText, { target: { value: 'atul' } })
    const button = getByTestId(container, 'submitBtn')
    fireEvent.click(button)
    const deleteButton = await getByTestId(container, 'deleteBtn')
    fireEvent.click(deleteButton)
    const toDoCount = await getByTestId(container, 'toDoCount').textContent
    expect(toDoCount).toBe('0')
  })
  it('should check if the tasks are editable', async () => {
    const cardOne = await getByTestId(container, 'inputTextField')
    fireEvent.change(cardOne, { target: { value: 'rana' } })
    const submitButton = await getByTestId(container, 'submitBtn')
    fireEvent.click(submitButton)
    const cardTwo = await getByTestId(container, 'inputTextField')
    fireEvent.change(cardTwo, { target: { value: 'rana' } })
    fireEvent.click(submitButton)
    const inputText = await getAllByTestId(container, 'addedItem')
    fireEvent.change(inputText[0], {
      target: { value: 'atul' }
    })
    expect(inputText[0].value).toBe('atul')
  })
  it('should check if the empty task is not pushed in toDo List', async () => {
    const addItemTextBox = await getByTestId(container, 'inputTextField')
    fireEvent.change(addItemTextBox, { target: { value: '' } })
    const submitButton = await getByTestId(container, 'submitBtn')
    fireEvent.click(submitButton)
    const toDoCount = await getByTestId(container, 'toDoCount').textContent
    expect(toDoCount).not.toBe('1')
  })
  it('should check if correct task is deleted on deleting the task', async () => {
    const cardOne = await getByTestId(container, 'inputTextField')
    fireEvent.change(cardOne, { target: { value: 'rana' } })
    const submitButton = await getByTestId(container, 'submitBtn')
    fireEvent.click(submitButton)
    const cardTwo = await getByTestId(container, 'inputTextField')
    fireEvent.change(cardTwo, { target: { value: 'Atul' } })
    fireEvent.click(submitButton)
    const deleteButton = await getAllByTestId(container, 'deleteBtn')
    fireEvent.click(deleteButton[1])
    expect(cardTwo.value).not.toBe('Atul')
  })
})
