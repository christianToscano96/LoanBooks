import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class ShowBooks extends Component {
    state = {  }
    render() {
        
        //extraer el libro
        const { book } =this.props

        if(!book) return <Spinner />


        return ( 
            <div className="row">
               <div className="col-12  mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                    <div className="col-md-10 ml-3">
                        <Link to="/" className="btn btn-secondary">  
                            <i className="fas fa-arrow-circle-left"></i> {''}
                            Go to List
                        </Link>
                    </div>
                    <div className="col-md-2 px-3">
                        <Link to={`/books/edit/${book.id}`} className="btn btn-primary">
                            <i className="fas fa-pencil-alt"></i> {''}
                            Edit
                        </Link>
                    </div>
                </div> 

            <hr className="w-100"/>

            <div className="col-md-8 mt-5 shadow p-3 mb-5 bg-white rounded centerCaja">
                <h2 className="mb-4 mt-4">
                    {book.title} 
                </h2>
                <p>
                    <span className="font-weight-bold">
                        ISBN:
                    </span> {''}
                    {book.ISBN}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Editorial:
                    </span> {''}
                    {book.editorial}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Existence:
                    </span> {''}
                    {book.existence}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Lend:
                    </span> {''}
                    {book.lend}
                </p>
            </div>

            </div>
         );
    }
}
 
ShowBooks.propTypes = {
    firestore : PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {
            collection : 'books',
            storeAs : 'book',
            doc :  props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered }}, props) => ({
        book : ordered.book && ordered.book[0]
    }))
)(ShowBooks);