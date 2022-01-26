import React from 'react';
import '../../assets/stylesheets/instructions.scss';

class Instructions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div onClick={this.props.closeModal} className="close-x">x</div>

            </div>
        )
    }
}

export default Instructions;