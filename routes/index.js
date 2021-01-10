import express from 'express';
import path from 'path';

export const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(process.cwd() + '/client/build/index.html'));
});
