import { connect } from "react-redux";
import Synthstrument from "./synthstrument";
import { createPatch, fetchPatch } from '../../actions/patch_actions';

const mSTP = state => {
    return {
        currentUserId: state.session.user.id,
        currentPatch: state.entities.currentPatch
    }
};

const mDTP = dispatch => {
    return {
        savePatch: (patchData) => dispatch(createPatch(patchData))
    }
}

export default connect(mSTP, mDTP)(Synthstrument);