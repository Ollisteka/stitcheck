import express from 'express';

export const router = express.Router();

/* GET pattern  */
router.get('/', function (req, res, next) {
    res.json([
        ['x', '#BEB'],
        ['0', '#CCC'],
    ]);
});
