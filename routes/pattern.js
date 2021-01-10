import express from 'express';

export const router = express.Router();

/* GET pattern  */
router.get('/', (req, res) => {
    res.json([
        ['x', '#BEB'],
        ['0', '#CCC'],
    ]);
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});
