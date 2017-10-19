import React from 'react'
import { Route } from "react-router-dom";

import HomePage from './home.page';

const HomeRouting = () => {
  return [
    <Route key='home' exact path="/" render={({history, props}) => <HomePage history={history}/>} />,
  ];
}

export default HomeRouting;