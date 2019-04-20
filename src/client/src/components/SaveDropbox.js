import React, { Component } from 'react';
import FilesExplorer from './FilesExplorer';

import '../styles/saveDropbox.scss';

export default class SaveDropbox extends Component {
    render() {
        return (
            <div className="dropbox-saver">
                <FilesExplorer saver={ true } />
            </div>
        )
    }
}
