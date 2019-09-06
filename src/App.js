import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

//components Books
import Books from './components/books/Books';
import EditBooks from './components/books/EditBooks';
import NewBooks from './components/books/NewBooks';
import ShowBooks from './components/books/ShowBooks';
import LoanBook from './components/books/LoanBook';

//auth
import Login from './components/auth/Login';

//components Subscribers
import Subscribers from './components/subscribers/Subscribers';
import EditSubscriber from './components/subscribers/EditSubscriber';
import NewSubscriber from './components/subscribers/NewSubscriber';
import ShowSubscriber from './components/subscribers/ShowSubscriber';
import Navbar from './components/layout/Navbar';


import { UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth';

function App() {
  return (
     <Provider store={store}>
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={UserIsAuthenticated(Books)} />
              <Route exact path="/books/new" component={(NewBooks)} />
              <Route exact path="/books/show/:id" component={UserIsAuthenticated(ShowBooks)} />
              <Route exact path="/books/edit/:id" component={UserIsAuthenticated(EditBooks)} />
              <Route exact path="/books/loan/:id" component={UserIsAuthenticated(LoanBook)} />

              
              <Route exact path="/subscribers" component={UserIsAuthenticated(Subscribers)} />
              <Route exact path="/subscribers/new" component={UserIsAuthenticated(NewSubscriber)} />
              <Route exact path="/subscribers/show/:id" component={UserIsAuthenticated(ShowSubscriber)} />
              <Route exact path="/subscribers/edit/:id" component={UserIsAuthenticated(EditSubscriber)} />  

              <Route exact path="/login" component={Login} />  
             
            </Switch>
          </div>
        </Router> 
     </Provider>
  );
}

export default App;
