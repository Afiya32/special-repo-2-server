const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
// middleware
 app.use(cors());
 app.use(express.json());

// mongodb connections


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fffaqtl.mongodb.net/fitnessDB?retryWrites=true&w=majority`;

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
   
    // my database connection
    const servicesCollection = client.db('fitnessDB').collection('services');
    const  addedservicesCollection = client.db('fitnessDB').collection('addedServices');
    const bookservicesCollection = client.db('fitnessDB').collection('bookServices');
  // services page reading
app.get('/services',async (req,res)=>{
  const curser =  servicesCollection.find()
  const result = await curser.toArray();
   res.send(result);
})
  // add services page reading
app.get('/addedservices',async (req,res)=>{
  const curser =  addedservicesCollection.find()
  const result = await curser.toArray();
   res.send(result);
})
// deleted add services
app.delete('/addedservices/:id', async (req, res)=>{
  const id = req.params.id;
  const query= {_id: new ObjectId(id)}
  const result= await addservicesCollection.deleteOne(query);
  res.send(result);
})



// service data post

app.post('/addedservices',async(req,res)=>{
  const newAddService = req.body;
  console.log(newAddService);
  const result = await addedservicesCollection.insertOne(newAddService);
  res.send(result);
});
// get book services
app.get('/bookservices',async (req,res)=>{
  const curser =  bookservicesCollection.find()
  const result = await curser.toArray();
   res.send(result);
})


// book services post
app.post('/bookservices',async(req,res)=>{
  const newBookService = req.body;
 
  const result = await  bookservicesCollection.insertOne(newBookService);
  res.send(result);
});

        
// get a single service by its id
app.get('/services/:id', async (req, res) => {
  const id = req.params.id;
console.log('ID:', id);
const query = { _id: new ObjectId(id) };
console.log('Query:', query);
  try {
    const result = await servicesCollection.findOne(query);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send('Service not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
  
  
});







  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);



 app.get('/',(req,res)=>{
    res.send('fitpro server is running');
 })





 app.listen(port,()=>{
    console.log(`fitpro server is running on ${port}`);
 })