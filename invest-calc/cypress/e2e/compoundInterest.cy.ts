describe('Simulação de Juros Compostos', () => {
    it('deve preencher o formulário, calcular e exibir resultados corretamente', () => {
        // Visitar a página inicial
        cy.visit('/');

        // Clicar no card de Juros Compostos
        cy.contains('Juros Compostos').click();

        // Verificar se estamos na página correta
        cy.url().should('include', '/compound-interest');
        cy.get('h2').should('contain', 'Simulador de Juros Compostos');

        // Preencher o formulário
        cy.get('[name="principal"]').type('1000');
        cy.get('[name="monthlyContribution"]').type('100');
        cy.get('[name="rate"]').type('10');
        cy.get('[name="period"]').type('5');

        // Submeter o formulário
        cy.get('button[type="submit"]').click();

        // Verificar se os resultados são exibidos
        cy.get('[data-testid="result-card"]').should('be.visible');
        cy.get('[data-testid="total-value"]').should('be.visible');
        cy.get('[data-testid="total-contributions"]').should('be.visible');
        cy.get('[data-testid="total-interest"]').should('be.visible');

        // Verificar valores específicos (aproximados)
        cy.get('[data-testid="total-value"]').should('contain', '8,194');

        // Testar o botão de voltar
        cy.get('[data-testid="back-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});
