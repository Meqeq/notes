import React, { Component } from 'react';

import FilesExplorer from '../components/FilesExplorer';

export default class Overview extends Component {
    render() {
        return (
            <div className="overview">
                <FilesExplorer />
            </div>
        )
    }
}
