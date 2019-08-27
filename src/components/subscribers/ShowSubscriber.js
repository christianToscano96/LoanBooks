import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const ShowSubscriber = ({subscriber}) => {

    if(!subscriber) return <Spinner />;

    return ( 
         <div className="row">
            <div className="col-12  mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                <div className="col-md-10 ml-3">
                    <Link to="/subscribers" className="btn btn-secondary">  
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Ir a Listado
                    </Link>
                </div>
                <div className="col-md-2 px-3">
                    <Link to={`/subscribers/edit/${subscriber.id}`} class="btn btn-primary">
                        <i className="fas fa-pencil-alt"></i> {''}
                        Editar
                    </Link>
                </div>
            </div>
            <hr className=" w-100" />

            <div className="col-12 m-1 shadow p-3 mb-5 bg-white rounded">
                <h2 className="mb-4">
                    {subscriber.name} {subscriber.surname}
                </h2>
                <p>
                    <span className="font-weight-bold">
                        Carrera:
                    </span> {''}
                    {subscriber.career}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Código:
                    </span> {''}
                    {subscriber.code}
                </p>
            </div>

         </div>
    );
}
 
ShowSubscriber.propTypes = {
    firestore : PropTypes.object.isRequired
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
)(ShowSubscriber);