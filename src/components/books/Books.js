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
           <div className="col-12 mb-4">
               <Link to="books/new" className="btn btn-success">
                   <i className="fas fa-plus"></i> {''}
                   Nuevo Libro
               </Link>
           </div>
           <div className="col-md-8">
               <h2>
                   <i className="fas fa-book"></i> {''}
                   Libros
               </h2>
           </div>

            <table className="table table-striped mt-4">
                <thead className="text-light text-center bg-primary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencia</th>
                        <th>Disponible</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <th>{book.title}</th>
                            <th>{book.ISBN}</th>
                            <th>{book.editorial}</th>
                            <th>{book.existence}</th>
                            <th>{book.existence - book.lend.length}</th>
                            <td className="d-flex justify-content-center">
                                    <Link
                                        to={`/books/show/${book.id}`}
                                        className="btn btn-success mr-2"
                                    >
                                        <i className="fas fa-angle-double-right"></i>{" "}
                                        Más Detalles
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger "
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