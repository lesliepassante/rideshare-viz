import { useEffect } from 'react';

function useUpdateMapSelectedDriver({ map, mapLoaded, selectedDriverId, hoveredDriverId }) {
  useEffect(() => {
    if (!mapLoaded) return;
    map.setFilter('selected-route-lines', [
      'any',
      ['==', 'driverId', hoveredDriverId || ''],
      ['==', 'driverId', selectedDriverId || '']
    ]);

    map.setFilter('selected-route-end-points', [
      'all',
      ['any', ['==', 'driverId', hoveredDriverId || ''], ['==', 'driverId', selectedDriverId || '']],
      ['==', '$type', 'Point']
    ]);

    map.setFilter('selected-driver-points', [
      'all',
      ['any', ['==', 'driverId', hoveredDriverId || ''], ['==', 'driverId', selectedDriverId || '']],
      ['==', '$type', 'Point']
    ]);
  }, [map, mapLoaded, selectedDriverId, hoveredDriverId]);
}

export default useUpdateMapSelectedDriver;
