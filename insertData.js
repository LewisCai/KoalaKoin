const { MongoClient } = require('mongodb');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './server/config.env' });

// Check if the MongoDB URI is loaded
console.log('MongoDB URI:', process.env.ATLAS_URI);  // Ensure this is not undefined

// If undefined, the script will stop here for debugging
if (!process.env.ATLAS_URI) {
  throw new Error('ATLAS_URI is undefined. Please check your config.env file.');
}

async function insertLessonData() {
  // Load the JSON data
  const data = JSON.parse(fs.readFileSync('lesson_data.json', 'utf-8'));

  const client = new MongoClient(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('KoalaKoinApp');
    const collection = database.collection('Modules');

    // Insert the data into the Modules collection with a specific module name
    await collection.insertOne({ ModuleContent: data, Module_ID: 'M2' });

    console.log('Lesson data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.close();
  }
}

insertLessonData();
