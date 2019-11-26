import { connect } from 'react-redux';
import { Timestamp } from 'components/PlaybackControls';
import { getCurrentFile } from 'selectors';

const mapStateToProps = state => {
  const currentFile = getCurrentFile(state);
  const timestamp =
    currentFile &&
    currentFile.date &&
    currentFile.date.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York'
    });

  return {
    timestamp
  };
};

export default connect(mapStateToProps)(Timestamp);
