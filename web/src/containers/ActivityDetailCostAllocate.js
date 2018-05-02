import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { updateActivity as updateActivityAction } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Input, RichText } from '../components/Inputs';

const ActivityDetailCostAllocate = props => {
  const { activity, updateActivity } = props;
  const { costAllocateDesc, otherFundingDesc } = activity;

  const sync = name => html => {
    updateActivity(activity.id, { [name]: html });
  };

  return (
    <Collapsible title={t('activities.costAllocate.title')}>
      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.costAllocate.label.costAllocateDesc')}
        </div>
        <RichText
          content={costAllocateDesc}
          onSync={sync('costAllocateDesc')}
        />
      </div>
      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.costAllocate.label.otherFundingDesc')}
        </div>
        <RichText
          content={otherFundingDesc}
          onSync={sync('otherFundingDesc')}
        />
      </div>
      <Input
        name="other-funding-amt"
        label={t('activities.costAllocate.label.otherFundingAmt')}
        wrapperClass="mb2 sm-col-4"
        value={activity.otherFundingAmt}
        onChange={e =>
          updateActivity(activity.id, { otherFundingAmt: e.target.value })
        }
      />
    </Collapsible>
  );
};

ActivityDetailCostAllocate.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailCostAllocate
);