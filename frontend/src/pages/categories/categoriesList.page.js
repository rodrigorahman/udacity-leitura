import React, { Component } from "react";

import CategoryComponent from './category.component';

class CategoriesPage extends Component {
  render() {
    return (
      <div>
        <CategoryComponent {...this.props} history={this.props.history}/>
      </div>
    );
  }
}

export default CategoriesPage;
