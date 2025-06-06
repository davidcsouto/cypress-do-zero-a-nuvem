Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@teste.com',
    text: 'utilizando valores default'
}) =>{
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('input[value=elogio]').click()
    cy.get('textarea[name=open-text-area]').type(data.text, {delay: 0})
    cy.contains('button', 'Enviar').click()
})