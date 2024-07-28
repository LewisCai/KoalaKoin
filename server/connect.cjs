const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build'))); // Serve static files from the React app

async function main() {
  const Db = process.env.ATLAS_URI;
  console.log('MongoDB URI:', Db); // Ensure this prints out the correct URI
  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KoalaKoinApp');
    const usersCollection = db.collection('Users');

    // API route to save answers
    app.post('/api/save-answers', async (req, res) => {
      try {
        const { email, resultCategories, answers } = req.body;

        // Detailed logging for debugging
        console.log('Received email:', email);
        console.log('Received resultCategories:', JSON.stringify(resultCategories, null, 2));
        console.log('Received answers:', JSON.stringify(answers, null, 2));

        // Validate the incoming data
        if (!email || !resultCategories || !answers) {
          console.log('Invalid data:', { email, resultCategories, answers });
          return res.status(400).send('Invalid data');
        }

        // Insert the data into the Users collection
        await usersCollection.insertOne({ email, resultCategories, answers, createdAt: new Date() });

        res.status(200).send('Answers saved successfully');
        console.log('Answers saved successfully'); // Debugging log
      } catch (error) {
        console.error('Error saving answers:', error);
        res.status(500).send('Internal server error');
      }
    });

    // Serve the React app's static files
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

main();
