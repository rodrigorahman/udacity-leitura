import { API_BASE_URL } from "../../../core/shared.params";
import uuidv1 from "uuid/v1";
import moment from "moment";

const api = API_BASE_URL;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: token
};

export const getPostsByCategory = category => {
  return fetch(`${api}/${category}/posts`, { headers }).then(res => res.json());
};

export const getPostDetail = id => {
  return getPostById(id).then(post => {
    return fetch(`${api}/posts/${id}/comments`, { headers })
      .then(res => res.json())
      .then(comments => {
        return {
          post,
          comments
        };
      });
  });
};

export const saveComment = (comment, post) => {
  let postData = {
    id: comment.id || uuidv1(),
    timestamp: moment().unix(),
    body: comment.comment,
    author: comment.author,
    parentId: post.id
  };
  if (comment.id) {
    return fetch(`${api}/comments/${comment.id}`, {
      method: "put",
      headers,
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  } else {
    return fetch(`${api}/comments/`, {
      method: "post",
      headers,
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }
};

export const voteScoreComment = (typeVote, comment) => {
  let data = {
    option: typeVote
  };

  return fetch(`${api}/comments/${comment.id}`, {
    method: "post",
    headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const removeComment = comment => {
  return fetch(`${api}/comments/${comment.id}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const voteScorePost = (typeVote, {id}) => {
  let data = {
    option: typeVote
  };

  return fetch(`${api}/posts/${id}`, {
    method: "post",
    headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const savePost = post => {
  if (post.id) {
    return fetch(`${api}/posts/${post.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  } else {
    post.id = uuidv1();
    return fetch(`${api}/posts/`, {
      method: "POST",
      headers,
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }
};

export const getPostById = idPost => {
  return fetch(`${api}/posts/${idPost}`, { headers }).then(res => res.json());
};

export const removePost = idPost => {
  return fetch(`${api}/posts/${idPost}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};