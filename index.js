const express = require('express');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASED_URL || `http://localhost:${port}`;

const links = new Map();

app.use(express.json());

app.post('/create-link', (req, res) => {
    const { value } = req.body;
    if (!value) {
        return res.status(400).json({ error: 'Value is required' });
    }

    const linkId = uuidv4();
    links.set(linkId, value);

    res.json({ link: `http://localhost:${port}/get-value/${linkId}` });
});

app.get('/get-value/:linkId', (req, res) => {
    const { linkId } = req.params;

    if (links.has(linkId)) {
        const value = links.get(linkId);
        links.delete(linkId);
        return res.json({ value });
    }

    res.status(404).json({ error: 'Link not found or has already been used' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});