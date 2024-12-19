Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('input#firstName').type('Ygor')
      .get('input#lastName').type('Simoura')
      .get('input#email').type('ygorsimoura@gmail.com')
      .get('textarea#open-text-area').type('teste', { delay: 0})
    cy.contains('button', 'Enviar').click()
})