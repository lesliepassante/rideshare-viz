import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapLoading from './MapLoading';
import {
  useInitializeMap,
  useUpdateMapFileGeojson,
  useUpdateMapFrameGeojson,
  useUpdateMapSelectedDriver
} from './hooks';

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const MAP_ID = 'mapbox';
const MAP_STYLES = {
  MAP_DEFAULT_CENTER: [-77.03656, 38.897957],
  MAP_DEFAULT_ZOOM: 12,
  COLOR_ASSIGNED: '#ffa500',
  COLOR_UNASSIGNED: '#007bff',
  COLOR_SELECTED: '#343a40'
};

function Map({ buffered, fileGeojson, frameGeojson, loaded, selectedDriverId, selectDriver }) {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hoveredDriverId, setHoveredDriverId] = useState(null);

  useInitializeMap({ setMap, setMapLoaded, setHoveredDriverId, selectDriver, MAP_ID, MAP_STYLES });
  useUpdateMapFileGeojson({ map, mapLoaded, fileGeojson, selectedDriverId, hoveredDriverId });
  useUpdateMapFrameGeojson({ map, mapLoaded, frameGeojson, selectedDriverId, hoveredDriverId });
  useUpdateMapSelectedDriver({ map, mapLoaded, selectedDriverId, hoveredDriverId });

  return (
    <React.Fragment>
      <StyledMap id={MAP_ID} />
      {!buffered && loaded && <MapLoading />}
    </React.Fragment>
  );
}

Map.propTypes = {
  buffered: PropTypes.bool.isRequired,
  fileGeojson: PropTypes.object,
  frameGeojson: PropTypes.object,
  loaded: PropTypes.bool.isRequired,
  selectedDriverId: PropTypes.number,
  selectDriver: PropTypes.func.isRequired
};

export default Map;
