import React from 'react';

import {
  renderWithConnection,
  screen,
  waitFor,
  fireEvent
} from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../util/api';
import FederalAdmin from './FederalAdmin';

const fetchMock = new MockAdapter(axios);

const initialState = {
  admin: {
    roleTypes: [
      {
        id: 1,
        name: 'eAPD State Admin'
      },
      {
        id: 2,
        name: 'eAPD Federal Admin'
      }
    ],
    affiliations: []
  },
  auth: {
    user: {
      id: '12345',
      name: 'Tester'
    }
  },
  user: {
    data: {
      state: {
        id: 'fd',
        name: 'Federal'
      },
      activities: [
        'edit-affiliations'
      ]
    }
  }
};

const mockSingleAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 1,
  primaryPhone: '4045555555',
  role: null,
  stateId: 'la',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: 'eAPD State Contractor',
      stateId: 'la',
      status: 'approved',
      id: 1
    }
  ]
};

const mockMultiAffiliation = {
  displayName: 'Bob Barker',
  email: 'bob@barker.com',
  id: 2,
  primaryPhone: '4045555555',
  role: null,
  stateId: 'md',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: 'eAPD State Contractor',
      stateId: 'md',
      status: 'approved',
      id: 2
    },
    {
      role: 'eAPD State Contractor',
      stateId: 'la',
      status: 'approved',
      id: 3
    }
  ]
};

const mockPendingAffiliation = {
  displayName: 'Sir Pending',
  email: 'sir@pending.com',
  id: 4,
  primaryPhone: '4045555555',
  role: null,
  stateId: 'la',
  status: 'pending',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: null,
      stateId: 'la',
      status: 'pending',
      id: 4
    }
  ]
};

describe('<FederalAdmin />', () => {
  describe('with no affiliations', () => {
    beforeEach(() => {
      fetchMock.reset();
      fetchMock.onGet(`/states/fd/affiliations`).reply(200, []);
      renderWithConnection(<FederalAdmin />, {
        initialState
      });
    });

    test('renders no results message', async () => {
      await waitFor(() => {
        expect(
          screen.getAllByText('No users on this tab at this time')
        ).toBeTruthy();
      });
    });

    test('renders correct tabs', async () => {
      await waitFor(() => {
        expect(screen.getByText('Requests')).toBeTruthy();
        expect(screen.getByText('Active')).toBeTruthy();
        expect(screen.getByText('Inactive')).toBeTruthy();
      });
    });
  });

  describe('with a requested affiliation', () => {
    beforeEach(() => {
      fetchMock
        .onGet(`/states/fd/affiliations?status=pending`)
        .reply(200, [mockPendingAffiliation]);
      renderWithConnection(<FederalAdmin  />, {
        initialState
      });
    });  

    it('renders the user in the affiliation table', async () => {
      await waitFor(() => {
        expect(screen.getByText(mockPendingAffiliation.displayName)).toBeTruthy();
      });
    });

    it('shows edit role dialog when clicking approve', async () => {
      await waitFor(() => {
        fireEvent.click(screen.getByText('Approve'));
        expect(screen.getByRole('heading', {name: 'Edit Role'})).toBeTruthy();
      });
    });

    it('shows confirmation dialog when clicking deny', async () => {
      await waitFor(() => {
        fireEvent.click(screen.getByText('Deny'));
        expect(screen.getByRole('heading', {name: 'Deny'})).toBeTruthy();
      });
    });
  });

  describe('with a single active affiliations', () => {
    beforeEach(() => {
      fetchMock
        .onGet(`/states/fd/affiliations?status=active`)
        .reply(200, [mockSingleAffiliation]);
      renderWithConnection(<FederalAdmin  />, {
        initialState
      });
    });

    it('renders the affiliation in the active tab', async () => {
      await waitFor(() => {
        fireEvent.click(screen.getByText('Active'));
        expect(screen.queryAllByText(mockSingleAffiliation.displayName)).toBeTruthy();
      });
    })
    
    it('renders sub affiliation state', async () => {
      await waitFor(() => {
        fireEvent.click(screen.getByText('Active'));
        expect(screen.getAllByText('LA')).toBeTruthy();
      });
    });
  });
  
  describe('with multiple users', () => {
    beforeEach(() => {
      fetchMock
      .onGet(`/states/fd/affiliations?status=active`)
      .reply(200, [mockSingleAffiliation, mockMultiAffiliation]);
      renderWithConnection(<FederalAdmin  />, {
        initialState
      });
    });
    
    it('renders both users', async () => {
      await waitFor(() => {
        fireEvent.click(screen.getByText('Active'));
        expect(screen.queryAllByText(mockSingleAffiliation.displayName)).toBeTruthy();
        expect(screen.queryAllByText(mockMultiAffiliation.displayName)).toBeTruthy();
      });
    });
    
    it('renders sub affiliations state', async () => {
      await waitFor(() => {
        fireEvent.click(screen.getByText('Active'));
        expect(screen.getAllByText('LA')).toHaveLength(2);
      });
    });
  });
});
