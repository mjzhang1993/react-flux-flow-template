// @flow

/*
   Root, Router 配置
*/
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import App from '../containers/App';
import Home from '../containers/Home';
import Test from '../containers/Test';
import Login from '../containers/Login';

const Root = () => (
   <div>
      <Switch>
         <Route path="/login" component={Login}/>
         <Route
            path="/"
            render={props => (
               <App>
                  <Switch>
                     <Route path="/" exact component={Home} />
                     <Route path="/home" component={Home} />
                     <Route path="/test" component={Test} />
                     <Route render={() => <Redirect to="/" />} />
                  </Switch>
               </App>
            )}
         />
         <Route render={() => <Redirect to="/" />} />
      </Switch>
   </div>
);

export default hot(module)(Root);
