import React, { Component } from "react";
import "./loading.component.css";

import PropTypes from 'prop-types';

class LoadingComponent extends Component {
  
  static propTypes = {
    show: PropTypes.bool.isRequired
  }
  
  render() {
    return (
      this.props.show && (
        <div id="myModal" className="modalLoading">
          <div
            className="lds-css ng-scope centralizado"
            style={{
              width: '200px', 
              height: '200px',
            }}>
            <div style={{width:'100%',height:'100%'}} className="lds-eclipse">
              <div />
            </div>
          </div>
          <div className="centralizado text">Carregando!</div>
        </div>
      )
    );
  }
}

export default LoadingComponent;