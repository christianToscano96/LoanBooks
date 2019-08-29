import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Subscribers = ({subscribers, firestore}) => {
    //console.log(subscribers);
    if(!subscribers) return <Spinner />;

    //eliminar suscriptores
    const deleteSubsbriber = id => {
       //eliminar
       firestore.delete({
           collection : 'subscribers',
           doc : id
       });
    }

    return (    
           <div className="row">
               <div className="col-md-12 mb-4">
                  {/*  mostrar enlace para crear nuevos subscriptores*/}
                  <Link
                    to="/subscribers/new"
                    className="btn btn-primary"
                  >
                      <i className="fas fa-plus"></i>{" "}
                      Nuevo Suscriptor
                  </Link>
               </div>
               <div className="col-md-8">
                   <h2>
                        <i className="fas fa-users mr-2"></i>
                        Subscriptores
                    </h2> 
                </div>

                <table className="table table-striped mt-4">
                    <thead className="text-light text-center bg-primary">
                        <tr>
                            <th>Nombre</th>
                            <th>Carrera</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {subscribers.map(subscriber => (
                            <tr key={subscriber.id}>
                                <td>{subscriber.name} {subscriber.surname}</td>
                                <td>{subscriber.career}</td>
                                <td className="d-flex justify-content-center">
                                    <Link
                                        to={`/subscribers/show/${subscriber.id}`}
                                        className="btn btn-success mr-2"
                                    >
                                        <i className="fas fa-angle-double-right"></i>{" "}
                                        Más Información
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger px-4"
                                        onClick={ () => deleteSubsbriber(subscriber.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i>{''}
                                        
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
        );
}
Subscribers.propTypes = {
    firestore : PropTypes.object.isRequired,
    subscribers : PropTypes.array
}
export default compose(
    firestoreConnect([{ collection : 'subscribers' }]),
    connect((state, props) => ({
        subscribers : state.firestore.ordered.subscribers
    }))
)(Subscribers);