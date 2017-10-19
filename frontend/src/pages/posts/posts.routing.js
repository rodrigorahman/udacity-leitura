import React from "react";

import { Route } from "react-router-dom";
import PostFormPageComponent from './form.page';
import PostsDetailPageComponent from './detail.page';

const PostRouting = () => {
  return [
    <Route key='create' exact path="/:category/posts/create/" render={(props, history) => <PostFormPageComponent history={history}  typeForm='create' {...props}/>} />,
    <Route key='alter' exact path="/post/alter/:id" render={(props,  history ) => <PostFormPageComponent history={history} typeForm='edit' {...props}/>} />,
    <Route key='detail' exact path="/:category/post/:id" render={(props,  history ) => <PostsDetailPageComponent history={history} {...props}/>} />
  ];
};

export default PostRouting;