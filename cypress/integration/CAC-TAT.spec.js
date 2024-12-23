// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000  
  beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verificar o título da aplicacão', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preencher os campos obrigatórios e envia o formulário', function() {
       const longText = 'Lorem ipsum dolor sit amet. Id nostrum placeat in autem iusto et adipisci itaque et assumenda animi in nihil esse est voluptatem nulla? Ab quibusdam perferendis sed aspernatur repudiandae aut eligendi enim sit saepe autem.'
       cy.clock() 
       cy.get('input#firstName').type('Ygor')
          .get('input#lastName').type('Simoura')
          .get('input#email').type('ygorsimoura@gmail.com')
          .get('textarea#open-text-area').type(longText, { delay: 0})
          .get('button.button').click()
          .get('span.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span.success').should('not.be.visible')
    })
    it('exibe menssagem de erro ao submeter o formulário com um e-mail com formatacão inválida', function(){
      cy.clock()  
      cy.get('input#firstName').type('Ygor')
          .get('input#lastName').type('Simoura')
          .get('input#email').type('ygorsimouragmail.com')
          .get('textarea#open-text-area').type('teste', { delay: 0})
        cy.contains('button', 'Enviar').click()
          .get('span.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span.error').should('not.be.visible')
    })
    it('campo de telefone continua vazio quando preechido com valor não numérico', function() {
        cy.get('#phone')
          .type('abcdefg')
          .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.clock()  
      cy.get('input#firstName').type('Ygor')
          .get('input#lastName').type('Simoura')
          .get('input#email').type('ygorsimoura@gmail.com')
          .get('#phone-checkbox').check()
          .get('textarea#open-text-area').type('teste', { delay: 0})
        cy.contains('button', 'Enviar').click()
          .get('span.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span.error').should('not.be.visible')


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
      cy.clock()  
      cy.contains('button', 'Enviar')
          .click()
          .get('span.error').should('be.visible')
      cy.tick(THREE_SECONDS_IN_MS)
      .get('span.error').should('not.be.visible')

    })
    it('envia formulário com sucesso usando um comando costomizado', function(){
      cy.clock()  
      cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('.success').should('not.be.visible')
    })
    it('seleciona um produto (Youtube) por seu texto', function(){
      cy.get('select').select('YouTube')
        .should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product').select('mentoria')
        .should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product').select(1)
        .should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"').check('feedback')
      .should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último',function(){
      cy.get('#email-checkbox').check()
        .should('be.checked')
      cy.get('#phone-checkbox').check()
        .should('be.checked')
      cy.get('input[type="checkbox"]').last().uncheck()
        .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })    
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('#file-upload').selectFile('cypress/fixtures/example.json',{ action: 'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })    
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload').selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('a').should('have.attr','target','_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('a').invoke('removeAttr','target').click()
      cy.url().should('include', '/privacy')
    })
    
})