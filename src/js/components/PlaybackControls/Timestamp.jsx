import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTimestamp = styled.span`
  white-space: nowrap;
  margin-left: 1rem;
  font-weight: bold;
`;

function Timestamp({ timestamp }) {
  return <StyledTimestamp>{timestamp}</StyledTimestamp>;
}

Timestamp.propTypes = {
  timestamp: PropTypes.string
};

export default Timestamp;
