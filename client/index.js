import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {Router,Route,hashHistory, IndexRoute} from 'react-router';
import App from './component/App';
import LoginForm from './component/auth/LoginForm';
import SignupForm from './component/auth/SignupForm';
import Dashboard from './component/Dashboard';
import requireAuth from './component/auth/requireAuth';

const networkInterface = new createNetworkInterface({
  uri: '/graphql',
  opts:{credentials : 'same-origin'}
});
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
     <Router history={hashHistory}>
       <Route path="/" component={App}>
        <Route path="login" component={LoginForm}></Route>
        <Route path="signup" component={SignupForm}></Route>
         <Route path="dashboard" component={requireAuth(Dashboard)}></Route> 
        {/* <Route path="dashboard" component={Dashboard}></Route> */}
       </Route>
     </Router> 
     </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
