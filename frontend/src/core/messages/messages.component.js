import React from "react";
import { connect } from "react-redux";
import Utils from "../../utils/utils";
import { updateMessage } from "../actions/core.actions";

export class MessageComponent extends React.Component {
  componentDidUpdate() {
    const { hideTimeout, message, sendMessage } = this.props;
    if(hideTimeout && message.text){
      setTimeout(() => {
          sendMessage({ message: null });
        }, hideTimeout);
    }
  }

  componentWillUnmount(){
    this.props.sendMessage({ message: null });
  }
  
  render() {
    return (
      <div>
        {Utils.checkParams(this, "props.message.text") && (
          <div className="alert alert-primary" role="alert">
            {this.props.message.text}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ message }) => {
  return {
    message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: data => dispatch(updateMessage(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageComponent);
