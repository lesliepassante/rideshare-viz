import { connect } from 'react-redux';
import { initializeApp } from 'actions';
import App from 'components/App';

const mapStateToProps = ({ status }) => {
  const { initialized, loaded } = status;
  return { initialized, loaded };
};

const mapDispatchToProps = dispatch => ({
  onInitialize: () => {
    dispatch(initializeApp());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
