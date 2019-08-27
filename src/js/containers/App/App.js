import { connect } from 'react-redux';
import App from 'components/App';

const mapStateToProps = ({ status }) => {
  return {
    loaded: status.loaded
  };
};

export default connect(mapStateToProps)(App);
