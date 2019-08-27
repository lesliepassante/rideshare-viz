import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers';
import App from 'containers/App';
import 'bootstrap/dist/css/bootstrap.css';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const root = document.createElement('main');
root.id = 'app';
document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
