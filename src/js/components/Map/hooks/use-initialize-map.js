import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const geojsonPlaceholder = {
  type: 'FeatureCollection',
  features: []
};

function useInitializeMap({ config, setMap, setMapLoaded, setHoveredDriverId, selectDriver, MAP_ID, MAP_STYLES }) {
  useEffect(() => {
    const { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE } = config;
    const { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM, COLOR_ASSIGNED, COLOR_UNASSIGNED, COLOR_SELECTED } = MAP_STYLES;
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: MAP_ID,
      center: MAP_DEFAULT_CENTER,
      zoom: MAP_DEFAULT_ZOOM,
      style: MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v9'
    });

    const popup = new mapboxgl.Popup({
      closeButton: false
    });

    map.on('load', () => {
      map.addLayer({
        id: 'unassigned-route-lines',
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': COLOR_UNASSIGNED,
          'line-width': 2,
          'line-opacity': 0.4
        },
        source: {
          type: 'geojson',
          data: geojsonPlaceholder
        }
      });

      map.addLayer({
        id: 'unassigned-route-end-points',
        type: 'circle',
        paint: {
          'circle-radius': 3,
          'circle-color': COLOR_UNASSIGNED,
          'circle-opacity': 0.4
        },
        source: {
          type: 'geojson',
          data: geojsonPlaceholder
        },
        filter: ['all', ['!has', 'driverId'], ['==', '$type', 'Point']]
      });

      map.addLayer({
        id: 'assigned-route-end-points',
        type: 'circle',
        paint: {
          'circle-radius': ['match', ['get', 'type'], 'L', 6, 3],
          'circle-color': COLOR_ASSIGNED
        },
        source: {
          type: 'geojson',
          data: geojsonPlaceholder
        },
        filter: ['all', ['!=', 'active', true], ['has', 'driverId'], ['==', '$type', 'Point']]
      });

      map.addLayer({
        id: 'driver-points',
        type: 'circle',
        paint: {
          'circle-radius': 6,
          'circle-color': COLOR_ASSIGNED
        },
        source: {
          type: 'geojson',
          data: geojsonPlaceholder
        },
        filter: ['==', '$type', 'Point']
      });

      map.addLayer({
        id: 'assigned-route-lines',
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': COLOR_ASSIGNED,
          'line-width': 2,
          'line-opacity': 0.5
        },
        source: {
          type: 'geojson',
          data: geojsonPlaceholder
        }
      });

      map.addLayer({
        id: 'selected-route-lines',
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': COLOR_SELECTED,
          'line-width': 4,
          'line-opacity': 1
        },
        source: {
          type: 'geojson',
          data: geojsonPlaceholder
        },
        filter: ['==', 'collectionId', '']
      });

      map.addLayer({
        id: 'selected-route-end-points',
        type: 'circle',
        paint: {
          'circle-radius': ['match', ['get', 'type'], 'L', 8, 5],
          'circle-color': COLOR_SELECTED
        },
        source: {
          type: 'geojson',
          data: geojsonPlaceholder
        },
        filter: ['all', ['==', '$type', 'Point'], ['==', 'collectionId', '']]
      });

      map.addLayer({
        id: 'selected-driver-points',
        type: 'circle',
        paint: {
          'circle-radius': 8,
          'circle-color': COLOR_SELECTED
        },
        source: {
          type: 'geojson',
          data: geojsonPlaceholder
        },
        filter: ['all', ['==', '$type', 'Point'], ['==', 'collectionId', '']]
      });

      setMapLoaded(true);
    });

    const onMouseLeave = () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
      setHoveredDriverId();
    };

    const onMouseMove = e => {
      if (!e.features.length) return;
      map.getCanvas().style.cursor = 'pointer';
      const { driverId } = e.features[0].properties;
      setHoveredDriverId(driverId);
      popup
        .setLngLat(e.lngLat)
        .setHTML(`<strong>Driver ${driverId}</strong>`)
        .addTo(map);
    };

    const onClick = e => {
      if (!e.features.length) return;
      const { driverId } = e.features[0].properties;
      selectDriver(driverId);
      setHoveredDriverId(driverId);
    };

    map.on('mouseleave', 'assigned-route-end-points', onMouseLeave);
    map.on('mouseleave', 'assigned-route-lines', onMouseLeave);
    map.on('mouseleave', 'driver-points', onMouseLeave);
    map.on('mousemove', 'assigned-route-end-points', onMouseMove);
    map.on('mousemove', 'assigned-route-lines', onMouseMove);
    map.on('mousemove', 'driver-points', onMouseMove);
    map.on('click', 'assigned-route-end-points', onClick);
    map.on('click', 'assigned-route-lines', onClick);
    map.on('click', 'driver-points', onClick);

    setMap(map);
  }, [setMap, setMapLoaded, setHoveredDriverId, selectDriver, MAP_ID, MAP_STYLES, config]);
}

export default useInitializeMap;
