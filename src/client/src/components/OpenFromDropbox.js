import React, { Component } from 'react';
import FilesExplorer from './FilesExplorer';

import '../styles/openFromDropbox.scss';

export default class OpenFromDropbox extends Component {
    render() {
        return (
            <div className="dropbox-opener">
                <FilesExplorer />
            </div>
        );
    }
}
