import React from 'react';
import PropTypes from 'prop-types';
import DriverDetails from 'containers/DriverDetails';
import Map from 'containers/Map';
import PlaybackControls from 'containers/PlaybackControls';
import Welcome from 'containers/Welcome';

const App = ({ loaded = false }) => {
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
  loaded: PropTypes.bool
};

export default App;
