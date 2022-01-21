import { connect } from "react-redux";
import { fetchPatches, loadPatch, deletePatch } from "../../actions/patch_actions";
import { fetchUserSamples, loadSample } from "../../actions/sample_actions";

import Sidebar from "./sidebar";

const mSTP = state => {
    return {
        currentUserId: state.session.user.id,
        patches: state.entities.patches,
        samples: state.entities.samples
    }
};

const mDTP = dispatch => {
    return {
        fetchPatches: () => dispatch(fetchPatches()),
        loadPatch: (patchId) => dispatch(loadPatch(patchId)),
        deletePatch: (id) => dispatch(deletePatch(id)),
        fetchUserSamples: (userId) => dispatch(fetchUserSamples(userId)),
        loadSample: (sampleId) => dispatch(loadSample(sampleId))
    }
};
 
export default connect(mSTP, mDTP)(Sidebar);