import { connect } from 'react-redux';
import DriverDetails from 'components/DriverDetails';
import { deselectDriver } from 'actions';
import { getCurrentDriverBacklog, getCurrentFile, getPreviousDriverBacklog } from 'selectors';

const mapStateToProps = state => {
  const currentDriverId = state.driver.currentId;
  const currentFile = getCurrentFile(state);
  const currentFileIsBuffering = currentFile.status.loading && !currentFile.status.loaded;
  const backlog = currentFileIsBuffering ? getPreviousDriverBacklog(state) : getCurrentDriverBacklog(state);

  return {
    backlog,
    currentDriverId
  };
};

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(deselectDriver());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverDetails);
