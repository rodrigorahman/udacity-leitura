import React, { Component } from 'react';
import CategoriesPage from './categoriesList.page';
import { Route } from 'react-router-dom';

class CategoriesRouting extends Component {
  render() {
    return [
      <Route key='home' exact path="/categories/:categoryFilter" render={( props,  history ) => 
        <CategoriesPage history={history} {...props} />} />
    ];
  }
}

export default CategoriesRouting;