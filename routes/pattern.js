import express from 'express';
import { ExcelReader } from '../readers/excelReader.js';
import path from 'path';

export const router = express.Router();

/* GET pattern  */
router.get('/', (req, res) => {
    res.json([
        ['x', '#BEB'],
        ['0', '#CCC'],
    ]);
});

router.get('/read', async (req, res) => {
    const reader = new ExcelReader();
    try {
        const item = await reader.readFromFile(
            path.join(process.cwd() + '/client/build/schema.xlsx')
        );
        res.json(item);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});
