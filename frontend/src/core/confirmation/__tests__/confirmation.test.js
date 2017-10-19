import React from "react";
import ConfirmationComponent from "../confirmation.component";

import { shallow, mount, render } from "enzyme";
import "core-js/es6/map";
import "core-js/es6/set";

it("renders without crashing", () => {
  let show = false;
  let yes = jest.fn();
  let no = jest.fn();

  let w = render(<ConfirmationComponent 
    modal={true}
    title={'teste'}
    msg={'teste'}
    yes={yes}
    no={no}
  />)
  console.log(w.html())
  expect(w)
});