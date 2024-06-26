const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

// middlewear 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// mongodb confiq here
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://ramrage13:PanesarR07@cluster.o7dqysb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const bookCollections = client.db("BookCollection").collection("books");
        const movieCollections = client.db("MovieCollection").collection("movies");
        const animangaCollections = client.db("AnimangaCollection").collection("animangas");

        // insert a book to db: Post Method
        app.post("/upload-book", async (req, res) => {
            const data = req.body;
            // console.log(data);
            const result = await bookCollections.insertOne(data);
            res.send(result);
        })

        // // get all books from db
         app.get("/all-books", async (req, res) => {
             const books = bookCollections.find();
             const result = await books.toArray();
             res.send(result)
         })

        // get all books & find by a category from db
        app.get("/all-books", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { category: req.query.category }
            }
            const result = await bookCollections.find(query).toArray();
            res.send(result)
        })

        // update a books method
        app.patch("/book/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const updateBookData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    ...updateBookData
                }
            }
            const options = { upsert: true };

            // update now
            const result = await bookCollections.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


        // delete a item from db
        app.delete("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.deleteOne(filter);
            res.send(result);
        })


        // get a single book data
        app.get("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.findOne(filter);
            res.send(result)
        })

        app.post("/upload-movie", async (req, res) => {
            const data = req.body;
            // console.log(data);
            const result = await movieCollections.insertOne(data);
            res.send(result);
        })

        // // get all movie from db
         app.get("/all-movie", async (req, res) => {
             const movies = movieCollections.find();
             const result = await movies.toArray();
             res.send(result)
         })

        // get all movie & find by a category from db
        app.get("/all-movie", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { category: req.query.category }
            }
            const result = await movieCollections.find(query).toArray();
            res.send(result)
        })

        // update a movie method
        app.patch("/movie/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const updateMovieData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    ...updateMovieData
                }
            }
            const options = { upsert: true };

            // update now
            const result = await movieCollections.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


        // delete a item from db
        app.delete("/movie/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await movieCollections.deleteOne(filter);
            res.send(result);
        })


        // get a single movie data
        app.get("/movie/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await movieCollections.findOne(filter);
            res.send(result)
        })

        app.post("/upload-animanga", async (req, res) => {
            const data = req.body;
            // console.log(data);
            const result = await animangaCollections.insertOne(data);
            res.send(result);
        })

        // // get all movie from db
         app.get("/all-animanga", async (req, res) => {
             const animangas = animangaCollections.find();
             const result = await animangas.toArray();
             res.send(result)
         })

        // get all movie & find by a category from db
        app.get("/all-animanga", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { category: req.query.category }
            }
            const result = await animangaCollections.find(query).toArray();
            res.send(result)
        })

        // update a movie method
        app.patch("/animanga/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const updateAnimangaData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    ...updateAnimangaData
                }
            }
            const options = { upsert: true };

            // update now
            const result = await animangaCollections.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


        // delete a item from db
        app.delete("/animanga/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await animangaCollections.deleteOne(filter);
            res.send(result);
        })


        // get a single movie data
        app.get("/animanga/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await animangaCollections.findOne(filter);
            res.send(result)
        })

        


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})