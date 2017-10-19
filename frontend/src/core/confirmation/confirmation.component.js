import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropsType from 'prop-types';


const ConfirmationComponent = props => (
  <Modal isOpen={props.modal}>
      <ModalHeader>{props.title}</ModalHeader>
      <ModalBody>
        <div>{props.msg}</div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.yes()}
        >
          Yes
        </button>
        <button 
          type="button"
          className="btn btn-primary" 
          onClick={() => props.no()}>No</button>
      </ModalFooter>
  </Modal>
);

ConfirmationComponent.propTypes = {
  modal: PropsType.bool.isRequired,
  title: PropsType.string.isRequired,
  msg: PropsType.string.isRequired,
  yes: PropsType.func.isRequired,
  no: PropsType.func.isRequired
}

export default ConfirmationComponent;