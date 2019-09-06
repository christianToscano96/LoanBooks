import React, { Component } from 'react';
//auth log in
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types';

class Login extends Component {
    state = {
        email: '',
        password: ''
      }
     
      // Log in Firebase
      logIn = e => {
          e.preventDefault();

          //extract firebase
          const {firebase} = this.props;

          //extract state
          const { email, password } = this.state;

          //aunthenticate the user
          firebase.login({
              email,
              password
          })
          .then(result => console.log('log in'))
          .catch(error => console.log('error'))
      }

      //store what the user writes in the state
      readData = e => {
          this.setState({
                [e.target.name] : e.target.value
          })
      }


    render() { 
        return ( 
            <div className="row justify-content-center ">
                <div className="col-md-5 ">
                    <div className="card mt-5 ">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i> {''}
                                Log in
                            </h2>

                            <form 
                                onSubmit={this.logIn}
                            >
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" name="email" className="form-control" required={true} value={this.state.email} onChange={this.readData}/>
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" name="password" className="form-control" required={true} value={this.state.password} onChange={this.readData}/>
                                </div>

                                <input type="submit" value="Log in" className="btn btn-success btn-block"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);
