import React from "react";
import "../../assets/stylesheets/sidebar.scss";

class Sidebar extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            patchesFetched: 'false'
        }
    }

    componentDidMount(){
        this.props.fetchPatches();
        this.setState({patchesFetched: true});
    }

    render(){
        if (this.state.patchesFetched === 'false') {
            return null;
        }
        // debugger
        return (
            <div className="sidebar">
                <h3>All Patches:</h3>
                <ul>
                    {Object.values(this.props.patches).map((fullPatch, idx) => (
                        <li key={idx} className="sidebar-list-item" onClick={() => this.props.loadPatch(fullPatch)} >
                            {fullPatch.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Sidebar;