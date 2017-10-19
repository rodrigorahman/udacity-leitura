import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { shallow } from 'enzyme'
import 'core-js/es6/map'
import 'core-js/es6/set'


it('renders without crashing', () => {
  expect(shallow(
    <App/>
  )).toMatchSnapshot()
})