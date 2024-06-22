const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 5000;
require('dotenv').config();

// Middlewares

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('My server is now running')
})

app.listen(port, () => {
    console.log(`This server is now running on port ${port}`)
})