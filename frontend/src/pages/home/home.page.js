import React, { Component } from "react";

import CategoryComponent from "../categories/category.component";
import MessageComponent from '../../core/messages/messages.component';

class HomePage extends Component {
  render() {
   
    return (
      <div>
        <MessageComponent />
        <CategoryComponent {...this.props} />
        <div className="row">&nbsp;</div>
      </div>
    );
  }
}
export default HomePage;
