/* @flow */

import express from 'express';

import { findURL } from '../data/logic';

const router = express.Router();
router.get('/:urlId', async (req, res) => {
  const { urlId } = req.params;
  const url = await findURL(urlId);
  if (url) {
    res.redirect(url);
  } else {
    res.sendStatus(404);
  }
});

export default router;
