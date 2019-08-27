import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import styled from 'styled-components';

const inputID = 'simulationFileInput';

const StyledButton = styled(Button)`
  margin-bottom: 1.5em;
`;

function WelcomeFileInput({ loadFiles }) {
  return (
    <React.Fragment>
      <Input
        type="file"
        name="file"
        id={inputID}
        multiple={true}
        hidden
        aria-hidden="true"
        tabIndex="-1"
        onInput={() => loadFiles(document.getElementById(inputID).files)}
      />
      <StyledButton onClick={() => document.getElementById(inputID).click()}>Browse</StyledButton>
    </React.Fragment>
  );
}

WelcomeFileInput.propTypes = {
  loadFiles: PropTypes.func.isRequired
};

export default WelcomeFileInput;
