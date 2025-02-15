import { createStore, applyMiddleware, compose } from 'redux';
import mainRedux from './Services/Redux/index.js';
import {thunk} from 'redux-thunk';  

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  mainRedux,
  composeEnhancers(applyMiddleware(thunk)) 
);

export default store;


