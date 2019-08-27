import { connect } from 'react-redux';
import Welcome from 'components/Welcome';

const mapStateToProps = ({ status }) => {
  return {
    loading: status.loading,
    error: status.error
  };
};

export default connect(mapStateToProps)(Welcome);
