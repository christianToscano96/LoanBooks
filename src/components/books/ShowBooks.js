import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class ShowBooks extends Component {

    //return book method
    returnBook = id => {
        //extract firestore
        const { firestore } = this.props;

        //book copy and make a copy of the original state
        const updateBook = {...this.props.book};

        //delete the person who is making the return of the borrowed book
        const borrowed = updateBook.lend.filter(element => element.code !== id);
        updateBook.lend = borrowed; 

        //update firebase 
        firestore.update({
            collection: 'books',
            doc: updateBook.id
        }, updateBook)
    }
   
    render() {
            
        //extract the book
        const { book } =this.props

        if(!book) return <Spinner />

        //button to resquest a book
        let btnLend;

        if(book.existence - book.lend.length > 0 ) {
            btnLend = <Link to={`/books/loan/${book.id}`}
                            className="btn btn-success my-3">
                             Apply for a loan   
                      </Link>
        }
        
        
        return ( 
            <div className="row">
               <div className="col-12 ml-2 mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                    <div className="col-md-10">
                        <Link to="/" className="btn btn-secondary">  
                            <i className="fas fa-arrow-circle-left"></i> {''}
                            Go to List
                        </Link>
                    </div>
                    <div className="col-md-2 ">
                        <Link to={`/books/edit/${book.id}`} className="btn btn-success px-4 ">
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
                        </span> {' '}
                        {book.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Editorial:
                        </span> {' '}
                        {book.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Existence:
                        </span> {' '}
                        {book.existence}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Avilable:
                        </span> {' '}
                        {book.existence - book.lend.length }
                    </p>
                    {/*//button to resquest a book */}
                    { btnLend }

                    {/**show people who have books */}
                    <h3 className="my-2">Subscriber who has borrewed book</h3>
                    {book.lend.map(lend => (
                        <div key={lend.code} className="card my-2 mt-3">
                            <h4 className="card-header">
                                {lend.name} {lend.surname}
                            </h4>
                            <div className="card-body ">
                                <p>
                                    <span className="font-weight-bold">
                                        Code:
                                    </span> {' '}
                                    {lend.code}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        career:
                                    </span> {' '}
                                    {lend.career}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Code:
                                    </span> {' '}
                                    {lend.discharge_date}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary font-wight-bold"
                                    onClick={() => this.returnBook(lend.code)}
                                >
                                    Book Return
                                </button>
                            </div>
                        </div>
                    ))}
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