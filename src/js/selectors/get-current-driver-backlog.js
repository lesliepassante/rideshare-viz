import { createSelector } from 'reselect';
import getCurrentFile from './get-current-file';

const getCurrentDriverId = state => state.driver.currentId;

const getCurrentDriverBacklog = createSelector(
  [getCurrentDriverId, getCurrentFile],
  (driverId, currentFile) => {
    const features = typeof driverId === 'number' && currentFile && currentFile.geojson && currentFile.geojson.features;
    if (!features) return [];

    return features.filter(
      ({ properties }) => properties.driverId === driverId && (properties.type === '+' || properties.type === '-')
    );
  }
);

export default getCurrentDriverBacklog;
