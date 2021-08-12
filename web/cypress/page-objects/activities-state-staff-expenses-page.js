/* eslint class-methods-use-this: "off" */

// Extract just the numbers from an input string and decimals
const extractNumber = (str) => {
  return parseFloat(str.replace(/[^0-9.]/g, ''));
};

class ActivitiesStateStaffExpensesPage {
  addStaff = () => {
    cy.findByRole('button', { name: /^Add State Staff$/i }).click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  }

  deleteStaff = (index) => {
    cy.findByRole('heading', { name: /^State Staff$/i })
      .next().next()
      .findAllByRole('button', { name: /^Delete/i })
      .eq(index)
      .click();
    // Specifically click on the delete button on the modal
    cy.get('.ds-c-button--danger').click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  }

  // Open the indexth staff edit page, fill info, then click done.
  fillStaff = (staffIndex, title, desc, costs, ftes) => {
    const staffNumber = staffIndex + 1;

    cy.findByRole('heading', { name: /^State Staff$/i })
      .next().next()
      .findAllByRole('button', { name: /^Edit/i })
      .eq(staffIndex)
      .click();
    
    // Lower default typing delays for long titles/descriptions
    cy.get('[name="title"]')
      .type(title, {delay: 1});
    
    cy.get('[name="desc"]')
      .type(desc, {delay: 1});
    
    // There are multiple years to fill in for cost/FTE
    cy.get('[name="cost"]')
      .each(($el, index) => {
        cy.wrap($el).type(costs[index]);
      });

    cy.get('[name="ftes"]')
      .each(($el, index) => {
      cy.wrap($el).type(ftes[index]);
    });

    // Verify that Total = Cost with Benefits * Number of FTEs
    cy.findByRole('heading', {name: `Personnel ${staffNumber}:`})
    .parent()
    .findAllByText("Total:")
    .each(($el, index) => {
      cy.wrap($el)
        .next()
        .invoke('text')
          .then(text => {
            cy.log(`Checking that Personnel ${staffNumber}'s total `
            + `expenses = Cost with Benefits * Number of FTEs`);
            const total = extractNumber(text);
            cy.wrap(total)
              .should('eq', costs[index] * ftes[index]);
          });
    });
    
    cy.findByRole('button', { name: /Done/i }).click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  }

  verifyStaff = (staffIndex, title, desc, costs, ftes) => {
    const staffNumber = staffIndex + 1;

    // Get the div containing the staff's information
    cy.findByRole('heading', {name: `${staffNumber}. ${title}`})
      .parent()
      .as('staffDiv');
    
    // Description
    cy.findByRole('heading', {name: `${staffNumber}. ${title}`})
      .next()
      .invoke('text')
      .should('contain', desc);
    
    // Costs
    cy.get('@staffDiv')
      .findAllByText(/Cost:/i)
      .each(($el, index) => {
        cy.wrap($el)
          .next()
          .invoke('text')
            .then(text => {
              const cost = extractNumber(text);
              cy.wrap(cost)
                .should('eq', costs[index]);
            });
      });
    
    // FTEs
    cy.get('@staffDiv')
      .findAllByText(/FTEs:/i)
      .each(($el, index) => {
        cy.wrap($el)
          .parent()
          .invoke('text')
            .then(text => {
              // Get first match for string slice of "FTE: *** |"
              // where "***" is the FTE and "|" is a seperator.
              const slice = text.match(/FTEs: (.*)\|/i)[0];
              cy.log(slice);
              const fte = extractNumber(slice);
              cy.log(fte);
              cy.wrap(fte)
                .should('eq', ftes[index]);
            });
      });
    
    // Total expenses
    cy.get('@staffDiv')
      .findAllByText(/Total:/i)
      .each(($el, index) => {
        cy.wrap($el)
          .next()
          .invoke('text')
            .then(text => {
              const total = extractNumber(text);
              cy.wrap(total)
                .should('eq', costs[index] * ftes[index]);
            });
      });
  }

  addExpense = () => {
    cy.findByRole('button', { name: /^Add State Expense$/i }).click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  }

  deleteExpense = (index) => {
    cy.findByRole('heading', { name: /^Other State Expenses$/i })
      .next().next()
      .findAllByRole('button', { name: /^Delete/i })
      .eq(index)
      .click();
    // Specifically click on the delete button on the modal
    cy.get('.ds-c-button--danger').click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  }

  fillExpense = (expenseIndex, category, costs, desc) => {
    cy.findByRole('heading', { name: /^Other State Expenses$/i })
      .next().next()
      .findAllByRole('button', { name: /^Edit/i })
      .eq(expenseIndex)
      .click();
    
    cy.get('[name="category"]').select(category);

    cy.get('[name="desc"]')
      .type(desc, {delay: 1});

    // There are multiple years to fill in for cost/FTE
    cy.get('[name="cost"]')
      .each(($el, index) => {
        cy.wrap($el).type(costs[index]);
      });

    cy.findByRole('button', { name: /Done/i }).click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  }

  verifyExpense = (expenseIndex, category, costs, desc) => {
    const expenseNumber = expenseIndex + 1;

    // Get the div containing the expense info, also verifies category
    cy.findByRole('heading', {name: `${expenseNumber}. ${category}`})
      .parent()
      .as('expenseDiv');
    
    // Description
    cy.findByRole('heading', {name: `${expenseNumber}. ${category}`})
      .next()
      .invoke('text')
      .should('contain', desc);
    
    // Costs
    cy.get('@expenseDiv')
      .findAllByText(/Cost:/i)
      .each(($el, index) => {
        cy.wrap($el)
          .next()
          .invoke('text')
            .then(text => {
              const cost = extractNumber(text);
              cy.wrap(cost)
                .should('eq', costs[index]);
            });
      });
  }
}

export default ActivitiesStateStaffExpensesPage;