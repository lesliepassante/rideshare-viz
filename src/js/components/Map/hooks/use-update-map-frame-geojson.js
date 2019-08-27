import { useEffect } from 'react';

function useUpdateMapFrameGeojson({ map, mapLoaded, frameGeojson, selectedDriverId, hoveredDriverId }) {
  useEffect(() => {
    if (!mapLoaded || !frameGeojson) return;

    map.getSource('assigned-route-lines').setData(frameGeojson);
    map.getSource('driver-points').setData(frameGeojson);

    if (selectedDriverId || hoveredDriverId) {
      map.getSource('selected-route-lines').setData(frameGeojson);
      map.getSource('selected-driver-points').setData(frameGeojson);
    }
  }, [map, mapLoaded, frameGeojson, selectedDriverId, hoveredDriverId]);
}

export default useUpdateMapFrameGeojson;
