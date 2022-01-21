import { connect } from "react-redux";
import Synthstrument from "./synthstrument";
import { createSample, updateSample, deleteSample } from '../../actions/sample_actions';
import { createPatch, updatePatch, deletePatch } from '../../actions/patch_actions';
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
        updateSample: (sample) => dispatch(updateSample(sample)),
        deleteSample: (id) => dispatch(deleteSample(id)),
        saveUpdatedPatch: (id) => dispatch(updatePatch(id))
    }
}

export default withRouter(connect(mSTP, mDTP)(Synthstrument));