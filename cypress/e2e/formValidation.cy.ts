describe('Validação de Formulário e Responsividade', () => {
    it('deve validar campos obrigatórios e exibir mensagens de erro', () => {
        // Visitar a página de simulação de aposentadoria
        cy.visit('/simulador-aposentadoria');

        // Tentar submeter o formulário vazio
        cy.get('button[type="submit"]').click();

        // Verificar se as mensagens de erro são exibidas
        cy.get('[data-testid="error-message"]').should('be.visible');
        cy.contains('Campo obrigatório').should('be.visible');

        // Preencher apenas alguns campos
        cy.get('[name="currentAge"]').type('30');
        cy.get('[name="retirementAge"]').type('60');

        // Submeter novamente
        cy.get('button[type="submit"]').click();

        // Verificar se ainda há mensagens de erro para os campos não preenchidos
        cy.contains('Campo obrigatório').should('be.visible');

        // Preencher todos os campos
        cy.get('[name="monthlyIncome"]').type('5000');
        cy.get('[name="currentInvestment"]').type('10000');
        cy.get('[name="retirementGoal"]').type('1000000');
        cy.get('[name="investPercent"]').type('20');
        cy.get('[name="annualReturn"]').type('8');
        cy.get('[name="monthlyExpense"]').type('3000');

        // Submeter o formulário completo
        cy.get('button[type="submit"]').click();

        // Verificar se não há mais mensagens de erro
        cy.contains('Campo obrigatório').should('not.exist');

        // Testar responsividade em diferentes tamanhos de tela
        cy.viewport('iphone-x');
        cy.get('[data-testid="result-card"]').should('be.visible');

        cy.viewport('ipad-2');
        cy.get('[data-testid="result-card"]').should('be.visible');

        cy.viewport(1920, 1080);
        cy.get('[data-testid="result-card"]').should('be.visible');
    });
});
