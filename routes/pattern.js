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

router.post('/convert', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const reader = new ExcelReader();
    try {
        const item = await reader.readFromFileData(req.files.excel.data);
        res.json(item);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
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
