// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verificar o título da aplicacão', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preencher os campos obrigatórios e envia o formulário', function() {
       const longText = 'Lorem ipsum dolor sit amet. Id nostrum placeat in autem iusto et adipisci itaque et assumenda animi in nihil esse est voluptatem nulla? Ab quibusdam perferendis sed aspernatur repudiandae aut eligendi enim sit saepe autem.'
        cy.get('input#firstName').type('Ygor')
          .get('input#lastName').type('Simoura')
          .get('input#email').type('ygorsimoura@gmail.com')
          .get('textarea#open-text-area').type(longText, { delay: 0})
          .get('button.button').click()
          .get('span.success').should('be.visible')
    })
    it('exibe menssagem de erro ao submeter o formulário com um e-mail com formatacão inválida', function(){
        cy.get('input#firstName').type('Ygor')
          .get('input#lastName').type('Simoura')
          .get('input#email').type('ygorsimouragmail.com')
          .get('textarea#open-text-area').type('teste', { delay: 0})
          .get('button.button').click()
          .get('span.error').should('be.visible')
    })
    it('campo de telefone continua vazio quando preechido com valor não numérico', function() {
        cy.get('#phone')
          .type('abcdefg')
          .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input#firstName').type('Ygor')
          .get('input#lastName').type('Simoura')
          .get('input#email').type('ygorsimoura@gmail.com')
          .get('#phone-checkbox').click()
          .get('textarea#open-text-area').type('teste', { delay: 0})
          .get('button.button').click()
          .get('span.error').should('be.visible')

    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('input#firstName').type('Ygor')
          .should('have.value', 'Ygor')
          .clear()
          .should('have.value','')
          .get('input#lastName').type('Simoura')
          .should('have.value', 'Simoura')
          .clear()
          .should('have.value','')
          .get('input#email').type('ygorsimoura@gmail.com')
          .should('have.value', 'ygorsimoura@gmail.com')
          .clear()
          .should('have.value','')
          .get('#phone').type('2799834554')
          .should('have.value', '2799834554')
          .clear()
          .should('have.value','')
   
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]')
          .click()
          .get('span.error').should('be.visible')
    })
    it('envia formulário com sucesso usando um comando costomizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
})