import Test from './Test'

const user=
{
  "avatar": "avatar_1163de53f17964d8d48f26a309213b9b_RtWYveLFaW.jpg",
  "collectionId": "dlvnttlfiw585jv",
  "collectionName": "staff",
  "created": "2023-03-03 08:22:28.516Z",
  "email": "manager1@staff.com",
  "emailVisibility": true,
  "id": "jxhr750jeidi8q6",
  "name": "manager_1",
  "type": "manager",
  "updated": "2023-03-18 11:42:36.113Z",
  "username": "manager_1",
  "verified": false,
  "expand": {}
} as const

describe('<Test />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Test user={user}/>)
    cy.get('h1').contains('test')
  })
})
