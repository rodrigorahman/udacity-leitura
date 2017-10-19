import React, { Component } from "react";

import { connect } from "react-redux";
import { getAll } from "./api/category.service";
import { getPostsByCategory } from "../posts/api/posts.service";
import { Link } from "react-router-dom";
import LoadingComponent from "../../core/loading/loading.component";
import { updateCategoryStore } from '../categories/actions/category.actions';

import PropTypes from "prop-types";

import moment from "moment";
import sortBy from "sort-by";
import Utils from "../../utils/utils";

class CategoryComponent extends Component {

  static propTypes = {
    categoryFilter: PropTypes.object,
    history: PropTypes.object.isRequired
  };

  state = {
    loading: false
  };

  componentWillMount() {
    this.setState({
      loading: true
    });

    getAll()
      .then(data => {
        Promise.all(
          data.map(c => {
            
            const categoryFilter = Utils.checkParams(this, "props.match.params.categoryFilter")

            if (categoryFilter) {
              if (categoryFilter !== c.name) {
                return {};
              }
            }

            return getPostsByCategory(c.name).then(posts => {
              c.posts = posts.filter(p => p.deleted === false);
              return c;
            });
          })
        ).then(cats => {
          let categories = Object.assign(
            ...cats.map(c => {
              if (c) {
                return {
                  [c.name]: {
                    categoryName: c.name,
                    posts: c.posts,
                    currentOrderField: null,
                    voteScoreOrder: "DESC",
                    createDateOrder: "DESC"
                  }
                };
              }
              return {};
            })
          );

          this.props.updateCategoryStore({categories});
          this.setState({
            loading: false,
          });
        });
      })
      .catch(e => {
        console.error("erro ao consultar categorias", e);
        this.setState({ loading: false });
      });
  }

  inverterOrder(order, field) {
    let retorno = {
      order: "ASC",
      field
    };

    if (order === "ASC") {
      retorno = {
        order: "DESC",
        field: "-" + field
      };
    }

    return retorno;
  }

  sortBy = ({ voteScoreOrder, createDateOrder, categoryName, posts}, field) => {
    
    let { categories } = this.props;

    let currentOrder = createDateOrder;

    if (field === "voteScore") {
      currentOrder = voteScoreOrder;
    }

    let orderType = this.inverterOrder(currentOrder, field);

    let postsOfCategory = posts;
    postsOfCategory.sort(sortBy(orderType.field));
    let categoriesStore = categories;

    this.props.updateCategoryStore({
      categories: {
        ...categoriesStore,
        [categoryName]: {
          categoryName,
          posts: postsOfCategory,
          currentOrderField: field,
          voteScoreOrder: orderType.order,
          createDateOrder: orderType.order
        }
      }
    });
  };

  render() {
    let categories = Object.keys(this.props.categories);

    return (
      <div>
        {categories
          .filter(c => {
            let check = true;
            if (this.props.categoryFilter) {
              if (this.props.categoryFilter !== c.categoryName) {
                check = false;
              }
            }
            return check;
          })
          .map(c => {
            const category = this.props.categories[c];
            const { currentOrderField, voteScoreOrder, createDateOrder, posts } = category;
            
            return (<div key={c}>
              <div className="row">
                <hr width="100%" />
              </div>
              <div className="row">
                <div className="col">
                  <h3>
                    <Link to={`/categories/${c}`}>{c.toUpperCase()}</Link>
                  </h3>
                </div>
                <div className="col d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm "
                    onClick={() => this.props.history.push(`/${c}/posts/create/`)}
                  >
                    <i className="material-icons md-18">
                      addcircleoutline
                    </i>{" "}
                    New Post
                  </button>
                </div>
              </div>
              <div className="row">&nbsp;</div>
              <div className="row">
                <div className="col">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th width="50%">Post</th>
                        <th width="25%" className="text-center">
                          <a
                            className="text-info"
                            onClick={() =>
                              this.sortBy(
                                category,
                                "voteScore"
                              )}
                          >
                            VoteScore &nbsp;
                            <i className="material-icons md-18">
                              {currentOrderField === "voteScore" &&
                                voteScoreOrder === "ASC" &&
                                "keyboardarrowdown"}
                              {currentOrderField === "voteScore" && 
                                voteScoreOrder === "DESC" &&
                              "keyboardarrowup"}
                            </i>
                          </a>
                        </th>
                        <th width="25%" className="text-center">
                          <a
                            className="text-info"
                            onClick={() =>
                              this.sortBy(
                                category,
                                "timestamp"
                              )}
                          >
                            Create Date &nbsp;
                            <i className="material-icons md-18">
                              {currentOrderField === "timestamp" && createDateOrder === "ASC" 
                                && "keyboardarrowdown"}
                              {currentOrderField === "timestamp" && createDateOrder === "DESC" 
                                && "keyboardarrowup"}
                            </i>
                          </a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.length === 0 && (
                        <tr>
                          <td colSpan="3">No posts yet</td>
                        </tr>
                      )}
                      {posts && posts.map(p => (
                          <tr
                            key={p.id}
                            className="mouseHands"
                            onClick={() =>
                              this.props.history.push(`${c}/post/${p.id}`)}
                          >
                            <td width="50%">{p.title}</td>
                            <td width="25%" className="text-center">
                              {p.voteScore}
                            </td>
                            <td width="25%" className="text-center">
                              {moment(p.timestamp).format("DD/MM/YYYY")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col text-right" />
              </div>

              {Utils.checkParams(
                this,
                "props.match.params.categoryFilter"
              ) && (
                <div className="row d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-md  btn-primary "
                    onClick={() => this.props.history.push("/")}
                  >
                    Voltar
                  </button>&nbsp;
                </div>
              )}
            </div>
          )}
        )}
        <LoadingComponent show={this.state.loading} />
      </div>
    );
  }
}

const mapStateToProps = ({categories}) => {
  
  return {
    categories: {
      ...categories
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCategoryStore: data => dispatch(updateCategoryStore(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);