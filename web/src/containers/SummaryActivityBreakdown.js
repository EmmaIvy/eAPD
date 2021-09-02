import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  selectActivityCostSummary,
  selectActivityByIndex
} from '../reducers/activities.selectors';
import CostAllocationRows from './activity/CostAllocationRows';

const SummaryActivityBreakdownTable = ({
  ffy,
  activityIndex,
  costSummary,
  activityName,
  otherFunding,
  fundingSource
}) => {
  const { years } = costSummary;

  return (
    <table className="budget-table activity-budget-table">
      <thead>
        <tr className="budget-table--row__primary-header">
          <th scope="col">
            Activity {activityIndex + 1}{' '}
            <span style={{ fontWeight: '100' }}>
              {activityName || "Untitled"} {fundingSource ? `(${fundingSource})` : ""}
            </span>
          </th>
          <th scope="col" colSpan="4">
            Personnel Cost × FTE
          </th>
          <th scope="col" className="ds-u-text-align--right">
            Total cost
          </th>
        </tr>
      </thead>
      <tbody>
        <CostAllocationRows
          years={years}
          ffy={ffy}
          otherFunding={otherFunding}
          activityIndex={activityIndex}
        />
      </tbody>
    </table>
  );
};

SummaryActivityBreakdownTable.propTypes = {
  ffy: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  activityName: PropTypes.string.isRequired,
  costSummary: PropTypes.object.isRequired,
  otherFunding: PropTypes.object.isRequired,
  fundingSource: PropTypes.string.isRequired
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getActivity = selectActivityByIndex,
    getCostSummary = selectActivityCostSummary
  } = {}
) => {
  const activity = getActivity(state, { activityIndex });

  return {
    activityName: activity.name,
    fundingSource: activity.fundingSource,
    costSummary: getCostSummary(state, { activityIndex })
  };
};

export default connect(mapStateToProps)(SummaryActivityBreakdownTable);

export { SummaryActivityBreakdownTable as plain, mapStateToProps };
