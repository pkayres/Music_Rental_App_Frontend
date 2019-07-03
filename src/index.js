import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux'



const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>, document.getElementById('root'));
