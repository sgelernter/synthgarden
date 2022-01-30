import React from 'react';



class PatchControls extends React.Component {
    constructor(props){
        super(props);
        this.disableKeys = this.disableKeys.bind(this);
        this.enableKeys = this.enableKeys.bind(this);
    }

    toggleNewPatchUI(){
        document.getElementById('loaded-patch-CRUD').className = "hidden";
        document.getElementById('new-patch-CRUD').className = "visible";
        document.getElementById('new-patch-toggle').className = "hidden"; 
    }

    disableKeys(){
        console.log('keyboard disabled');
        document.removeEventListener('keydown', this.props.pressKey);
        document.removeEventListener('keyup', this.props.releaseKey);
    }

    enableKeys(){
        console.log('keyboard enabled');
        document.addEventListener('keydown', this.props.pressKey);
        document.addEventListener('keyup', this.props.releaseKey);
    }

    render(){
        return (
            <div className="patch-interface" onFocus={this.disableKeys} onBlur={this.enableKeys}>
                <div className="visible" id="new-patch-CRUD">
                    <input type="text" value={this.props.patchName} placeholder="enter patch name" onChange={this.props.updatePatchName} className="default-text" />
                    <button onClick={() => this.props.savePatch('new')}>
                        save patch
                    </button>
                </div>
                <button className="hidden" id="new-patch-toggle" onClick={this.toggleNewPatchUI}>
                    create new patch
                </button>
                <p id="current-patch-display">
                    Current patch: {this.props.currentName}
                </p>
                <div className="hidden" id="loaded-patch-CRUD">
                    <button onClick={() => this.props.savePatch('update')}>
                        update this patch
                    </button>
                    <button onClick={() => this.props.deletePatch(this.props.currentPatch._id)}>
                        delete patch
                    </button>
                </div>
            </div>
        )
    }
}

export default PatchControls;