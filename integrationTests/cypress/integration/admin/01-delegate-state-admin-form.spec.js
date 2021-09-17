/// <reference types="cypress" />

// Tests filling out state admin delegation form

const thisFFY = (() => {
  const year = new Date().getFullYear();

  // Federal fiscal year starts October 1,
  // but Javascript months start with 0 for
  // some reason, so October is month 9.
  if (new Date().getMonth() > 8) {
    return year + 1;
  }
  return year;
})();

Cypress.Commands.add('dropFile', {prevSubject: true}, (subject, fileName, fileType) => {
  return cy.fixture(fileName, 'binary').then((data) => {
    console.log("data", data);
    return Cypress.Blob.binaryStringToBlob(data, fileType).then(blob => {
      const file = new File([blob], fileName, {type: fileType});
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      cy.wrap(subject)
        .trigger("dragenter", {force: true})
        .trigger("drop", {dataTransfer})
    })
  })
})

export const twoYears = [thisFFY, thisFFY + 1].map(y => `${y}`);

describe('filling out state admin delegation form', function () {
  let delegateStateAdminFormUrl;

  const getInputByLabel = (label) => {
    return cy
      .contains('label', label)
      .invoke('attr', 'for')
      .then((id) => {
        cy.get('#' + id)
      })
  };
  
  before(function () {
    cy.useFedAdmin();

    cy.findByRole('button', { name: /Add state admin letter/i }).click();
    cy.wait(1000);
    cy.location('pathname').then(pathname => (delegateStateAdminFormUrl = pathname));
  });

  beforeEach(function () {
    cy.useFedAdmin(delegateStateAdminFormUrl);
  });

  it('tests default values', function () {
    cy.url().should('include', '/delegate-state-admin');
    
    cy.get('legend').contains('Period of Delegated Authority');
    
    cy.get('input[type=radio]').should('have.length', 2);
    
    twoYears.map(year => {
      getInputByLabel(year).should('have.value', year);
      getInputByLabel(year).should('not.be.checked');
    })
    
    getInputByLabel('Name of State employee to be delegated as eAPD State Adminstrator').should('have.value', '');
    cy.get('select').first().contains('Select an Option');
    getInputByLabel('State employee email address').should('have.value', '');
    getInputByLabel('State employee phone number').should('have.value', '');
    
    // Check the drop target zone is rendered
    cy.get('[id=file-input]').contains('Drag files here');
  });
  
  it('hitting cancel should return user back to federal dashboard', function () {
    cy.contains('Cancel').click();
    cy.contains('Federal Administrator Portal').should('be.visible');
  });  
  
  it('tests filling out and submitting the form', function () {
    // Check that submit button starts disabled
    cy.get('button').contains('Add state admin letter').should('be.disabled');
    
    cy.get('input[type=radio]').first().check({force: true});
    
    cy.fixture('users').then(userData => {
      getInputByLabel('Name of State employee to be delegated as eAPD State Adminstrator').type(userData[0].name);
      cy.get('select').select('Maryland');
      getInputByLabel('State employee email address').type(userData[0].email);
      getInputByLabel('State employee phone number').type(userData[0].phone);
    });
    
    cy.get('[id=file-input]').attachFile('test.pdf', { subjectType: 'drag-n-drop' });    
    cy.wait(1000); // Wait for file to be attached
    
    cy.get('[alt="PDF document icon"]').should('be.visible');
    cy.get('a').contains('test.pdf').should('be.visible');
    
    // When filled out form submit button should be enabled
    cy.get('button').contains('Add state admin letter').should('not.be.disabled');
    
    cy.contains('Add state admin letter').click();
    
    cy.contains('Federal Administrator Portal').should('be.visible');
  });
});