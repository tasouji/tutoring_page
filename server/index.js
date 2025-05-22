const db = require('./db');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;


app.get('/api/health', (req, res) => {
    res.send('OK');
});

app.get('/api/db-test', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ now: result.rows[0].now });
    } catch (err) {
        console.error('DB error', err);
        res.status(500).send('Database error');
    }
});

app.get('/api/availability', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, start_time AS start, end_time AS end FROM availability ORDER BY start_time'
        );
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('Error fetching availability');
    }
});

app.post('/api/availability', async (req, res) => {
    const { start, end } = req.body;
    if (!start || !end) {
        return res.status(400).send('Missing start or end');
    }
    try {
        const insert = await db.query(
            'INSERT INTO availability (start_time, end_time) VALUES ($1, $2) RETURNING id, start_time AS start, end_time AS end',
            [start, end]
        );
        res.status(201).json(insert.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating availibility');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});