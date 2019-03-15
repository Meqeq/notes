import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open } from '../actions/windowActions';
import { Link } from 'react-router-dom';

import '../styles/homeMenu.css';

class HomeMenu extends Component {
  render() {
    return (
        <div className="links">
            <div className="links-group">
                <Link to="/create">
                    <div className="block-small create">
                        <i className="fas fa-plus" />
                        <div className="desc">Utwórz notatkę</div>
                    </div>
                </Link>
                <Link to="/open">
                    <div className="block-small open">
                        <i className="far fa-file-alt" />
                        <div className="desc">Otwórz notatkę</div>
                    </div>
                </Link>
                <Link to="/edit">
                    <div className="block-small edit">
                        <i className="far fa-edit" />
                        <div className="desc">Edytuj notatkę</div>
                    </div>
                </Link>
                <Link to="/help">
                    <div className="block-small help">
                        <i className="far fa-question-circle" />
                        <div className="desc"> Pomoc </div>
                    </div>
                </Link>
            </div>
            <div className="links-group">
                <div className="block-big dropbox" onClick={ () => window.location = "http://localhost:5000/api/login" }>
                    <i className="fab fa-dropbox" />
                    <span>
                        Zaloguj się do swojego Dropbox'a aby wygodniej korzystać z aplikacji
                    </span>
                </div>
                <div className="block-big guide">
                    <i className="fas fa-atlas" />
                    <span>
                        Przewodnik po stronie. Instrukcja tworzenia i edycji notatek
                    </span>
                </div>
                <div className="block-big other">
                    <i className="fas fa-users" />
                    <span>
                        Inne projekty i przydatne informacje. Linki do VS TeamServices
                    </span>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({

});

const mapActionsToProps = { 
    openAction: open
};

export default connect(mapStateToProps, mapActionsToProps)(HomeMenu);
