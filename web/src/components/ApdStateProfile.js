import React from 'react';

import { Section, Subsection } from './Section';
import MedicaidOffice from '../containers/ApdStateProfileMedicaidOffice';
import KeyPersonnel from '../containers/ApdStateKeyPersonnel';
import Waypoint from '../containers/ConnectedWaypoint';
import AlertMissingFFY from './AlertMissingFFY';

const ApdStateProfile = () => (
  <React.Fragment>
    <Waypoint />
    <AlertMissingFFY/>
    <Section resource="apd.stateProfile">
      <Waypoint id="apd-state-profile-office" />
      <Subsection
        id="apd-state-profile-office"
        resource="apd.stateProfile.directorAndAddress"
      >
        <MedicaidOffice />
      </Subsection>

      <Waypoint id="apd-state-profile-key-personnel" />
      <Subsection
        id="apd-state-profile-key-personnel"
        resource="apd.stateProfile.keyPersonnel"
      >
        <KeyPersonnel />
      </Subsection>
    </Section>
  </React.Fragment>
);

export default ApdStateProfile;
