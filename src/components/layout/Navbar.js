import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Navbar extends Component {

    state = { 
        isAuthenticaded : false
     }

    //receive props automatically
    static getDerivedStateFromProps(props, state) {
        const { auth } = props;

        if(auth.uid) {
            return { isAuthenticaded : true}
        } else {
            return { isAuthenticaded : false}
        }
    }

    //Sign Off
    signOff = () => {
        const { firebase } = this.props;
        firebase.logout();
    }
    

    render() { 

        // extract the user from the state
        const {isAuthenticaded} = this.state;

        //extract autehrntication data
        const { auth } = this.props;

        return ( 
            <nav className="navbar navbar-expand-lg navbar-dark bg-nav mb-5">
                <nav className="navbar-light">
                    <span className="navbar-brand mb-0 h1">
                        LoanBooks
                    </span>
                </nav>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Navegación de palanca">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                    <div className="collapse navbar-collapse" id="navbarColor01">

                        { isAuthenticaded ? ( 
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/subscribers'} className="nav-link">
                                    Subscriptores
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">
                                    Libros
                                </Link>
                            </li>
                        </ul> 
                        ) : null }

                        { isAuthenticaded ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="#!" className="nav-link">
                                        {auth.email}
                                    </a>
                                </li>

                                <li className="">
                                    <button type="button" className="btn btn-secondary" onClick={this.signOff}>
                                        Sign off
                                    </button>
                                </li>
                            </ul>
                        ): null}
                    </div>
                 </nav>
         );
    }
}
 Navbar.propTypes = {
    firebase : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
 }

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(Navbar);