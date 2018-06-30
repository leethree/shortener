import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import URLCount from '../URLCount';

test.each([0, 1, 2, 10, 11])('URLCount renders count=%d', count => {
  const viewer = {
    id: 'me',
    totalCount: count,
  };
  const component = renderer.create(<URLCount viewer={viewer} />);
  expect(component).toMatchSnapshot();
});
