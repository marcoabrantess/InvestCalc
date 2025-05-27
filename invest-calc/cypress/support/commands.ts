// Implementação do comando personalizado
Cypress.Commands.add(
    'fillCompoundInterestForm',
    (data: {
        principal: number;
        monthlyContribution: number;
        rate: number;
        period: number;
    }) => {
        cy.get('[name="principal"]').type(data.principal.toString());
        cy.get('[name="monthlyContribution"]').type(
            data.monthlyContribution.toString()
        );
        cy.get('[name="rate"]').type(data.rate.toString());
        cy.get('[name="period"]').type(data.period.toString());
    }
);

// Exportação vazia para garantir que este arquivo seja tratado como um módulo ES
export {};
