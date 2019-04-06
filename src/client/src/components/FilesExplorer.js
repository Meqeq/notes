import React, { Component } from 'react';

import '../styles/filesExplorer.scss';

import { Error, Loading, File, ContextMenu, Window, NewFolder, Delete } from './FilesExplorerParts';

export default class FilesExplorer extends Component {
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
            deleteName: ""
        }
    }

    componentDidMount() {
        this.updateCatalog("", true);
    }

    updateCatalog(path, force = false) {
        if(typeof this.state.files[path] === "undefined" || force) {
            fetch("/api/files", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path })
            }).then( res => 
                res.json() 
            ).then( res => {
                console.log("Pobrano zawartość folderu: " + path);
                this.setState({
                    files: {...this.state.files, [path]: res },
                    loading: false,
                    path
                });
            }).catch( err => {
                console.log("Wystapił błąd w ładowaniu listy plików");
                console.log(err);
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
        }, () => this.updateCatalog(newPath, force) );
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
        console.log(key);
        this.setState({
            contextMenu: true,
            posX: e.clientX - x,
            posY: e.clientY - y,
            contextMenuMode: mode,
            selElement: key
        })
    }

    contextMenuClose() {
        this.setState({ contextMenu: false })
    }

    closeWindow() {
        this.setState({
            newFolder: false,
            error: false,
            delete: false
        })
    }

    createCatalog() {
        if(this.state.newFolderName !== "") {
            if(/[/\\<>:?*"|]/.test(this.state.newFolderName)) {
                console.log("Nazwa folderu zawiera niepoprawne znaki");
            } else if(this.state.newFolderName.charAt(this.state.newFolderName.length - 1) === ".") {
                console.log("Nazwa folderu nie może zawierać kropki na końcu");
            } else if(this.state.newFolderName.charAt(0) === " ") {
                console.log("Nazwa folderu nie może zawierać spacji na początku");
            } else {
                this.setState({
                    loading: true,
                    newFolder: false,
                }, () => {
                    fetch("/api/create_cat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: this.state.newFolderName, path: this.state.path })
                    }).then( res => 
                        res.json()
                    ).then( res => {
                        console.log(res);
                        if(res.success) this.updateCatalog(this.state.path, true);
                    }).catch( err => {
                        console.log(err);
                    })
                });       
            }
        }
    }

    deleteFile() {
        this.setState({
            loading: true,
            delete: false,
        });

        fetch("/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: this.state.deletePath })
        }).then( res => 
            res.json()
        ).then( res => {
            this.updateCatalog(this.state.path, true);
        }).catch( err => {
            console.log(err);
        })
    }

    openAction(key) {
        let elem = this.state.files[this.state.path][key];
        switch(elem[".tag"]) {
            case "folder":
                this.changePath(elem.path_lower);
                break;
            default: 
                break;
        }
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
                    <Window 
                        open={ this.state.loading || this.state.newFolder || this.state.delete } 
                        close={ () => this.closeWindow() }
                    >
                        { this.state.loading && <Loading /> }
                        { this.state.error && <Error /> } 
                        { this.state.delete && <Delete name={ this.state.deleteName } delete={ () => this.deleteFile() } />}
                        { this.state.newFolder && <NewFolder 
                            change={ e => this.setState({ newFolderName: e.target.value }) }
                            create={ () => this.createCatalog() }
                            name={ this.state.newFolderName }
                        /> }
                    </Window>

                    <ContextMenu 
                        open={ this.state.contextMenu } 
                        top={ this.state.posY } 
                        left={ this.state.posX } 
                        elem={ this.state.selElement }
                        close={ () => this.contextMenuClose() }
                        openAction={ key => this.openAction(key) }
                        deleteAction={ key => this.deleteAction(key) }
                    />

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
                                    () => {}
                                }
                                contextMenu={ e => this.contextMenu(e, key) }
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
/*
    render() {
        return(
            
                
                <Error error={ this.state.error } errorMsg={ this.state.errorMsg } />
                
                

                

                { this.state.loading ?
                    <Loading /> :
                    
                    <div className="files">
                        <Window> 
                            { this.state.loading && <Loading /> }
                        </Window>
                        
                        { this.state.newFolder && 
                            <File 
                                type="newFolder"
                                name={ this.state.newFolderName }
                                change={ e => this.setState({ newFolderName: e.target.value }) }
                                create={ () => this.createCatalog() }
                            />
                        }
                        
                    </div>
                }
            </div>
        );
    }
}*/