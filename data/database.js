/* @flow */

import Datastore from 'nedb';

import { User, URLEntry } from './types';

// TODO: persist database
const db = new Datastore();

const getAutoincrementId = () =>
  new Promise((resolve, reject) => {
    db.update(
      { _id: '__autoid__' },
      { $inc: { seq: 1 } },
      { upsert: true, returnUpdatedDocs: true },
      (err, _, autoid) => {
        if (err) {
          reject(err);
        } else {
          resolve(autoid.seq);
        }
      },
    );
  });

// Mock authenticated ID
const VIEWER_ID = 1;

// Mock user data
// TODO: move user data to DB
const viewer = new User({ _id: VIEWER_ID });
const usersById = {
  [VIEWER_ID]: viewer,
};

export const addURL = async (url: string): Promise<URLEntry> => {
  const entry = {
    url,
    userId: VIEWER_ID,
    _id: await getAutoincrementId(),
  };
  return new Promise((resolve, reject) => {
    db.insert(entry, (err, newEntry: URLEntry) => {
      if (err) {
        reject(err);
      } else {
        resolve(new URLEntry(newEntry));
      }
    });
  });
};

export const getURL = (id: number): Promise<URLEntry> =>
  new Promise((resolve, reject) => {
    db.findOne({ _id: id }, (err, entry) => {
      if (err) {
        reject(err);
      } else {
        resolve(new URLEntry(entry));
      }
    });
  });

export const getURLs = (): Promise<Array<URLEntry>> =>
  new Promise((resolve, reject) => {
    db.find({ userId: VIEWER_ID }, (err, entries) => {
      if (err) {
        reject(err);
      } else {
        resolve(entries.map(entry => new URLEntry(entry)));
      }
    });
  });

export const getNumberOfURLs = (): Promise<number> =>
  new Promise((resolve, reject) => {
    db.count({ userId: VIEWER_ID }, (err, count) => {
      if (err) {
        reject(err);
      } else {
        resolve(count);
      }
    });
  });

export const getUser = (id: number) => usersById[id];

export const getViewer = () => getUser(VIEWER_ID);
