import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open } from '../actions/windowActions';

import '../styles/openMenu.scss';

class OpenMenu extends Component {
    render() {
        return (
            <div className="open-menu">
                <div className="option" onClick={ () => this.props.openWindow("open-computer")}>
                    <i className="fas fa-desktop" />
                    <br />
                    <span>KOMPUTER</span>
                </div>
                <div className="option" onClick={ () => { console.log("kekkekekek"); this.props.openWindow("open-dropbox") }}>
                    <i className="fab fa-dropbox" />
                    <br />
                    <span>DROPBOX</span>
                </div>
                <div className="desc">Otwórz notatkę z</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapActionsToProps = { 
    openWindow: open
};

export default connect(mapStateToProps, mapActionsToProps)(OpenMenu);
