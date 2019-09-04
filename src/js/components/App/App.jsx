import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DriverDetails from 'containers/DriverDetails';
import Map from 'containers/Map';
import PlaybackControls from 'containers/PlaybackControls';
import Welcome from 'containers/Welcome';

const App = ({ initialized = false, loaded = false, onInitialize }) => {
  useEffect(() => onInitialize(), [onInitialize]);

  if (!initialized) return null;

  return (
    <React.Fragment>
      {!loaded && <Welcome />}
      {loaded && <DriverDetails />}
      <Map />
      {loaded && <PlaybackControls />}
    </React.Fragment>
  );
};

App.propTypes = {
  initialized: PropTypes.bool,
  loaded: PropTypes.bool,
  onInitialize: PropTypes.func.isRequired
};

export default App;
