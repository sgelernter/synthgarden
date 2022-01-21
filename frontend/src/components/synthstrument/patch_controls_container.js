import { connect } from "react-redux";
import PatchControls from "./patch_controls";
import { deletePatch } from '../../actions/patch_actions';

const mSTP = state => ({
    currentPatch: state.entities.currentPatch
});


const mDTP = dispatch => ({
    deletePatch: (id) => dispatch(deletePatch(id))
})

export default connect(mSTP, mDTP)(PatchControls);