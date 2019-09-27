import { updateBudget } from './apd';

export const ADD_APD_ITEM = Symbol('add apd item');
export const ADD_APD_YEAR = Symbol('add apd year');
export const EDIT_APD = Symbol('edit apd');
export const REMOVE_APD_ITEM = Symbol('remove apd item');
export const REMOVE_APD_YEAR = Symbol('remove apd year');

export const addKeyPerson = () => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: '/keyPersonnel/-',
    state: getState()
  });
};

export const addYear = year => (dispatch, getState) => {
  dispatch({ type: ADD_APD_YEAR, value: year, state: getState() });
  dispatch(updateBudget());
};

export const removeKeyPerson = (
  index,
  { global = window } = {}
) => dispatch => {
  if (global.confirm('Do you really want to delete this key person?')) {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/keyPersonnel/${index}`
    });
    dispatch(updateBudget());
  }
};

export const removeYear = year => (dispatch, getState) => {
  dispatch({ type: REMOVE_APD_YEAR, value: year, state: getState() });
  dispatch(updateBudget());
};

export const setKeyPersonName = (name, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/name`,
  value: name
});

export const setKeyPersonEmail = (email, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/email`,
  value: email
});

export const setKeyPersonRole = (role, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/position`,
  value: role
});

export const setKeyPersonPercentTime = (percent, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/percentTime`,
  value: percent
});

// needs to trigger budget calculation
export const setKeyPersonHasCosts = (hasCosts, index) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/keyPersonnel/${index}/hasCosts`,
    value: hasCosts
  });
  dispatch(updateBudget());
};

// needs to trigger budget calculation
export const setKeyPersonCost = (cost, index, year) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/keyPersonnel/${index}/costs/${year}`,
    value: cost
  });
  dispatch(updateBudget());
};

export const setMedicaidDirectorEmail = email => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidDirector/email',
  value: email
});

export const setMedicaidDirectorName = name => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidDirector/name',
  value: name
});

export const setMedicaidDirectorPhoneNumber = phone => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidDirector/phone',
  value: phone
});

export const setMedicaidOfficeAddress1 = address => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/address1',
  value: address
});

export const setMedicaidOfficeAddress2 = address => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/address2',
  value: address
});

export const setMedicaidOfficeCity = city => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/city',
  value: city
});

export const setMedicaidOfficeState = state => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/state',
  value: state
});

export const setMedicaidOfficeZip = zip => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/zip',
  value: zip
});

export const setNarrativeForHIE = text => ({
  type: EDIT_APD,
  path: '/narrativeHIE',
  value: text
});

export const setNarrativeForHIT = text => ({
  type: EDIT_APD,
  path: '/narrativeHIT',
  value: text
});

export const setNarrativeForMMIS = text => ({
  type: EDIT_APD,
  path: '/narrativeMMIS',
  value: text
});

export const setProgramOverview = text => ({
  type: EDIT_APD,
  path: '/programOverview',
  value: text
});
