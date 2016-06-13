/**
	*
	@flow
**/
import express from 'express';
import userLib from '../utils/userLib';
let router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
