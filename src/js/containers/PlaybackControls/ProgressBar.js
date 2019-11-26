import { connect } from 'react-redux';
import { ProgressBar } from 'components/PlaybackControls';
import { getCurrentProgress } from 'selectors';

const mapStateToProps = state => {
  const progress = getCurrentProgress(state);
  return {
    progress
  };
};

export default connect(mapStateToProps)(ProgressBar);
