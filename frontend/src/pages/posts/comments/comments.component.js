import React, { Component } from "react";

import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { saveComment, voteScoreComment, removeComment } from "../api/posts.service";

import { addComment, updateComment, removeComment as removeCommentAction } from "../actions/posts.actions";
import { updateMessage } from '../../../core/actions/core.actions';

import sortBy from "sort-by";

import { Form, Text, Textarea } from 'react-form';

import ConfirmationComponent from '../../../core/confirmation/confirmation.component';

class CommentsComponent extends Component {
  state = {
    modal: false,
    commentForm: {
      id: '',
      author: '',
      comment: ''
    },
    confirmModal: false
  };

  hideModalConfirm = () => this.setState({confirmModal:false});
  
  showModalConfirm = (c) => this.setState({confirmModal:true, comment: c});

  saveComment = (formValues) => {
    const form = formValues;
    form.id = this.state.commentForm.id

    saveComment(form, this.props.post).then(res => {
      if(!this.state.commentForm.id){
        this.props.addComment({
          post: this.props.post,
          comment: res
        });
      } else {
        this.props.updateComment({
          post: this.props.post,
          comment: res
        })
      }
      this.props.sendMessage({message:'Comment saved'});
    });

    this.closeOpenModal();
  };

  closeOpenModal = () => {
    this.setState(oldState => ({
      modal: !oldState.modal
    }));
  };

  editComment = (comment) => {
    this.setState({
      commentForm: {
        id: comment.id,
        author: comment.author,
        comment: comment.body
      }
    })
    this.closeOpenModal();
  }

  voteComment = (voteType, comment) => {
    voteScoreComment(voteType,comment).then(res => {
      this.props.updateComment({
        post: this.props.post,
        comment: res
      });
    });
  }
  removeComment = () => {
    removeComment(this.state.comment).then(res => {
      this.props.removeComment({
        post: this.props.post,
        comment: this.state.comment
      });
      this.props.sendMessage({message:'Comment removed'});
      this.hideModalConfirm();
    })
  }

  render() {
    const { comments } = this.props.post;
    return (
      <div>
        <div className="row">
          <div className="col">
            <h3>Comments </h3>
          </div>
          <div className="col md-12 d-flex justify-content-end align-items-end">
            <button
              className="btn btn-outline-success"
              onClick={this.closeOpenModal}
            >
              New Comment
            </button>
          </div>
        </div>

        <div className="clearfix">&nbsp;</div>
        <div className="row">
          <div className="col">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th width="70%">Comment</th>
                  <th className="text-center" width="5%">
                    Author
                  </th>
                  <th className="text-center" width="5%">
                    voteScore
                  </th>
                  <th className="text-center" width="15%">
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {comments &&
                  comments.map(c => {
                    return (
                      <tr key={c.id} className="mouseHands">
                        <td>{c.body}</td>
                        <td className="text-center">{c.author}</td>
                        <td className="text-center">{c.voteScore}</td>
                        <td className="text-center">
                          <a onClick={() => this.voteComment('upVote', c)}>
                            <img alt='Like' src="/like.png" width="30" />
                          </a>&nbsp;
                          <a onClick={() => this.voteComment('downVote', c)}>
                            <img alt='Dislike' src="/dislike.png" width="30" />
                          </a>&nbsp;
                          <a onClick={() => this.editComment(c)}>
                            <i className="material-icons md-18">modeedit</i>
                          </a>&nbsp;
                          <a onClick={() => this.showModalConfirm(c)}>
                            <i className="material-icons md-18">delete</i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={this.state.modal}>
          <Form
            onSubmit={(values) => {
                this.saveComment(values);
              }
            }
            defaultValues={{
              author: this.state.commentForm.author,
              comment: this.state.commentForm.comment
            }}
            validate={values => {
              const { author, comment } = values
              return {
                author: !author ? 'a name is required' : undefined,
                comment: !comment ? 'A comment is required' : undefined
              }
            }}
          >
          {({submitForm}) => {
            return (
              <form id="formNewComment" onSubmit={submitForm} method="post">
                <ModalHeader>Comment</ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label>Name</label>
                    <Text
                      className='form-control'
                      placeholder='Enter name'
                      field='author'
                    />
                  </div>
                  <div className="form-group">
                    <label>Comment</label>
                    <Textarea
                      className='form-control'
                      field='comment'
                      rows='10'
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.closeOpenModal()}
                  >
                    Close
                  </button>
                  <button className="btn btn-primary">Save</button>
                </ModalFooter>
              </form>
            )}}
          </Form>
        </Modal>
        {<ConfirmationComponent modal={this.state.confirmModal} title='Confirmar' msg='Confirma a Exclusão? ' yes={() => this.removeComment()} no={this.hideModalConfirm} />}
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => {
  if(post.comments)
    post.comments.sort(sortBy('-voteScore'))

  return {
    post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: data => dispatch(addComment(data)),
    updateComment: data => dispatch(updateComment(data)),
    removeComment: data => dispatch(removeCommentAction(data)),
    sendMessage: data => dispatch(updateMessage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComponent);