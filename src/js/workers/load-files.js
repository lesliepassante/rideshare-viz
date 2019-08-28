import { lineString, point } from '@turf/helpers';
import length from '@turf/length';
import lineSlice from '@turf/line-slice';
import lineSliceAlong from '@turf/line-slice-along';

if (typeof self !== 'undefined') {
  self.onmessage = async ({ data: { filesToLoad, numFramesToCreate } }) => {
    try {
      const files = await Promise.all(filesToLoad.map(file => loadFile(file)));

      files.forEach((file, i, arr) => {
        const geojson = filterGeojson({ geojson: file.geojson, animated: false });

        const startGeojson = filterGeojson({ geojson: file.geojson, animated: true });
        const endGeojson = arr[i + 1] && filterGeojson({ geojson: arr[i + 1].geojson, animated: true });

        const frames = createFrames({ startGeojson, endGeojson, numFramesToCreate });

        self.postMessage({ frames, geojson, name: file.name });
      });

      self.postMessage({ success: true });
      self.close();
    } catch (err) {
      self.postMessage({ error: err.message });
      self.close();
    }
  };
}

function loadFile(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new Error('Error loading file.'));
    };

    reader.onload = () => {
      try {
        const geojson = JSON.parse(reader.result);
        const name = file.name;
        if (!geojson.features) {
          reject(new Error(`${file.name} is not a valid GeoJSON file.`));
        } else {
          resolve({ geojson, name });
        }
      } catch (err) {
        reject(new Error(`${file.name} is not a valid JSON file.`));
      }
    };

    reader.readAsText(file);
  });
}

function createFrames({ startGeojson, endGeojson, numFramesToCreate = 0 } = {}) {
  const result = [];
  if (!startGeojson) return result;

  result.push({ geojson: startGeojson });
  if (!endGeojson) return result;

  const json = JSON.stringify(startGeojson);
  const frames = [...Array(numFramesToCreate)].map(() => ({ geojson: JSON.parse(json) }));
  const startRoutes = startGeojson.features.filter(feature => feature.geometry.type === 'LineString');
  const endRoutes = endGeojson.features.filter(feature => feature.geometry.type === 'LineString');

  startRoutes.forEach(route => {
    const endRoute = endRoutes.find(endRoute => endRoute.properties.driverId === route.properties.driverId);
    if (!endRoute) return;

    const routeLine = lineString(route.geometry.coordinates);
    const routeLineLength = length(routeLine);
    if (!routeLineLength) return;

    const segmentStartPoint = point(route.geometry.coordinates[0]);
    const segmentEndPoint = point(endRoute.geometry.coordinates[0]);
    const segmentRouteLine = lineSlice(segmentStartPoint, segmentEndPoint, routeLine);
    const segmentRouteLineLength = length(segmentRouteLine);
    if (!segmentRouteLineLength) return;

    frames.forEach((frame, i) => {
      const segmentRouteLineProgress = ((i + 1) / numFramesToCreate) * segmentRouteLineLength;
      if (segmentRouteLineProgress === routeLineLength) return;

      const newRoute = frame.geojson.features.find(
        feature => feature.geometry.type === 'LineString' && feature.properties.driverId === route.properties.driverId
      );
      const newDriver = frame.geojson.features.find(
        feature => feature.properties.type === 'L' && feature.properties.driverId === route.properties.driverId
      );

      try {
        const newRouteLine = lineSliceAlong(routeLine, segmentRouteLineProgress, routeLineLength);
        newRoute.geometry.coordinates = newRouteLine.geometry.coordinates;
        newDriver.geometry.coordinates = newRouteLine.geometry.coordinates[0];
      } catch (err) {
        console.warn(err, JSON.stringify(routeLine));
      }
    });
  });

  return result.concat(frames);
}

function filterGeojson({ geojson = { features: [] }, animated = false } = {}) {
  const filterForAnimated = features => {
    return features.filter(feature => {
      return (
        (feature.geometry.type === 'LineString' && typeof feature.properties.driverId === 'number') ||
        (feature.properties.type === 'L' && feature.properties.active === true)
      );
    });
  };

  const filterForNotAnimated = features => {
    return features.filter(feature => {
      return (
        !(feature.geometry.type === 'LineString' && typeof feature.properties.driverId === 'number') &&
        !(feature.properties.type === 'L' && feature.properties.active === true)
      );
    });
  };

  const filtered = animated ? filterForAnimated(geojson.features) : filterForNotAnimated(geojson.features);

  return { ...geojson, ...{ features: filtered } };
}
