import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/menu.css';

class Menu extends Component {
    render() {
        return (
            <nav className={ this.props.loading ? "loading" : "loaded"}>
                { this.props.loading && <i className="fas fa-spinner loading-icon" /> }
                <div>MENU</div>
                <div className="kek" />
                <ul>
                    <li className="submenu">
                        NOTATKI
                    </li>
                    <li>
                        <Link to="/open">
                            <div className="menu-item clearfix active">
                                <div>Utwórz notatkę</div>
                                <div className="icon">
                                    <i className="fas fa-plus" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/edit">
                            <div className="menu-item clearfix">
                                <div>Edytuj notatkę</div>
                                <div className="icon">
                                    <i className="far fa-file-alt" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/open">
                            <div className="menu-item clearfix">
                                <div>Otwórz notatkę</div>
                                <div className="icon">
                                    <i className="far fa-edit" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="submenu">
                        DROPBOX
                    </li>
                    { !this.props.logged ?
                        <li>
                            <a href="http://localhost:5000/api/login">
                                <div className="menu-item clearfix">
                                    <div>Zaloguj się</div>
                                    <div className="icon">
                                        <i className="fab fa-dropbox" />
                                    </div>
                                </div>
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
                                <Link to="/open">
                                    <div className="menu-item clearfix">
                                        <div>Przeglądaj</div>
                                        <div className="icon">
                                            <i className="far fa-folder-open" />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/open">
                                    <div className="menu-item clearfix">
                                        <div>Informacje</div>
                                        <div className="icon">
                                            <i className="far fa-chart-bar" />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/open">
                                    <div className="menu-item clearfix">
                                        <div>Wyloguj</div>
                                        <div className="icon">
                                            <i className="fas fa-sign-out-alt" />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </React.Fragment>
                    }
                    
                    <li className="submenu">
                        INNE
                    </li>
                    <li>
                        <Link to="/guide">
                            <div className="menu-item clearfix">
                                <div>Przewodnik</div>
                                <div className="icon">
                                    <i className="fas fa-atlas" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/other">
                            <div className="menu-item clearfix">
                                <div>Inne projekty</div>
                                <div className="icon">
                                    <i className="fas fa-users" />
                                </div>
                            </div>
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
