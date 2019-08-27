import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewSubscriber extends Component {
    state = { 
        name: '',
        surname: '',
        career: '',
        code: ''
     }

     //metodo que extrae los valores y lo actualiza en el state
    render() { 
        return ( 
           <div className="row">
               <div className="col-12 mb-4">
                    <Link to={'/subscribers'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
               </div>
               <div className="col-12">
                   <h2>
                       <i className="fas fa-user-plus"></i> {''}
                       Nuevo Suscriptor
                   </h2>

                   <div className="row justify-content-center">
                        <div className="col-md-8 mt-5 shadow p-3 mb-5 bg-white rounded">
                            <form>
                                <div className="form-group">
                                    <label className="font-weight-bold" >Nombre: </label>
                                    <input type="text" className="form-control" name="name" placeholder="Nombre del Suscriptor" reqired 
                                           onChange={this.readDate}
                                           value={this.state.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Apellido: </label>
                                    <input type="text" className="form-control" name="surname" placeholder="Apellido del Suscriptor" reqired 
                                           onChange={this.readDate}
                                           value={this.state.surname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Carrera: </label>
                                    <input type="text" className="form-control" name="career" placeholder="Carrera del Suscriptor" reqired 
                                           onChange={this.readDate}
                                           value={this.state.career}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Codigo: </label>
                                    <input type="text" className="form-control" name="nacodeme" placeholder="Codigo del Suscriptor" reqired 
                                           onChange={this.readDate}
                                           value={this.state.code}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Agregar Subscriptor"
                                    className="btn btn-success "
                                />
                            </form>
                        </div>
                   </div>
               </div>
           </div>
         );
    }
}
 
export default NewSubscriber;