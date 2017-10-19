import React from "react";
import ReactDOM from "react-dom";
import LoadingComponent from "../loading.component";

import { shallow } from "enzyme";
import "core-js/es6/map";
import "core-js/es6/set";

it("renders without crashing", () => {
  let show = true;
  expect(shallow(<LoadingComponent show={show} />)).toMatchSnapshot();
});

it("check open loading", () => {
  let show = false;
  let loading = shallow(<LoadingComponent show={show} />);
  expect(loading.find("#myModal")).toHaveLength(0);
});


it("check open loading", () => {
  let show = true;
  let loading = shallow(<LoadingComponent show={show} />);
  expect(loading.find("#myModal")).toHaveLength(1);
});
