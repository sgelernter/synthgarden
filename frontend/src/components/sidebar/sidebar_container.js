import { connect } from "react-redux";
import { fetchPatches, loadPatch, deletePatch } from "../../actions/patch_actions";
import { fetchSamples, loadSample, deleteSample } from "../../actions/sample_actions";

import Sidebar from "./sidebar";

const mSTP = state => {
    return {
        patches: state.entities.patches,
        samples: state.entities.samples
    }
};

const mDTP = dispatch => {
    return {
        fetchPatches: () => dispatch(fetchPatches()),
        loadPatch: (patchId) => dispatch(loadPatch(patchId)),
        deletePatch: (id) => dispatch(deletePatch(id)),
        fetchSamples: () => dispatch(fetchSamples()),
        loadSample: (sampleId) => dispatch(loadSample(sampleId)),
        deleteSample: (id) => dispatch(deleteSample(id))
    }
};
 
export default connect(mSTP, mDTP)(Sidebar);