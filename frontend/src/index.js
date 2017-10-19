import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./template/Header";
import Content from "./template/Content";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter } from "react-router-dom";

import { createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Reducers
import { categories } from './pages/categories/reducers/categories.reducers';
import { post } from './pages/posts/reducers/posts.reducers';
import { message } from './core/reducers/core.reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    categories,
    post,
    message
  }),
  composeEnhancers()
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container-fluid App">
        <Header />
        <Content store={store}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
