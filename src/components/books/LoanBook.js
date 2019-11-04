import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

import SubscriberTab from '../subscribers/SubscriberTab';

//Redux Action
import { searchUser } from '../../actions/searchUserActions';


class LoanBook extends Component {
    state = { 
        noResults : false,
        search : '',
     }

    //search subscriber by code
    searchSubs = e => {
        e.preventDefault();

        //get the value to look for 
        const { search } = this.state;

        //extrac firestore
        const { firestore, searchUser } = this.props;

        //make inquiry
        const collection = firestore.collection('subscribers');
        const query = collection.where("code", "==", search).get();

        //read the results
        query.then(result => {
            if(result.empty) {
                //no results

                //store an empty object in redux
                searchUser({})

                //update the state container if there is a result
                this.setState({
                    noResults: true,
                });
            } else {
                //if there are results

                //place the result in the redux state
                const data = result.docs[0];
                searchUser(data.data());

                //update the state container if there is a result
                this.setState({
                    noResults: false,
                })             
            }
        })
    }


    //store the student data to request the book 
    applyLoan = () => {
        const { user } = this.props;

        //discharge date
        user.discharge_date = new Date().toLocaleDateString();

        //you can.t mutate the props take a copy and create a new arrangement
        let borrowed = [];
        borrowed = [...this.props.book.lend, user];

        //copy the Objet and add borrowed 
        const book = {...this.props.book};

        //remobe previous borrowed
        delete book.lend;

        //allocate loans
        book.lend = borrowed;

        //extract firestore
        const { firestore, history } = this.props;

        //store in the BD
        firestore.update({
            collection: 'books',
            doc: book.id
        }, book ).then(history.push('/'));
    }

    //Store the code in the state
    readDate = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 

        //extract the book
        const { book } = this.props;

        //show the spinner
        if(!book) return <Spinner />

        //extrac student data
        const { user } = this.props;

        let subscriberTab, btnApply;
        if(user.name) {
            subscriberTab = <SubscriberTab 
                                subscriber={user}
                            />
            btnApply = <button
                            type="button"
                            className="btn btn-secondary btn-block mb-5"
                            onClick={this.applyLoan}
                        >Apply for a Loan</button>                
        } else {
            subscriberTab = null;
            btnApply = null;
        }

        //mostrar un mensaje de error
        const { noResults } = this.state;

        let mensajeResultado = '';
        if(noResults){
            mensajeResultado = <div className="alert alert-danger">No hay resultados con este codigo</div>
        } else{
            mensajeResultado = null;
        }


        return ( 
            <div className="row">
                 <div className="col-12  mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                    <div className="col-md-10 ml-3">
                        <h2>
                            <i className="fas fa-book"></i> {''}
                            Apply for a loan: {book.title}
                        </h2>
                    </div>
                    <div className="col-md-2 px-2">
                        <Link to="/" className="btn btn-secondary">  
                            <i className="fas fa-arrow-circle-left"></i> {''}
                            Go to List
                        </Link>
                    </div>
                </div> 
                <div className="row col-12 justify-content-center mt-5">
                    <div className="col-md-8">
                        <form 
                            onSubmit={this.searchSubs}
                            className="shadow p-3 mb-5 bg-white rounded"
                        >
                            <legend className="text-center">
                                <h2>Search the subscriber by Code</h2>
                            </legend>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control"
                                    onChange={this.readDate}
                                />
                                <input type="submit" className="btn btn-success btn-block mt-3" value="Search Subscriber"/>
                            </div>
                        </form>

                        {/**show the student file and the button to apply for the loan */}
                        {subscriberTab}
                        {btnApply}

                         {/**muestra un mensaje de no resultados*/}
                         {mensajeResultado}

                    </div>
                </div>

            </div>
         );
    }
}
 
LoanBook.propTypes = {
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
    connect(({ firestore: { ordered }, user}, props) => ({
        book : ordered.book && ordered.book[0],
        user: user
    }), { searchUser })
)(LoanBook);