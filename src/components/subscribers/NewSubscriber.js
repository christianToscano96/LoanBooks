import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NewSubscriber extends Component {
    state = { 
        name: '',
        surname: '',
        career: '',
        code: ''
     }
     //metodo para agregar un nuevo subscriptor a la base de datos
     addSubscriber = e => {
         e.preventDefault();

         //extraer los valores del state
        const newSubscriber = this.state;
        //console.log(newSubscriber);

         //extraer firestore de props
        const { firestore, history } = this.props

         //guardarlo en la base de datos
         firestore.add({ collection : 'subscribers' }, newSubscriber)
            .then(() => history.push('/subscribers') )
     }


     //metodo que extrae los valores y lo actualiza en el state
     readDate = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
     }


    render() { 
        return ( 
           <div className="row">
               <div className="col-12  mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                    <div className="col-md-10 ml-3">
                        <h2>
                        <i className="fas fa-user-plus"></i> {''}
                        New Subscriber
                    </h2>
                    </div>
                    <div className="col-md-2 px-3">
                        <Link to="/subscribers" className="btn btn-secondary">
                            <i className="fas fa-arrow-circle-left"></i> {''}
                            Go to List
                        </Link>
                    </div>
            </div> 
               <div className="col-12">
                   

                   <div className="row justify-content-center">
                        <div className="col-md-8 mt-5 shadow p-3 mb-5 bg-white rounded">
                            <form
                                onSubmit={this.addSubscriber}
                            >
                                <div className="form-group">
                                    <label className="font-weight-bold" >Name: </label>
                                    <input type="text" className="form-control" name="name" placeholder="Subscriber's Name" reqired="true" 
                                           onChange={this.readDate}
                                           value={this.state.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Surname: </label>
                                    <input type="text" className="form-control" name="surname" placeholder="Subscriber's Surname" reqired="true" 
                                           onChange={this.readDate}
                                           value={this.state.surname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Career: </label>
                                    <input type="text" className="form-control" name="career" placeholder="Subscribe Career" reqired="true"
                                           onChange={this.readDate}
                                           value={this.state.career}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Code: </label>
                                    <input type="text" className="form-control" name="code" placeholder="Subscribe Code" reqired="true"
                                           onChange={this.readDate}
                                           value={this.state.code}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Add Subscriber"
                                    className="btn btn-success col-lg-6"
                                />
                            </form>
                        </div>
                   </div>
               </div>
           </div>
         );
    }
}

NewSubscriber.propTypes = {
    firestore : PropTypes.object.isRequired
}
 
export default firestoreConnect()(NewSubscriber);