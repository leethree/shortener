import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import URLEntry from '../URLEntry';

test('URLEntry renders', () => {
  const url = {
    id: 'test',
    url: 'https://www.google.com',
  };
  const component = renderer.create(<URLEntry url={url} />);
  expect(component).toMatchSnapshot();
});
