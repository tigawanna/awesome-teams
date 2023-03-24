declare namespace Cypress {
    interface Chainable<Subject> {
        clickLink(label: string): Chainable<Subject>
        login(email: string,password:string): Chainable<Subject>
    }
}
