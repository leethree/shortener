/* @flow */

import express from 'express';

import { fromGlobalId } from '../data/utils';
import { getURL } from '../data/database';

// From URL object from relay ID
const findURL = async (globalId: string) => {
  const { type, id } = fromGlobalId(globalId);
  if (type === 'URL') {
    return getURL(id);
  }
  return null;
};

const router = express.Router();
router.get('/:urlId', async (req, res) => {
  const { urlId } = req.params;
  const entry = await findURL(urlId);
  if (entry) {
    res.redirect(entry.url);
  } else {
    res.sendStatus(404);
  }
});

export default router;
