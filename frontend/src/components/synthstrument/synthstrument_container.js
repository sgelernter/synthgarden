import { connect } from "react-redux";
import Synthstrument from "./synthstrument";
import { createPatch, updatePatch, deletePatch } from '../../actions/patch_actions';
import { createSample } from '../../actions/sample_actions';
import { withRouter } from "react-router-dom";

const mSTP = state => {
    return {
        currentUserId: state.session.user.id,
        currentPatch: state.entities.currentPatch,
        currentSample: state.entities.currentSample
    }
};

const mDTP = dispatch => {
    return {
        savePatch: (patchData) => dispatch(createPatch(patchData)),
        saveSample: (sampleData) => dispatch(createSample(sampleData)),
        saveUpdatedPatch: (id) => dispatch(updatePatch(id))
    }
}

export default withRouter(connect(mSTP, mDTP)(Synthstrument));