import React, { PureComponent } from 'react';
import CategoriesListPage from './categoriesList.page';
import { Route } from 'react-router-dom';

class CategoriesRouting extends PureComponent {
  render() {
    return [
      <Route key='home' exact path="/categories/:categoryFilter" render={( props,  history ) => 
        <CategoriesListPage history={history} {...props} />} />
    ];
  }
}

export default CategoriesRouting;