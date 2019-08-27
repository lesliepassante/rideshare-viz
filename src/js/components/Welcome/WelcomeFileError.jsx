import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

function WelcomeFileError({ error }) {
  if (!error) return null;

  return (
    <Alert color="danger">
      <React.Fragment>
        <strong>Error: </strong>
        {error}
      </React.Fragment>
    </Alert>
  );
}

WelcomeFileError.propTypes = {
  error: PropTypes.string.isRequired
};

export default WelcomeFileError;
