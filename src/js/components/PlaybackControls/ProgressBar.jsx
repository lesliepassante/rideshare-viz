import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import styled from 'styled-components';

const StyledProgress = styled(Progress)`
  width: 100%;

  & .progress-bar {
    transition-property: none;
  }
`;

function ProgressBar({ progress = 0 }) {
  return <StyledProgress value={progress} />;
}

ProgressBar.propTypes = {
  progress: PropTypes.number
};

export default ProgressBar;
