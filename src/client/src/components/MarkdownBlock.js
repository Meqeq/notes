import React from 'react';
import marked from 'marked';

export default props => {
    return <div className="markdown-block" dangerouslySetInnerHTML={{ __html: marked(props.content) }} />;
}