import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Dropdown } from '@cmsgov/design-system';

import AuthenticationForm from '../components/AuthenticationForm';
import { usStatesDropdownOptions } from '../util/states';

const StateAccessRequest = ({
  saveAction,
  cancelAction,
  errorMessage,
  fetching
}) => {
  const [selectedStates, setStates] = useState([
    usStatesDropdownOptions[0].value
  ]);

  const changeStates = ({ target: { value } }) => {
    setStates([value]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    saveAction(selectedStates);
  };

  const handleCancel = e => {
    e.preventDefault();
    if (cancelAction) cancelAction();
  };

  return (
    <div id="start-main-content">
      <AuthenticationForm
        id="state-access-request-form"
        title="Verify Your Identity"
        legend="Verify Your Identity"
        cancelable
        className="ds-u-margin-top--7"
        canSubmit={!!selectedStates}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Submit', 'Submitting']}
        secondaryButtonText="Back to Login"
        onSave={handleSubmit}
        onCancel={handleCancel}
      >
        <div className="ds-u-margin-bottom--4">
          <Dropdown
            label="Select Affiliation"
            labelClassName="ds-u-font-weight--normal"
            id="states"
            name="states"
            options={usStatesDropdownOptions}
            size="medium"
            value={selectedStates[0]}
            onChange={changeStates}
          />
        </div>
      </AuthenticationForm>
    </div>
  );
};

StateAccessRequest.propTypes = {
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  fetching: PropTypes.bool.isRequired,
  saveAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired
};

StateAccessRequest.defaultProps = {
  errorMessage: false
};

export default StateAccessRequest;
