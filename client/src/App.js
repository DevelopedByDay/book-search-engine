import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// lesson 21 demonstrates importing apollo before other files within the application 

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// create apollo constant
const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  uri: '/graphql',
})

// must wrap return with Apollo Provider
function App() {
  return (
  <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  </ApolloProvider>
  );
}

export default App;
