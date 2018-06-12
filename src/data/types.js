/* @flow */

// Base class
class Node {
  id: number;

  constructor(model: Object) {
    const { _id, ...args } = model;
    this.id = _id;
    Object.assign(this, args);
  }
}

// Model represents a URL
export class URLEntry extends Node {
  url: string;
}

// Model represents a User
export class User extends Node {
  // Add properties here
}

// Static type map
const TYPE_TO_IDS = {
  URL: 0,
  User: 1,
  // Add more types here
};

// constuct reversed map
const ID_TO_TYPES = Object.entries(TYPE_TO_IDS).reduce((res, [key, value]) => {
  res[(value: $FlowFixMe)] = key;
  return res;
}, {});

export const mapTypeToId = (type: string) => TYPE_TO_IDS[type];

export const mapIdToType = (id: number) => ID_TO_TYPES[id];
