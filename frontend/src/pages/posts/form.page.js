import React, { Component } from "react";
import { connect } from 'react-redux';
import Utils from "../../utils/utils";
import { getPostById, savePost } from '../posts/api/posts.service';
import { getAll } from '../categories/api/category.service';
import LoadingComponent from '../../core/loading/loading.component';
import moment from 'moment';
import { updateMessage } from '../../core/actions/core.actions';

import { Form, Select, Text, Textarea } from 'react-form';

class PostFormPageComponent extends Component {

  state = {
    loading: false,
    categories : [],
    form: {
      id: '',
      title: '',
      category: '',
      author: '',
      body: '',
      createTo: '',
    }
  };

  componentWillMount = () => {
    
    this.showLoading();
    getAll().then(cats => this.setState({categories: cats}))

    if(this.props.typeForm === 'edit'){
      const { id } = this.props.match.params;
      getPostById(id).then(res => {
  
        const { voteScore, title, category, body, author, timestamp } = res;
        this.setState({
          voteScore: voteScore,
          form: {
            id: id,
            title: title,
            category: category,
            body: body,
            author: author,
            createTo: moment(timestamp).format("DD/MM/YYYY"),
          }
        });
        this.hideLoading();
      });
    } else {
      const { category } = this.props.match.params;
      this.setState({
        form: {
          category
        }
      })
      this.hideLoading();
    }
    
  }

  saveComment = (values) => {
    let { category, title, author, body} = values;

    const post = {
      id: this.state.form.id,
      category,
      title,
      author,
      body
    };

    savePost(post).then(res => {
      this.hideLoading()
      this.props.sendMessage({message:'Post Saved'});
      this.props.history.push('/');
    });
    
  };

  showLoading = () => this.setState({loading: true});
  hideLoading = () => this.setState({loading: false});


  render() {
    const { typeForm } = this.props;
    const { voteScore, form } = this.state
    const { id, title, category, body, author, createTo } = form;
    return (
      <div className="container-fluid">
        <div className="col">
          <h2>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <h3>Post</h3>
                </div>
                {Utils.checkParams(this, "props.match.params.id") && (
                  <div className="col d-flex justify-content-end">
                    <button type="button" className="btn btn-light ">
                      VoteScore: <span className="badge badge-primary ">{voteScore}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </h2>
          <Form
            onSubmit={(values) => {
                this.showLoading();
                this.saveComment(values);
              }
            }
            defaultValues={{
              title,
              postID: id,
              category,
              body,
              author
            }}
            validate={values => {
              const { title, category, body, author } = values
              return {
                title: !title ? 'A title is required' : undefined,
                category: !category ? 'A category is required' : undefined,
                body: !body ? 'A body is required' : undefined,
                author: !author ? 'A author is required' : undefined
              }
            }}
          >
          {({submitForm, values, addValue, removeValue}) => {
            return (
              <form onSubmit={submitForm}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="category">Category</label>
                    <Select
                      className="form-control"
                      field='category'
                      disabled={true}
                      options={this.state.categories.map(c => {
                        return {
                          label: c.name.toUpperCase(),
                          value: c.name
                        }
                      })}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="title" className="col-form-label">
                      Title
                    </label>
                    <Text 
                      className="form-control"
                      field='title'
                      placeholder='Title'
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="body" className="col-form-label">
                      Body
                    </label>
                    <Textarea
                      className="form-control"
                      field='body'
                      placeholder='body'
                      rows="15"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="author" className="col-form-label">
                    Author
                  </label>
                  <Text 
                      disabled={(typeForm === 'edit' ? true : false)}
                      className="form-control"
                      field='author'
                      placeholder='Author'
                    />                  
                </div>
                {Utils.checkParams(this, "props.match.params.id") && (
                  <div className="form-group">
                    <label htmlFor="create_to" className="col-form-label">
                      Create To:
                    </label>
                    <button
                      type="button"
                      className="form-control btn btn-outline-secondary"
                      disabled={(typeForm === 'edit' ? true : false)}
                    >
                      {createTo}
                    </button>
                  </div>
                )}
                <div className="form-group ">
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-lg  btn-primary " onClick={this.props.history.goBack}>
                      Go back
                    </button>&nbsp;
                    <button type="submit" className="btn btn-lg  btn-success ">
                      Salvar
                    </button>
                  </div>
                </div>
              </form>
            )
          }}
          </Form>
        </div>
        <LoadingComponent show={this.state.loading} />
      </div>
    );
  }
}


const mapStateToProps = ({post, id}) => {
  return {}
};
  
const mapDispatchToProps = dispatch => {
  return {
    sendMessage: data => dispatch(updateMessage(data))
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(PostFormPageComponent);
