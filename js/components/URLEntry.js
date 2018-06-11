/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Card, Row, Column, Link, Pre } from 'rebass';
import { type URLEntry_url } from './__generated__/URLEntry_url.graphql';

type Props = {
  url: URLEntry_url,
};

const URLEntry = ({ url }: Props) => {
  const href = `/${url.id}`;
  return (
    <Card my={8} color="#555555">
      <Row px={8}>
        <Column my={8} flex="1 1 auto">
          {url.url}
        </Column>
        <Column my={8} flex="0 1 auto">
          →
        </Column>
        <Column my={8} flex="0 1 auto">
          <Link href={href} target="_blank">
            <Pre>{href}</Pre>
          </Link>
        </Column>
      </Row>
    </Card>
  );
};

export default createFragmentContainer(URLEntry, {
  url: graphql`
    fragment URLEntry_url on URL {
      id
      url
    }
  `,
});
