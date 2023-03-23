import React from 'react'
import { TaskStatuses } from './TaskStatuses'

describe('<TaskStatuses />', () => {

  beforeEach(() => {
    // load users
    cy.fixture('caretaker_user').then(function(caretaker){
      this.caretaker = caretaker
    })
    cy.fixture('manager_user').then(function (manager) {
      this.manager = manager
    })
    cy.fixture('cashier_user').then(function (cashier) {
      this.cashier = cashier
    })

    // load tasks
    cy.fixture('task_list').then(function (tasks) {
      this.tasks = tasks
    })

  })

  it('renders', function(){
    cy.mount(<TaskStatuses page_idx={1} task={this.tasks[0]} user={this.caretaker} />)
  
  

  })
})
