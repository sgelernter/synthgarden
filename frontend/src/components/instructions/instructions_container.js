import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import Instructions from './instructions';

const mapStateToProps = state => {
  return {
    formType: 'instructions',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
