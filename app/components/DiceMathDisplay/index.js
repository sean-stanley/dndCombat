/**
*
* DiceMathDisplay
*
*/

import React from 'react';
import { round } from 'lodash';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


function DiceMathDisplay({ diceString, diceMath }) {
  return (
    <div>
      <p>
        Maximum: {diceMath.maximum}<br />
        Minimum: {diceMath.minimum}<br />
        Average: {diceMath.getAverage()}<br />
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Result</th>
            <th>No. of Occurences</th>
            <th>Probability of greater or equal</th>
            <th>Probability of lesser or equal</th>
          </tr>
        </thead>
        <tbody>
          {diceMath.getUniqueResults().map((value) => (
            <tr key={value}>
              <td>{value}</td>
              <td>{diceMath.getResultCounts()[value]} / {diceMath.resultCount}</td>
              <td>{round(diceMath.getProbabilityGreatherThan(value) * 100, 3)}%</td>
              <td>{round(diceMath.getProbabilityLessThan(value) * 100, 3)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DiceMathDisplay.propTypes = {
  diceString: React.PropTypes.string,
  diceMath: React.PropTypes.object.isRequired,
};

DiceMathDisplay.defaultProps = {
  diceString: '',
};

export default DiceMathDisplay;
