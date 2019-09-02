import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Books = ({books, firestore}) => {

    if(!books) return <Spinner />

    //metodo para eliminar libros
    const deleteBooks = id => {
        firestore.delete({
            collection : 'books',
            doc : id
        })
    }

    return ( 
       <div className="row">
           <div className="col-12  mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                    <div className="col-md-10 ml-3">
                        <h2>
                            <i className="fas fa-book mr-2"></i>
                            Books
                        </h2>
                    </div>
                    <div className="col-md-2 px-3">
                        <Link to="/books/new" className="btn btn-new-color">
                           <i class="fas fa-book-medical"></i> {''}
                            New Book
                        </Link>
                    </div>
            </div> 

            <table className="table table-striped tabel-bg mt-4">
                <thead className="text-center thead-bg">
                    <tr>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existence</th>
                        <th>Avilable</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.ISBN}</td>
                            <td>{book.editorial}</td>
                            <td>{book.existence}</td>
                            <td>{book.existence - book.lend.length}</td>
                            <td className="d-flex justify-content-center">
                                    <Link
                                        to={`/books/show/${book.id}`}
                                        className="btn btn-more mr-1"
                                    >
                                        <i className="fas fa-angle-double-right"></i>{" "}
                                        More Info
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-delete px-3"
                                        onClick={ () => deleteBooks(book.id)}
                                        
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
Books.propTyoes = {
    firestore : PropTypes.object.isRquired,
    books : PropTypes.array
}
export default compose(
    firestoreConnect([{ collection : 'books' }]),
    connect((state, props) => ({
        books : state.firestore.ordered.books
    }))
)(Books);