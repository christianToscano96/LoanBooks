import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditSubscriber extends Component {

    //crear los ref
    nameInput = React.createRef();
    surnameInput = React.createRef();
    codeInput = React.createRef();
    careerInput = React.createRef();

    //metodo para editar 
    editSubscriber = e => {
        e.preventDefault();

        //crear el objeto que va a actualizar
        
    }

        
    render() { 

        const { subscriber }  = this.props;

        if(!subscriber) return <Spinner />

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/subscribers'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Ir al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i> {''}
                        Editar Suscriptor
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5 shadow p-3 mb-5 bg-white rounded">
                            <form
                                onSubmit={this.editSubscriber}
                            >
                                <div className="form-group">
                                    <label className="font-weight-bold" >Nombre: </label>
                                    <input type="text" className="form-control" name="name" placeholder="Nombre del Suscriptor" reqired="true" 
                                            ref={this.nameInput}
                                            defaultValue={subscriber.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Apellido: </label>
                                    <input type="text" className="form-control" name="surname" placeholder="Apellido del Suscriptor" reqired="true" 
                                             ref={this.surnameInput}
                                            defaultValue={subscriber.surname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Carrera: </label>
                                    <input type="text" className="form-control" name="career" placeholder="Carrera del Suscriptor" reqired="true"
                                            ref={this.careerInput}
                                            defaultValue={subscriber.career}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Codigo: </label>
                                    <input type="text" className="form-control" name="code" placeholder="Codigo del Suscriptor" reqired="true"
                                             ref={this.codeInput}
                                            defaultValue={subscriber.code}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Editar Subscriptor"
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

export default compose(
    firestoreConnect(props => [
        {
            collection : 'subscribers',
            storeAs : 'subscriber',
            doc :  props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered }}, props) => ({
        subscriber : ordered.subscriber && ordered.subscriber[0]
    }))
)(EditSubscriber);