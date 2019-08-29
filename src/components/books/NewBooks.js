import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NewBooks extends Component {

    state = { 
        title : '',
        ISBN : '',
        editorial : '',
        existence : ''
    }

    //guardar el libro ne la bd
    addBook = e => {
        e.preventDefault();

        //tomar una copia del state
        const newBook = this.state;

        //agregar un arreglo de prestamos
        newBook.lend = [];

        //extraer firestore con sus metodos
        const {firestore, history } = this.props;

        //añadirlo a la bse de datos y redireccionar
        firestore.add({collection: 'books'},newBook )
            .then(() => history.push('/'))

    }

    //metodo para leer y almacenar los datos onChange que el usuario escribe
    readDate = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 
        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>

                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i> {''}
                        Nuevo Libro
                    </h2>
                    <div className="col-md-8 mt-5 shadow p-3 mb-5 bg-white rounded">
                        <form
                            onSubmit={this.addBook}
                        >
                            <div className="form-group">
                                <label>Titulo: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Titlo o Nombre del Libro"
                                    required= "true"
                                    value={this.state.titulo}
                                    onChange={this.readDate}
                                />
                            </div>
                            <div className="form-group">
                                <label>ISBN: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="ISBN"
                                    placeholder="Codigo ISBN"
                                    required= "true"
                                    value={this.state.ISBN}
                                    onChange={this.readDate}
                                />
                            </div>
                            <div className="form-group">
                                <label>Editorial: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="editorial"
                                    placeholder="Editorial del Libro"
                                    required= "true"
                                    value={this.state.editorial}
                                    onChange={this.readDate}
                                />
                            </div>
                            <div className="form-group">
                                <label>Existencia: </label>
                                <input 
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    name="existence"
                                    placeholder="Cantidad en existencia"
                                    required= "true"
                                    value={this.state.existence}
                                    onChange={this.readDate}
                                />
                            </div>
                            <input type="submit" className="btn btn-success" value="Agregar Libro"/>
                        </form>
                    </div>
                </div>
            </div>
         );
    }
}
NewBooks.propTypes = {
    firestore : PropTypes.object.isRequired
}
 
export default firestoreConnect()(NewBooks);