import React, { Component } from 'react';
import { connect } from 'react-redux';
import { close } from '../actions/windowActions';

import DropboxLogin from './DropboxLogin';

import '../styles/window.css';

class Window extends Component {
    chooseComponent() {
        switch(this.props.component) {
            case "dropboxLogin":
                return(<DropboxLogin />);
            default:
                return "";
        }
    }

    render() {
        return (
            <div className="window">
                <div className="fog" onClick={ () => this.props.closeAction() } />
                { this.chooseComponent() }
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapActionsToProps = { 
    closeAction: close
};

export default connect(mapStateToProps, mapActionsToProps)(Window);
