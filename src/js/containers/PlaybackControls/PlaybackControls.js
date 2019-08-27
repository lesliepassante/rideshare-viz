import { connect } from 'react-redux';
import PlaybackControls from 'components/PlaybackControls';
import { startPlayingSimulation, pausePlayingSimulation, skipBack, skipForward } from 'actions';
import { getCurrentProgress, getCurrentFile } from 'selectors';

const mapStateToProps = state => {
  const { playing } = state.status;
  const progress = getCurrentProgress(state);
  const currentFile = getCurrentFile(state);
  const isSelectedDriver = typeof state.driver.currentId === 'number';
  const timestamp =
    currentFile &&
    currentFile.date &&
    currentFile.date.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York'
    });

  return {
    isSelectedDriver,
    playing,
    progress,
    timestamp
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
