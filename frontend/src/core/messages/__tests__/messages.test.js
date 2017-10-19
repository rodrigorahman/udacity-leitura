import React from "react";
import ReactDOM from "react-dom";
import MessagesComponent from "../messages.component";

import { shallow, mount } from "enzyme";
import "core-js/es6/map";
import "core-js/es6/set";

import configureStore from "redux-mock-store";

const middlewares = []; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const getState = {}; // initial state of the store

it("renders without crashing", () => {
  let message = {
    message: {
      text: "teste"
    }
  };
  const getState = {}; // initial state of the store
  const action = { type: "ADD_TODO" };
  const expectedActions = [action];

  const store = mockStore(getState, expectedActions);
  expect(
    mount(<MessagesComponent store={store} message={message} />)
  ).toMatchSnapshot();
});



it("renders message", () => {
  let message = {
      text: "teste"
  };
  const getState = {message}; // initial state of the store
  const action = { type: "ADD_TODO" };
  const expectedActions = [action];

  const store = mockStore(getState, expectedActions);

  const comp = mount(<MessagesComponent store={store} />);
  expect(
    comp.find('div')  
  ).toHaveLength(2);
});


it("no renders message", () => {
  let message = {
      text: ''
  };
  const getState = {}; // initial state of the store
  const action = { type: "ADD_TODO" };
  const expectedActions = [action];

  const store = mockStore(getState, expectedActions);

  const comp = mount(<MessagesComponent store={store} />);
  expect(
    comp.find('div')  
  ).toHaveLength(1);
});

it("render message with hideTimeout", () => {
  let message = {
      text: "teste"
  };
  const getState = {message}; // initial state of the store
  const action = { type: "ADD_TODO" };
  const expectedActions = [action];

  const store = mockStore(getState, expectedActions);

  const comp = mount(<MessagesComponent store={store} hideTimeout={1000} />);
  expect(
    comp.find('div')  
  ).toHaveLength(2);
});

it("mount and unmount message", () => {
  let message = {
      text: "teste"
  };
  const getState = {message}; // initial state of the store
  const action = { type: "ADD_TODO" };
  const expectedActions = [action];

  const store = mockStore(getState, expectedActions);

  const comp = mount(<MessagesComponent store={store} hideTimeout={1000} />);
  comp.unmount();
  expect(
    comp.find('div')  
  ).toHaveLength(0);
});


it("update message", () => {
  let message = {
      text: "teste"
  };
  const getState = {message}; // initial state of the store
  const action = { type: "UPDATE_MESSAGE", message };
  const expectedActions = [action];

  const store = mockStore(getState, expectedActions);
  const comp = mount(<MessagesComponent store={store} hideTimeout={1000} />);
  comp.setProps({hideTimeout:1000,message});
  expect(
    comp.find('div')  
  ).toHaveLength(2);
});


it("update message and wait hide", (done) => {
  let message = {
      text: "teste"
  };
  const getState = {message}; // initial state of the store
  const action = { type: "UPDATE_MESSAGE", message };
  const expectedActions = [action];

  const store = mockStore(getState, expectedActions);
  const comp = mount(<MessagesComponent store={store} hideTimeout={1} />);
  comp.setProps({message});
  setTimeout(() => {
    done()
  },10);
  expect(
    comp.find('div')  
  ).toHaveLength(2);
});