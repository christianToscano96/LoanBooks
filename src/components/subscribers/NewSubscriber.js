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
               <div className="col-12 mb-4">
                    <Link to={'/subscribers'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
               </div>
               <div className="col-12">
                   <h2>
                       <i className="fas fa-user-plus"></i> {''}
                       Nuevo Suscriptor
                   </h2>

                   <div className="row justify-content-center">
                        <div className="col-md-8 mt-5 shadow p-3 mb-5 bg-white rounded">
                            <form
                                onSubmit={this.addSubscriber}
                            >
                                <div className="form-group">
                                    <label className="font-weight-bold" >Nombre: </label>
                                    <input type="text" className="form-control" name="name" placeholder="Nombre del Suscriptor" reqired="true" 
                                           onChange={this.readDate}
                                           value={this.state.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Apellido: </label>
                                    <input type="text" className="form-control" name="surname" placeholder="Apellido del Suscriptor" reqired="true" 
                                           onChange={this.readDate}
                                           value={this.state.surname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Carrera: </label>
                                    <input type="text" className="form-control" name="career" placeholder="Carrera del Suscriptor" reqired="true"
                                           onChange={this.readDate}
                                           value={this.state.career}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Codigo: </label>
                                    <input type="text" className="form-control" name="code" placeholder="Codigo del Suscriptor" reqired="true"
                                           onChange={this.readDate}
                                           value={this.state.code}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Agregar Subscriptor"
                                    className="btn btn-success"
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