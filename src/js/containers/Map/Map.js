import { connect } from 'react-redux';
import { selectDriver, deselectDriver } from 'actions';
import Map from 'components/Map';
import { getCurrentFile, getCurrentFrame } from 'selectors';

const mapStateToProps = state => {
  const currentFile = getCurrentFile(state);
  const currentFrame = getCurrentFrame(state);
  const currentDriverId = state.driver.currentId;
  const { buffered, loaded } = state.status;

  return {
    buffered,
    loaded,
    fileGeojson: currentFile ? currentFile.geojson : null,
    frameGeojson: currentFrame ? currentFrame.geojson : null,
    selectedDriverId: currentDriverId
  };
};

const mapDispatchToProps = dispatch => ({
  selectDriver: driverId => {
    dispatch(selectDriver(driverId));
  },
  deselectDriver: () => {
    dispatch(deselectDriver());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
