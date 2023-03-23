import React from 'react'
import { TaskStatuses } from './TaskStatuses'

describe('<TaskStatuses />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskStatuses />)
  })
})