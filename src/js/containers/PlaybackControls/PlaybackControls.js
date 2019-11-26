import { connect } from 'react-redux';
import PlaybackControls from 'components/PlaybackControls';
import { startPlayingSimulation, pausePlayingSimulation, skipBack, skipForward } from 'actions';

const mapStateToProps = state => {
  const { playing } = state.status;
  const isSelectedDriver = typeof state.driver.currentId === 'number';
  return {
    isSelectedDriver,
    playing
  };
};

const mapDispatchToProps = dispatch => ({
  onPause: () => {
    dispatch(pausePlayingSimulation());
  },
  onPlay: () => {
    dispatch(startPlayingSimulation());
  },
  onStartOver: () => {
    dispatch(startPlayingSimulation());
  },
  onSkipBack: () => {
    dispatch(skipBack());
  },
  onSkipForward: () => {
    dispatch(skipForward());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaybackControls);
