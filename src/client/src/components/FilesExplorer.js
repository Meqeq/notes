import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openFromDropbox } from '../actions/noteActions';
import history from '../history';

import { Error, Complete, Loading, File, ContextMenu, Window, NewFolder, Delete, Saver } from './FilesExplorerParts';

class FilesExplorer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMsg: "",
            loading: true,
            path: "",
            files: { "": [] },
            contextMenu: false,
            posX: 0,
            posY: 0,
            selElement: -1,
            newFolder: false,
            newFolderName: "",
            delete: false,
            deletePath: "",
            deleteName: "",
            saveName: "",
            complete: false,
            completeMsg: ""
        }

        this._isMntd = false;
    }

    componentDidMount() {
        this.isMntd = true;
        this.updateDirectory("", true);
    }

    componentWillUnmount() {
        this.isMntd = false;
    }

    updateDirectory(path, force = false) {
        if( typeof this.state.files[path] === "undefined" || force ) {

            fetch( "/api/get/files", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path })
            }).then( res =>
                res.json().then( kek => {
                    if(res.ok) 
                        return kek;
                    else 
                        return Promise.reject(kek.error);
                })
            ).then( res => {
                this.isMntd && this.setState({
                    files: {...this.state.files, [path]: res },
                    loading: false,
                    path
                });
            }).catch( err => {
                this.isMntd && this.setState({
                    error: true,
                    errorMsg: err,
                    loading: false
                });
            })
        } else {
            this.setState({
                loading: false,
                path
            })
        }
    }

    changePath(newPath, force=false) {
        this.setState({ 
            loading: true,
            contextMenu: false
        }, () => this.updateDirectory(newPath, force) );
    }

    setPreviousPath() {
        if(this.state.path !== "") {
            let slashPos = this.state.path.lastIndexOf("/");
            let newPath = this.state.path.substring(0, slashPos);
            
            this.changePath(newPath);
        }
    }

    contextMenu(e, key, mode) {
        e.preventDefault();

        let x = document.getElementsByClassName("files-wrapper")[0].offsetLeft;
        let y = document.getElementsByClassName("files-wrapper")[0].offsetTop;
 
        this.setState({
            contextMenu: true,
            posX: e.clientX - x,
            posY: e.clientY - y,
            contextMenuMode: mode,
            selElement: key
        })
    }

    closeWindow() {
        this.setState({
            newFolder: false,
            error: false,
            delete: false,
            contextMenu: false
        });
    }

    save() {
        try {
            if( /[/\\<>:?*"|]/.test(this.state.saveName) )
                throw new TypeError("Nazwa notatki zawiera niepoprawne znaki np. ( / \\ < > : ? * \" | )");

            if( this.state.saveName.charAt(this.state.saveName.length - 1 ) === ".") 
                throw new TypeError("Nazwa notatki nie może zawierać kropki na końcu");

            if( this.state.saveName.charAt(0) === " " )
                throw new TypeError("Nazwa notatki nie może zawierać spacji na początku");
            
            this.setState({ loading: true });

            fetch("/api/create/note",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path: this.state.path + "/" + this.state.saveName, note: this.props.note })
            }).then( res =>
                res.json().then( kek => {
                    if(res.ok) 
                        return kek;
                    else 
                        return Promise.reject(kek.error);
                })
            ).then( res => {
                if( res.success ) 
                    this.setState({
                        complete: true,
                        completeMsg: "Pomyślnie zapisano notatkę"
                    })
            }).catch( err => {
                console.log(err);
                this.setState({
                    error: true,
                    errorMsg: err.message,
                    loading: false
                });
            })
        } catch(e) {
            this.setState({
                error: true,
                errorMsg: e.message
            })
        }
    }

    createDirectory() {
        try {
            if( /[/\\<>:?*"|]/.test(this.state.newFolderName) )
                throw new TypeError("Nazwa folderu zawiera niepoprawne znaki np. ( / \\ < > : ? * \" | )");

            if( this.state.newFolderName.charAt(this.state.newFolderName.length - 1 ) === ".") 
                throw new TypeError("Nazwa folderu nie może zawierać kropki na końcu");

            if( this.state.newFolderName.charAt(0) === " " )
                throw new TypeError("Nazwa folderu nie może zawierać spacji na początku");

            this.setState({
                loading: true,
                newFolder: false,
                error: false
            }, () => {
                fetch("/api/create/directory", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: this.state.newFolderName, path: this.state.path })
                }).then( res =>
                    res.json().then( kek => {
                        if(res.ok) 
                            return kek;
                        else 
                            return Promise.reject(kek.error);
                    })
                ).then( res => {
                    if( res.success ) 
                        this.updateDirectory(this.state.path, true);
                }).catch( err => {
                    this.setState({
                        error: true,
                        errorMsg: err,
                        loading: false
                    });
                })
            });
        } catch(e) {
            this.setState({
                error: true,
                errorMsg: e.message
            })
        }
    }

    deleteFile() {
        this.setState({
            loading: true,
            delete: false,
        }, () => {
            fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path: this.state.deletePath })
            }).then( res => 
                res.json().then( kek => {
                    if(res.ok) 
                        return kek;
                    else 
                        return Promise.reject(kek.error);
                })
            ).then( res => {
                if( res.success )
                    this.updateDirectory(this.state.path, true);
            }).catch( err => {
                //console.log(err);
                this.setState({
                    error: true,
                    errorMsg: err,
                    loading: false
                });
            })
        });
    }

    openNote(path) {
        this.setState({
            loading: true
        }, () => {
            fetch("/api/get/note", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path })
            }).then( res => 
                res.json().then( kek => {
                    if(res.ok) 
                        return kek;
                    else 
                        return Promise.reject(kek.error);
                })
            ).then( res => {
                if(res.success) 
                    this.props.open(res.content, history);
            }).catch( err => {
                //console.log(err);
                this.setState({
                    error: true,
                    errorMsg: err,
                    loading: false
                });
            })
        })
    }

    openAction(key) {
        this.state.files[this.state.path][key][".tag"] === "folder" ? 
            this.changePath(this.state.files[this.state.path][key]["path_lower"]) :
            this.openNote(this.state.files[this.state.path][key]["path_lower"]);
    }

    deleteAction(key) {
        let elem = this.state.files[this.state.path][key];
        this.setState({
            delete: true,
            deletePath: elem.path_lower,
            deleteName: elem.name,
            contextMenu: false
        });
    }

    render() {
        //console.log(this.state.path);
        return(
            <div className="files-explorer">
                <div className="header">
                    <div className="path">{ this.state.path } </div>
                    <div className="options">
                        <div className="option" onClick={ () => this.setPreviousPath() }>
                            <i className="fas fa-arrow-left" />
                        </div>
                        <div className="option" onClick={ () => this.changePath(this.state.path, true) }>
                            <i className="fas fa-redo" />
                        </div>
                        <div className="option" onClick={ () => this.setState({ newFolder: true, newFolderName: "" }) }>
                            <i className="fas fa-folder-plus"/>
                        </div>
                        <div className="option">
                            <i className="fas fa-file-medical" />
                        </div>
                    </div>
                </div>
                <div className="files-wrapper">
                    <ContextMenu 
                        open={ this.state.contextMenu } 
                        top={ this.state.posY } 
                        left={ this.state.posX } 
                        elem={ this.state.selElement }
                        openAction={ key => this.openAction(key) }
                        deleteAction={ key => this.deleteAction(key) }
                    />
                    <Window 
                        open={ this.state.loading || this.state.newFolder || this.state.delete || this.state.error || this.state.complete || this.state.contextMenu } 
                        close={ () => this.closeWindow() }
                    >
                        { this.state.loading && <Loading /> }
                        { this.state.newFolder && <NewFolder 
                            change={ e => this.setState({ newFolderName: e.target.value }) }
                            create={ () => this.createDirectory() }
                            name={ this.state.newFolderName }
                        /> } 
                        { this.state.error && <Error msg={ this.state.errorMsg } /> }
                        { this.state.complete && <Complete msg={ this.state.completeMsg } /> }
                        { this.state.delete && <Delete name={ this.state.deleteName } delete={ () => this.deleteFile() } />}
                    </Window>

                    <div className="files">
                        <File name=".." type="folder" doubleClick={ () => this.setPreviousPath() } />

                        { this.state.files[this.state.path].map( (value, key) => (
                            <File 
                                key={ key }
                                type={ value['.tag'] }
                                name={ value.name }
                                size={ value.size }
                                date={ value.server_modified }
                                doubleClick={ 
                                    value['.tag'] === "folder" ?
                                    () => this.changePath(value.path_lower) :
                                    () => this.openNote(value.path_lower)
                                }
                                contextMenu={ e => this.contextMenu(e, key) }
                            />
                        ))}
                    </div>
                </div>

                { this.props.saver &&
                    <Saver save={ () => this.save() } val={ this.state.saveName } change={ e => this.setState({ saveName: e.target.value }) }/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({ note: state.note });

const mapActionsToProps = {
    open: openFromDropbox
}
  
export default connect(mapStateToProps, mapActionsToProps)(FilesExplorer);