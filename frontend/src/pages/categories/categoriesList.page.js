import React, { Component } from "react";

import CategoryComponent from './category.component';

class CategoriesListPage extends Component {
  render() {
    return (
      <div>
        <CategoryComponent {...this.props} history={this.props.history}/>
      </div>
    );
  }
}

export default CategoriesListPage;
