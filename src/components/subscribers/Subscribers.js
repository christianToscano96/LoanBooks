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
               
               <div className="col-12  mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                    <div className="col-md-10 ml-3 col-sm-6">
                        <h2>
                            <i className="fas fas fa-user mr-2"></i>
                            Subscribers
                        </h2>
                    </div>
                    <div className="col-md-2 col-sm-6 px-5">
                        <Link to="/subscribers/new" className="btn btn-new-color">
                            <i className="fas fa-user-plus"></i> {''}
                            New
                        </Link>
                    </div>
                 </div> 

                <table className="table table-striped tabel-bg mt-4">
                    <thead className=" text-center thead-bg">
                        <tr>
                            <th>Name</th>
                            <th>Careers</th>
                            <th>Actions</th>
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
                                        className="btn btn-more mr-1"
                                    >
                                        <i className="fas fa-angle-double-right"></i>{" "}
                                        More Info
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-delete px-3"
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