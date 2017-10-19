export const UPDATE_POST_STORE = 'UPDATE_POST_STORE';
export const UPDATE_POST = 'UPDATE_POST';
export const CLEAR_POST_PAGE_STORE = 'CLEAR_POST_PAGE_STORE';
export const ADD_COMMENT_IN_POST = 'ADD_COMMENT_IN_POST';
export const UPDATE_COMMENT_IN_POST = 'UPDATE_COMMENT_IN_POST';
export const REMOVE_COMMENT_IN_POST = 'REMOVE_COMMENT_IN_POST';

export const updateStorePost = ({post, comments}) => {
  return {
    type: UPDATE_POST_STORE,
    post,
    comments
  }
}
export const addComment = ({post, comment}) => {
  return {
    type: ADD_COMMENT_IN_POST,
    post,
    newComment: comment
  }
}

export const removeComment = ({post, comment}) => {
  return {
    type: REMOVE_COMMENT_IN_POST,
    post,
    comment
  }
}

export const updateComment = ({post, comment}) => {
  return {
    type: UPDATE_COMMENT_IN_POST,
    post,
    comment
  }
}

export const clearPostPageStore = () => {
  return {
    type: CLEAR_POST_PAGE_STORE
  }
}