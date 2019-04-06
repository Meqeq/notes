import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/menu.css';

class Menu extends Component {
    render() {
        return (
            <nav className={ this.props.loading ? "loading" : "loaded"}>
                <div>MENU</div>
                <div className="kek" />
                { this.props.loading && <i className="fas fa-spinner loading-icon" /> }
                <ul>
                    <li className="submenu">
                        NOTATKI
                    </li>
                    
                    <li>
                        <Link to="/create">
                            <span>Utwórz notatkę</span>
                            <i className="fas fa-plus" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/edit">
                            <span>Edytuj notatkę</span>
                            <i className="far fa-file-alt" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/open">
                            <span>Otwórz notatkę</span>
                            <i className="far fa-edit" />
                        </Link>
                    </li>
                    <li className="submenu">
                        DROPBOX
                    </li>
                    { !this.props.logged ?
                        <li>
                            <a href="http://localhost:5000/api/login">
                                <span>Zaloguj się</span>
                                <i className="fab fa-dropbox" />
                            </a>
                        </li> :
                        <React.Fragment>
                            <li>
                                <div className="dropbox-account">
                                    <span className="name">
                                        { this.props.name } { this.props.surname }
                                    </span>
                                    <br />
                                    <span className="display-name">{ this.props.display }</span>
                                </div>
                            </li>
                            <li>
                                <Link to="/overview">
                                    <span>Przeglądaj</span>
                                    <i className="far fa-folder-open" />  
                                </Link>
                            </li>
                            <li>
                                <Link to="/open">
                                    <span>Informacje</span>
                                    <i className="far fa-chart-bar" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/open">
                                    <span>Wyloguj</span>
                                    <i className="fas fa-sign-out-alt" />
                                </Link>
                            </li>
                        </React.Fragment>
                    }
                    <li className="submenu">
                        INNE
                    </li>
                    <li>
                        <Link to="/guide">
                            <span>Przewodnik</span>
                            <i className="fas fa-atlas" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/other">
                            <span>Inne projekty</span>
                            <i className="fas fa-users" />
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    logged: state.user.logged,
    name: state.user.name,
    surname: state.user.surname,
    display: state.user.display,
    loading: state.user.loading
});

export default connect(mapStateToProps)(Menu);
