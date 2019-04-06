import React, { Component } from 'react';
import { connect } from 'react-redux';
import { close } from '../actions/windowActions';

import '../styles/window.css';
import Download from './Download';

class Window extends Component {
    chooseComponent() {
        switch(this.props.component) {
            case "download":
                console.log("Zdzisłąw Onderka nie ma pleców");
                return(<Download />);
            default:
                return "";
        }
    }

    render() {
        if(!this.props.open) return ("");
        return (
            <div className="window">
                <div className="fog" onClick={ () => this.props.closeAction() } />
                { this.chooseComponent() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    component: state.window.component,
    open: state.window.open
});

const mapActionsToProps = { 
    closeAction: close
};

export default connect(mapStateToProps, mapActionsToProps)(Window);
