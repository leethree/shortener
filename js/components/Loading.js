/* @flow */

import React from 'react';
import { Donut, Flex } from 'rebass';
import styled, { keyframes } from 'styled-components';

// Define rotation animation
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Spinner = animation + Donut
const Spinner = styled(Donut)`
  animation: ${rotate360} 1s linear infinite;
`;

const Loading = () => (
  <Flex justify="center" align="center">
    <Spinner value={2 / 3} />
  </Flex>
);

export default Loading;
