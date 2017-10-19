import {
  UPDATE_POST_STORE,
  CLEAR_POST_PAGE_STORE,
  ADD_COMMENT_IN_POST,
  UPDATE_COMMENT_IN_POST,
  REMOVE_COMMENT_IN_POST
} from "../actions/posts.actions";

export const post = (state = {}, action) => {
  let { post, comments, newComment, comment } = action;
  switch (action.type) {
    case UPDATE_POST_STORE:
      return {
        ...post,
        comments
      };
    case CLEAR_POST_PAGE_STORE:
      return null;
    case ADD_COMMENT_IN_POST:
      post.comments.push(newComment);
      return {
        ...post
      };
    case UPDATE_COMMENT_IN_POST:
      let cIndex = post.comments.findIndex(c => c.id === comment.id);
      post.comments[cIndex] = comment;

      return {
        ...post
      };
    case REMOVE_COMMENT_IN_POST:
      let removeIndex = post.comments.findIndex(c => c.id === comment.id);
      post.comments.splice(removeIndex, 1);
      return {
        ...post
      };
      default:
        return state;
  }
};
