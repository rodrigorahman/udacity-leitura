import React from "react";
import "./loading.component.css";

import PropTypes from 'prop-types';

const LoadingComponent = (props) => {
  return props.show && (
    <div id="myModal" className="modalLoading">
      <div
        className="lds-css ng-scope centralizado"
        style={{
          width: '200px', 
          height: '200px'
        }}>
        <div style={{width:'100%',height:'100%'}} className="lds-eclipse">
          <div />
        </div>
      </div>
      <div className="centralizado text">Carregando!</div>
    </div>
  );
} 

LoadingComponent.propTypes = {
  show: PropTypes.bool.isRequired
}

export default LoadingComponent;