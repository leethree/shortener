/* @flow */

export class URLEntry {}
export class User {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
const usersById = {
  [VIEWER_ID]: viewer,
};

// Mock URL entries
const urlHashes = {};
const urlIdsByUser = {
  [VIEWER_ID]: [],
};

let nextId = 123;
export const addURL = (url: string) => {
  const entry = new URLEntry();
  nextId += 1;
  entry.id = `${nextId}`;
  entry.url = url;
  urlHashes[entry.id] = entry;
  urlIdsByUser[VIEWER_ID].push(entry.id);
  return entry.id;
};

export const getURL = (id: string) => urlHashes[id];

export const getURLs = (userId: string) =>
  urlIdsByUser[userId].map(id => urlHashes[id]);

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}
