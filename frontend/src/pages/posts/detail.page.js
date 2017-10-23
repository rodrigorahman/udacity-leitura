import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStorePost, clearPostPageStore } from './actions/posts.actions';
import { getPostDetail, removePost, voteScorePost } from './api/posts.service';
import LoadingComponent from '../../core/loading/loading.component';
import CommentsComponent from './comments/comments.component';
import ConfirmationComponent from '../../core/confirmation/confirmation.component';
import MessageComponent from '../../core/messages/messages.component';
import { updateMessage } from '../../core/actions/core.actions';

import PropTypes from 'prop-types';

import moment from "moment";

class PostsDetailPageComponent extends Component {
  
  static propTypes = {
    post : PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

  }

  state = {
    loading: false,
    confirmModal: false
  };

  componentDidMount = () => {
    
    let { updateStorePost } = this.props;

    this.showLoading();

    getPostDetail(this.props.match.params.id).then(post => {
      
      updateStorePost(post);

      this.hideLoading();
    }).catch((err) => {
      console.error("Erro ao buscar post", err);
      this.hideLoading();
    });
    
    
  }
  
  removePost = () => {

    const { post, sendMessage, history } = this.props;

    this.setState({confirmModal:false});
    removePost(post.id)
      .then(res => {
        console.log(res);
        history.push('/');
        sendMessage({message:'Post removed'});
      })
      .catch(error => {
        console.log(error);
        this.hideModalConfirm();
      })
  }

  hideModalConfirm = () => this.setState({confirmModal:false});
  showModalConfirm = () => this.setState({confirmModal:true});
  
  hideLoading = () => this.setState({loading:false});
  showLoading = () => this.setState({loading:true});

  votePost = (type) => {
    this.showLoading();
    const { post, sendMessage, updateStorePost} = this.props;
    voteScorePost(type, post).then(res => {

      const data = {
        post: res,
        comments: post.comments
      };

      updateStorePost(data);
      this.hideLoading();
      sendMessage({message:'VoteScore updated'});
    })
    
  }

  render() {
    const { history, post} = this.props;
    const { id, title, voteScore, timestamp, body, author } = post
    
    return (
      <div className="container-fluid">
        <MessageComponent hideTimeout={4000}/>
        <div className="row">
          <div className="col-8">
            <h3>
              {title} &nbsp;
              <button type="button" className="btn btn-light ">
                VoteScore: <span className="badge badge-primary ">{voteScore}</span>
              </button>
            </h3>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-end">
            ({moment(timestamp).format("DD/MM/YYYY")})
          </div>
        </div>
        <div className="row">
          <hr width="100%" />
        </div>
        <div className="row">&nbsp;</div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <blockquote className="blockquote">
              <p className="mb-0">
                {body}
              </p>
              <footer className="blockquote-footer text-right">
                Written by:{" "}
                <cite title="Source Title">
                  {author}
                </cite>
              </footer>
            </blockquote>
          </div>
          <div className='container-fluid'>
            <div className="row">
              <div className="col">
                <a href='#' onClick={() => this.votePost('upVote')}><img alt='Like' src="/like.png" width="80" /></a>
                <a href='#' onClick={() => this.votePost('downVote')}><img alt='Like' src="/dislike.png" width="80"/></a>
              </div>
              <div className='col'>
                <div className="d-flex justify-content-end align-items-end">
                  <button
                    className="btn btn-md btn-primary"
                    onClick={() => history.push(`/post/alter/${id}`)}
                  >
                    Edit
                  </button>{" "}
                  &nbsp;
                  <button className="btn btn-md btn-danger" onClick={this.showModalConfirm}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <hr width="100%" />
        </div>

        <CommentsComponent />

        <div className="row d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-lg  btn-primary "
            onClick={() => {
              history.push("/");
            }}
          >
            Go Back
          </button>&nbsp;
        </div>

        <LoadingComponent show={this.state.loading} />
        <ConfirmationComponent modal={this.state.confirmModal} title='Confirmar' msg='Confirma a Exclusão? ' yes={() => this.removePost()} no={this.hideModalConfirm} />
      </div>
    );
  }
}


const mapStateToProps = ({post, id}) => {
  return {
    post,
    id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStorePost: data => dispatch(updateStorePost(data)),
    clearPostPageStore: data => dispatch(clearPostPageStore(data)),
    sendMessage: data => dispatch(updateMessage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsDetailPageComponent);