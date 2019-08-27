import { connect } from 'react-redux';
import { chooseFilesAndPlaySimulation } from 'actions';
import WelcomeFileInput from 'components/Welcome/WelcomeFileInput';

const mapDispatchToProps = dispatch => ({
  loadFiles: async files => {
    dispatch(await chooseFilesAndPlaySimulation(files));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(WelcomeFileInput);
