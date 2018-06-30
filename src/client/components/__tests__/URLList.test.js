import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import URLList from '../URLList';

test('URLList renders empty', () => {
  const viewer = {
    id: 'me',
    totalCount: 0,
    urls: {
      edges: [],
    },
  };
  const component = renderer.create(<URLList viewer={viewer} />);
  // empty component
  expect(component.toJSON()).toEqual(null);
});

test('URLList renders', () => {
  const viewer = {
    id: 'me',
    totalCount: 2,
    urls: {
      edges: [
        { node: { id: 'test', url: 'https://www.google.com' } },
        { node: { id: 'test2', url: 'https://www.apple.com' } },
      ],
    },
  };
  const component = renderer.create(<URLList viewer={viewer} />);
  expect(component).toMatchSnapshot();
});
