import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/nav.css';

export default class Nav extends Component {
  render() {
    //if(window.location.pathname === "/") return (<div className="bar" />)
    return (
        <nav className="main-nav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/open">Otwórz notatkę</Link>
                </li>
                <li>
                    <Link to="/create">Stwórz notatkę</Link>
                </li>
                <li>
                    <Link to="/edit">Edytuj notatkę</Link>
                </li>
            </ul>
        </nav>
    )
  }
}
