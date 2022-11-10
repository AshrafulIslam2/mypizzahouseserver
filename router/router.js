const express = require("express");
const router = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nurit.m2znvdw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("mypizzastore").collection("pizzadetails");
    //find all service
    router.get("/services", async (req, res) => {
      const query = {};
      const cursor = database.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const database = client.db("mypizzastore").collection("pizzadetails");
    //find all service
    router.get("/limitservices", async (req, res) => {
      const query = {};
      const cursor = database.find(query);
      const result = await cursor.limit(3).toArray();
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const database = client.db("mypizzastore").collection("pizzadetails");
    //find signal service
    router.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await database.findOne(query);
      res.send(service);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const database = client.db("mypizzastore").collection("pizzadetails");
    //Add New signal service
    router.post("/services", async (req, res) => {
      const newservice = req.body;
      console.log(newservice);
      const result = database.insertOne(newservice);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const reviewdata = client.db("mypizzastore").collection("reviews");
    //Add New reviews
    router.post("/reviews", async (req, res) => {
      const reviews = req.body;
      console.log(reviews);
      const result = reviewdata.insertOne(reviews);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const reviewdata = client.db("mypizzastore").collection("reviews");
    //Display Review in User Field
    router.get("/reviews", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const cursor = reviewdata.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const reviewdatabase = client.db("mypizzastore").collection("reviews");
    router.get("/reviews/single", async (req, res) => {
      let query = {};
      if (req.query.service) {
        query = { service: req.query.service };
      }
      const cursor = reviewdatabase.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });
  } catch (error) {}
  try {
    const reviewdata = client.db("mypizzastore").collection("reviews");
    router.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deletedreview = await reviewdata.deleteOne(query);
      res.send(deletedreview);
    });
  } catch (error) {}
}
run().catch(console.dir);

module.exports = router;
