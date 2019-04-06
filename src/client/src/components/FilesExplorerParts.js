import React from 'react';

export const Error = props => {
    if(!props.error) return null;

    return(
        <div className="error">Wystąpił błąd</div>
    );
}

export const Loading = props => {
    return <div className="loading">Trwa ładowanie ...</div>;
}

export const File = props => {
    let { type, name, doubleClick, contextMenu, size, date } = props;
    if(type === "file") type = "note";
    switch(type) {
        case "folder":
            return(
                <div 
                    className="file folder"
                    {...(doubleClick && { onDoubleClick: () => doubleClick() }) }
                    {...(contextMenu && { onContextMenu: e => contextMenu(e) }) }
                >
                    <div className="icon">
                        <i className="fas fa-folder" />
                    </div>
                    <div className="name">
                        { name }
                    </div>
                    <div className="type">
                        katalog
                    </div>
                </div>
            );
        case "note":
            return(
                <div 
                    className="file folder"
                    {...(doubleClick && { onDoubleClick: () => doubleClick() }) }
                    {...(contextMenu && { onContextMenu: e => contextMenu(e) }) }
                >
                    <div className="icon">
                        <i className="fas fa-sticky-note" />
                    </div>
                    <div className="name">
                        { name }
                    </div>
                    <div className="type">
                        notatka
                    </div>
                    <div className="last-modify">
                        { (new Date(date)).toLocaleString() }
                    </div>
                    <div className="size">
                        { size } KB
                    </div>
                </div>
            )
        default:
            return null;
    }
}

export const ContextMenu = props => {
    if(!props.open) return null;

    let { top, left, close, mode } = props;

    return(
        <div className="context-menu" style={{ top, left }} >
            <div className="fog" onClick={ () => close() }
                onContextMenu={ e => { e.preventDefault(); close() } }
            />
            <ul>
                <li onClick={ () => props.openAction(props.elem) }>Otwórz</li>
                <li>Zmień nazwę</li>
                <li onClick={ () => props.deleteAction(props.elem) }>Usuń</li>
                { mode === "file" &&
                    <React.Fragment>
                        <li>Edytuj</li>
                        <li>Eksportuj</li>
                        <li></li>
                    </React.Fragment>
                }
            </ul>
        </div>
    );
}

export const Window = props => {
    return(
        <div className="window">
            <div className={ props.open ? "fog fog-visible" : "fog" } 
                onClick={ () => props.close() }
            />
            { props.open && props.children }
        </div>
    );
}

export const NewFolder = props => {
    return(
        <div className="new-folder">
            <input type="text" placeholder="Wprowadź nazwę folderu" 
                value={ props.name }
                onChange={ e => props.change(e) }
                onBlur={ () => props.create() }
                onKeyPress={ e => e.key === "Enter" && props.create() }
                autoFocus
            />
        </div>
    );
}

export const Delete = props => {
    return(
        <div className="delete">
            <span>Czy na pewno usunąć</span>
            <br />
            <strong>{ props.name }</strong>
            <div className="complete" onClick={ () => props.delete() }>
                Potwierdź
            </div>
        </div>
    );
}

