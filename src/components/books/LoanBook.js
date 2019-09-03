import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class LoanBook extends Component {
    state = { 
        noResults : false,
        search : '',
        result : {}
     }

    //search subscriber by code
    searchSubs = e => {
        e.preventDefault();

        //get the value to look for 
        const { search } = this.state;

        //extrac firestore
        const { firestore } = this.props;

        //make inquiry
        const collection = firestore.collection('subscribers');
        const query = collection.where("code", "==", search).get();

        //read the results
        query.then(result => {
            if(result.empty) {
                //no results
                this.setState({
                    noResults: true,
                    result: {}
                })

            } else {
                //if there are results
                const data = result.docs[0];
                this.setState({
                    result : data.data(),
                    noResults: false,
                })
                
            }
        })
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
    connect(({ firestore: { ordered }}, props) => ({
        book : ordered.book && ordered.book[0]
    }))
)(LoanBook);