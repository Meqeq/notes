import React, { Component } from 'react';

import '../styles/openMenu.scss';

export default class OpenMenu extends Component {
    render() {
        return (
            <div className="open-menu">
                <div className="option">
                    <i className="fas fa-desktop" />
                    <br />
                    <span>KOMPUTER</span>
                </div>
                <div className="option">
                    <i className="fab fa-dropbox" />
                    <br />
                    <span>DROPBOX</span>
                </div>
                <div className="desc">Otwórz notatkę z</div>
            </div>
        )
    }
}
