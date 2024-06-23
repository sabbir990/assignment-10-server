const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.p2btb5w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middlewares

app.use(cors());
app.use(express.json());


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const spotDB = client.db('spotDB').collection("spotCollection");

        app.post('/spots', async(req, res) => {
            const spot = req.body;
            const result = await spotDB.insertOne(spot);
            res.send(result)
        })

        app.get('/spots/:email', async(req, res) => {
            const email = req.params.email;
            const query = {email : email};
            const result = await spotDB.find(query).toArray();
            res.send(result)
        })

        app.get('/singleSpot/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id : new ObjectId(id)};
            const result = await spotDB.findOne(query);
            res.send(result);
        })

        app.get('/allSpots', async(req, res) => {
            const query = spotDB.find();
            const result = await query.toArray();
            res.send(result)
        })
    } finally {
        
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('My server is now running')
})

app.listen(port, () => {
    console.log(`This server is now running on port ${port}`)
})