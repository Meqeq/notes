import React from 'react';
import FilesExplorer from './FilesExplorer';

export default props => {
    return(
        <div className="dropbox-saver">
            <FilesExplorer saver={ true } />
        </div>
    );
}