/* @flow */

import { URL } from 'url';

import { fromGlobalId } from './utils';
import { addURL, getURL } from './database';

class InvalidInputError extends Error {}

// Validate URL and save to DB
export const shortenURL = async (input: string) => {
  try {
    const url = new URL(input);
    return addURL(url.href);
  } catch (err) {
    throw new InvalidInputError(`${input} is not valid URL`);
  }
};

// Find URL from relay ID
export const findURL = async (globalId: string) => {
  const { type, id } = fromGlobalId(globalId);
  if (type === 'URL') {
    const entry = await getURL(id);
    if (entry) {
      return entry.url;
    }
  }
  return null;
};
