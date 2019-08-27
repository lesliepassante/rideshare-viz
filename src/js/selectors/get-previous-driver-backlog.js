import { createSelector } from 'reselect';
import getPreviousFile from './get-previous-file';

const getCurrentDriverId = state => state.driver.currentId;

const getPreviousDriverBacklog = createSelector(
  [getCurrentDriverId, getPreviousFile],
  (driverId, previousFile) => {
    const features =
      typeof driverId === 'number' && previousFile && previousFile.geojson && previousFile.geojson.features;
    if (!features) return [];

    return features.filter(
      ({ properties }) => properties.driverId === driverId && (properties.type === '+' || properties.type === '-')
    );
  }
);

export default getPreviousDriverBacklog;
