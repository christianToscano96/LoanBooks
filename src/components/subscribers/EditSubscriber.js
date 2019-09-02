import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditSubscriber extends Component {

    //crear los ref
    nameInput = React.createRef();
    surnameInput = React.createRef();
    codeInput = React.createRef();
    careerInput = React.createRef();

    //metodo para editar 
    editSubscriber = e => {
        e.preventDefault();

        //crear el objeto que va a actualizar
        const subscriberUpdate = {
            name : this.nameInput.current.value,
            surname : this.surnameInput.current.value,
            carrer : this.careerInput.current.value,
            code : this.codeInput.current.value
        }
        //console.log(subscriberUpdate);

        //extraer firestore, y history de props
        const { subscriber, firestore, history } = this.props;

        //almacenar en la base de datos con firestore
        firestore.update({
            collection : 'subscribers',
            doc : subscriber.id
        }, subscriberUpdate).then(history.push('/subscribers'));
    }

        
    render() { 

        const { subscriber }  = this.props;

        if(!subscriber) return <Spinner />

        return (
            <div className="row">
                <div className="col-12  mb-4 d-flex justify-content-center justify-content-sm-center justify-content-md-center align-items-center ">
                    <div className="col-md-10 ml-3">
                        <h2>
                            <i className="fas fa-user"></i> {''}
                            Edit Subscriber
                        </h2>
                    </div>
                    <div className="col-md-2 px-2">
                        <Link to={'/subscribers'} className="btn btn-secondary">
                            <i className="fas fa-arrow-circle-left"></i> {''}
                            Go to List
                        </Link>
                    </div>
                 </div> 
                
                <div className="col-12">
                    

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5 shadow p-3 mb-5 bg-white rounded">
                            <form
                                onSubmit={this.editSubscriber}
                            >
                                <div className="form-group">
                                    <label className="font-weight-bold" >Name: </label>
                                    <input type="text" className="form-control" name="name"  placeholder="Subscriber's Name" reqired="true" 
                                            ref={this.nameInput}
                                            defaultValue={subscriber.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Surname: </label>
                                    <input type="text" className="form-control" name="surname" placeholder="Subscriber's Surname" reqired="true" 
                                             ref={this.surnameInput}
                                            defaultValue={subscriber.surname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Career: </label>
                                    <input type="text" className="form-control" name="career" placeholder="Subscribe Career" reqired="true"
                                            ref={this.careerInput}
                                            defaultValue={subscriber.career}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Code: </label>
                                    <input type="text" className="form-control" name="code" placeholder="Subscribe Code" reqired="true"
                                             ref={this.codeInput}
                                            defaultValue={subscriber.code}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Edit Subscriber"
                                    className="btn btn-success col-lg-6 "
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
EditSubscriber.propTypes = {
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
)(EditSubscriber);