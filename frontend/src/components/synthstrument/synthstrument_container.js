import { connect } from "react-redux";
import Synthstrument from "./synthstrument";
import { createPatch, fetchPatch } from '../../actions/patch_actions';
import { createSample } from '../../actions/sample_actions';

const mSTP = state => {
    return {
        currentUserId: state.session.user.id,
        currentPatch: state.entities.currentPatch
    }
};

const mDTP = dispatch => {
    return {
        savePatch: (patchData) => dispatch(createPatch(patchData)),
        saveSample: (sampleData) => dispatch(createSample(sampleData))
    }
}

export default connect(mSTP, mDTP)(Synthstrument);