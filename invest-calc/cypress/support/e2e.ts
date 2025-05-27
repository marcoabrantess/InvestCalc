/* eslint-disable @typescript-eslint/no-namespace */
import './commands';

declare global {
    namespace Cypress {
        interface Chainable {
            fillCompoundInterestForm(data: {
                principal: number;
                monthlyContribution: number;
                rate: number;
                period: number;
            }): Chainable<Element>;
        }
    }
}

export {};
