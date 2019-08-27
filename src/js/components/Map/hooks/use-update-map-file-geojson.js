import { useEffect } from 'react';

function useUpdateMapFileGeojson({ map, mapLoaded, fileGeojson, selectedDriverId, hoveredDriverId }) {
  useEffect(() => {
    if (!mapLoaded || !fileGeojson) return;
    map.getSource('unassigned-route-lines').setData(fileGeojson);
    map.getSource('unassigned-route-end-points').setData(fileGeojson);
    map.getSource('assigned-route-end-points').setData(fileGeojson);

    if (selectedDriverId || hoveredDriverId) {
      map.getSource('selected-route-end-points').setData(fileGeojson);
    }
  }, [map, mapLoaded, fileGeojson, selectedDriverId, hoveredDriverId]);
}

export default useUpdateMapFileGeojson;
