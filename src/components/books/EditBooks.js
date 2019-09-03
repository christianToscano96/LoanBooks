import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditBooks extends Component {
    
    //crate refs
    titleInput = React.createRef();
    isbnInput = React.createRef();
    editorialInput =  React.createRef();
    existenceInput = React.createRef();

    //edit method
    editBook = e => {
        e.preventDefault();

        //create the objetc to be updated
        const bookUpdate = {
            title : this.titleInput.current.value,
            ISBN : this.isbnInput.current.value,
            editorial : this.editorialInput.current.value,
            existence : this.existenceInput.current.value
        }

        //extract firestore, history and props
        const { book, firestore, history } = this.props;

        //store in the database with firestore
        firestore.update({
            collection : 'books',
            doc : book.id
        }, bookUpdate).then(history.push('/'));
    }

    render() { 
        const { book } = this.props; 

        if(!book ) return <Spinner />


        return ( 
           <div className="row">
               <div className="col-12  mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                    <div className="col-md-10 ml-3">
                        <h2>
                            <i className="fas fa-book"></i> {''}
                            Edit Book
                        </h2> 
                    </div>
                    <div className="col-md-2 px-3">
                        <Link to="/" className="btn btn-secondary">
                            <i className="fas fa-arrow-circle-left"></i> {''}
                            Go to List
                        </Link>
                    </div>
                </div> 
                <div className="col-12">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5 shadow p-3 mb-5 bg-white rouded">
                            <form 
                             onSubmit={this.editBook}
                            >
                                <div className="form-group">
                                    <label className="font-weight-bold">Title:</label>
                                        <input type="text" className="form-control" name="title" placeholder="Title or Name of the book" reqired="true"
                                            ref={this.titleInput}
                                            defaultValue={book.title}
                                        />                                   
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">ISBN:</label>
                                        <input type="text" className="form-control" name="ISBN" placeholder="Code ISBN" reqired="true"
                                            ref={this.isbnInput}
                                            defaultValue={book.ISBN}
                                        />                                   
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Editorial:</label>
                                        <input type="text" className="form-control" name="editorial" placeholder="Editorial of the book" reqired="true"
                                            ref={this.editorialInput}
                                            defaultValue={book.editorial}
                                        />                                   
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Existence:</label>
                                        <input type="text" className="form-control" name="existence" placeholder="Quntity in stock" reqired="true"
                                            ref={this.existenceInput}
                                            defaultValue={book.existence}
                                        />                                   
                                </div>
                                <input 
                                    type="submit"
                                    value="Edit Book"
                                    className="btn btn-success col-lg-6"
                                />
                            </form>
                        </div>
                    </div>   
                </div>
           </div>
         );
    }
}
EditBooks.propTypes = {
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
)(EditBooks);
 
