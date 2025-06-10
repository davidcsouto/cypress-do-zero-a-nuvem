describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('eq','Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envio o formulário', () => {
    cy.clock()

    cy.get('#firstName').type('David')
    cy.get('#lastName').type('Costa Souto')
    cy.get('#email').type('cypresszeroanuvem@teste.com')
    cy.get('input[value=elogio]').click()
    cy.get('textarea[name=open-text-area]').type('Estou achando o Cypress interessante e a didática da aula está sendo boa até o momento.', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('span.success').should('be.visible')
    cy.get('span.success strong').should('have.text', 'Mensagem enviada com sucesso.')
    
    cy.tick(3000)

    cy.get('span.success').should('not.be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
    cy.clock()

    cy.get('#firstName').type('David')
    cy.get('#lastName').type('Costa Souto')
    cy.get('#email').type('cypresszeroanuvem_teste.com')
    cy.get('input[value=elogio]').click()
    cy.get('textarea[name=open-text-area]').type('Estou achando o Cypress interessante e a didática da aula está sendo boa até o momento.', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('span.error').should('be.visible')
    cy.get('span.error strong').should('have.text', 'Valide os campos obrigatórios!')

    cy.tick(3000)
    cy.get('span.error').should('not.be.visible')
  })
  it('campo de telefone não aceita valores não-numéricos', () =>{
    cy.get('#firstName').type('David')
    cy.get('#lastName').type('Costa Souto')
    cy.get('#email').type('cypresszeroanuvem@teste.com')
    cy.get('#phone').type('abcdefg')
    cy.get('#phone').should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.clock()

    cy.get('#firstName').type('David')
    cy.get('#lastName').type('Costa Souto')
    cy.get('#email').type('cypresszeroanuvem@teste.com')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('span.error').should('be.visible')
    cy.get('span.error strong').should('have.text', 'Valide os campos obrigatórios!')

    cy.tick(3000)
    cy.get('span.error').should('not.be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
    cy.get('#firstName').type('David')
    cy.get('#lastName').type('Costa Souto')
    cy.get('#email').type('cypresszeroanuvem@teste.com')
    cy.get('#phone').type('1195673220')
    
    cy.get('#firstName').clear()
    cy.get('#firstName').should('have.value', '')
    cy.get('#lastName').clear()
    cy.get('#lastName').should('have.value', '')
    cy.get('#email').clear()
    cy.get('#phone').clear()
    cy.get('#phone').should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
    cy.clock()

    cy.contains('button', 'Enviar').click()
    cy.get('span.error').should('be.visible')
    cy.get('span.error strong').should('have.text', 'Valide os campos obrigatórios!')

    cy.tick(3000)
    cy.get('span.error').should('not.be.visible')
  })
  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock()

    const data = {
      firstName: 'David',
      lastName: 'Costa Souto',
      email: 'cypresszeroanuvem@teste.com',
      text: 'Estou achando o Cypress interessante e a didática da aula está sendo boa até o momento.'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
    cy.get('span.success strong').should('have.text', 'Mensagem enviada com sucesso.')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })
  it('envia o formuláario com sucesso usando os valores default do comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
    cy.get('span.success strong').should('have.text', 'Mensagem enviada com sucesso.')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })
  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('Seleciona um produto (Mentoria) por seu value', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each($item => {
        cy.wrap($item)
          .check()
          .should('be.checked')
    })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('sampleFile') // command cy.fixture see the fixtures folder so don't need to specific the path to the file
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy')
      .contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.get('#title')
      .should('have.text', 'CAC TAT - Política de Privacidade')
  })
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  it('preenche o campo da área de texto usando o comando invoke', () =>{
    const text = 'Estou achando o Cypress interessante e a didática da aula está sendo boa até o momento.'
    cy.get('#firstName').type('David')
    cy.get('#lastName').type('Costa Souto')
    cy.get('#email').type('cypresszeroanuvem_teste.com')
    cy.get('input[value=elogio]').click()
    cy.get('textarea[name=open-text-area]').invoke('val', text)
      .should('have.value', text)
  })
  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
      cy.get('@getRequest')
        .its('statusText')
        .should('be.equal', 'OK')
      cy.get('@getRequest')
        .its('body')
        .should('include','CAC TAT')
  })
  it.only('desafio: encontrar o gato e torná-lo visivel', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
  })
})