const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const path = require('path');
require('dotenv').config({ path: './server/config.env' });

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Handle preflight requests (optional, since cors middleware handles this automatically)
app.options('*', cors(corsOptions));



async function main() {
  const Db = process.env.ATLAS_URI;
  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KoalaKoinApp');
    const usersCollection = db.collection('Users');
    const modules1Collection = db.collection('Modules');

    // API route to save answers
    // API route to save answers
    app.post('/api/save-answers', async (req, res) => {
      try {
        const { email, resultCategories, answers } = req.body;

        // Validate the incoming data
        if (!email || !resultCategories || !answers) {
          return res.status(400).send('Invalid data');
        }

        // Detailed logging for debugging
        console.log('Received email:', email);
        console.log('Received resultCategories:', JSON.stringify(resultCategories, null, 2));
        console.log('Received answers:', JSON.stringify(answers, null, 2));

        // Calculate the personality types based on the results
        const spending = resultCategories.frugalImpulsive > 50 ? 'Frugal' : 'Impulsive';
        const investing = resultCategories.conservativeAggressive > 50 ? 'Conservative' : 'Aggressive';
        const earning = resultCategories.traditionalEntrepreneurial > 50 ? 'Traditional' : 'Entrepreneurial';
        const saving = resultCategories.saverAdHoc > 50 ? 'Saver' : 'Ad-hoc';

        // Determine the overall personality type
        const key = `${spending.charAt(0)}${investing.charAt(0)}${earning.charAt(0)}${saving.charAt(0)}`;
        const personalityTypes = {
          FCTS: {
            name: "The Careful Planner",
            description: "They are meticulous in their spending, value monetary stability, and prioritise long-term financial security."
          },
          FCTA: {
            name: "The Cautious Saver",
            description: "They plan their finances carefully but are flexible with their savings approach."
          },
          FCES: {
            name: "The Secure Entrepreneur",
            description: "They balance cautious investments with innovative income strategies."
          },
          FCEA: {
            name: "The Cautious Innovator",
            description: "They are innovative yet cautious, combining entrepreneurship with flexible savings."
          },
          FATS: {
            name: "The Frugal Risk-Taker",
            description: "They manage to balance risk-taking investments with careful spending and consistent saving."
          },
          FATA: {
            name: "The Adventurous Saver",
            description: "They embrace risk in investments while being flexible in their saving habits."
          },
          FAES: {
            name: "The Strategic Builder",
            description: "They combine aggressive investment strategies with entrepreneurial ventures and disciplined saving."
          },
          FAEA: {
            name: "The Bold Innovator",
            description: "They are bold and innovative, willing to take risks and adapt their savings as needed."
          },
          ICTS: {
            name: "The Impulsive Planner",
            description: "They enjoy spontaneous spending but prefer security in investments and saving."
          },
          ICTA: {
            name: "The Spontaneous Saver",
            description: "They balance impulsive spending with cautious investments and flexible saving."
          },
          ICES: {
            name: "The Balanced Risk-Taker",
            description: "They manage impulsive spending while maintaining conservative investments and consistent savings."
          },
          ICEA: {
            name: "The Risk-Taking Innovator",
            description: "They combine impulsive spending with cautious investment strategies and flexible savings."
          },
          IATS: {
            name: "The Adventurous Planner",
            description: "They take risks in investments while maintaining a structured approach to saving."
          },
          IATA: {
            name: "The Bold Saver",
            description: "They are bold and adventurous, balancing high-risk investments with flexible saving habits."
          },
          IAES: {
            name: "The Dynamic Entrepreneur",
            description: "They are dynamic and driven, combining aggressive investments with entrepreneurial income and disciplined saving."
          },
          IAEA: {
            name: "The Fearless Innovator",
            description: "They are fearless and innovative, taking risks in both investments and earnings while adapting their savings flexibly."
          }
        };

        const personality = personalityTypes[key] || { name: "Undefined", description: "Undefined" };

        // Prepare the update data
        const resultWithPersonalityTypes = {
          'resultCategories': resultCategories,
          'spendingType': spending,
          'investingType': investing,
          'earningType': earning,
          'savingType': saving,
          'personalityKey': key,
          'personalityName': personality.name,
          'personalityDescription': personality.description,
          'answers': answers,
          'createdAt': new Date()
        };

        // Ensure the email matches exactly by trimming and converting to lower case
        const cleanEmail = email.trim().toLowerCase();

        // Log the clean email and ensure proper matching
        console.log('Clean email for query:', cleanEmail);

        // Use findOneAndUpdate to update the document if it exists, without inserting a new one
        const result = await usersCollection.findOneAndUpdate(
          { email: cleanEmail },
          { $set: resultWithPersonalityTypes },
          { returnDocument: 'after' } // Options to return the updated document, or null if no update occurred
        );

        if (result.value) { // result.value will be null if no document was found and updated
          res.status(200).send('Answers saved successfully');
          console.log('Answers saved successfully');
        } else {
          console.error('User not found, no updates made');
          res.status(404).send('User not found, no updates made');
        }
      } catch (error) {
        console.error('Error saving answers:', error);
        res.status(500).send('Internal server error');
      }
    });

    app.get('/api/get-test-result', async (req, res) => {
      const { email } = req.query;

      try {
        const userTestResult = await usersCollection.findOne(
          { email }, // Query to find the user's data by email
          { sort: { createdAt: -1 } } // Sort by createdAt field in descending order to get the latest entry
        );

        if (userTestResult) {
          res.status(200).json(userTestResult);
        } else {
          res.status(404).send('Test result not found');
        }
      } catch (error) {
        console.error('Error fetching test result:', error);
        res.status(500).send('Internal server error');
      }
    });

    app.post('/api/update-user-profile', async (req, res) => {
      console.log('Request Body'); // Log the body to see what's coming in
      console.log('Request Body:', req.body); // Log the body to see what's coming in

      try {
        const { email, name, age, gender } = req.body;

        // Log the received data for debugging
        console.log('Received data:', { email, name, age, gender });

        if (!email || !name || !age || !gender) {
          console.error('Incomplete profile data:', { email, name, age, gender });
          return res.status(400).send('Incomplete profile data');
        }

        // This will insert or update the user profile with the provided fields
        const result = await usersCollection.updateOne(
          { email: email },
          { $set: { name: name, age: age, gender: gender } },
          { upsert: true }
        );

        if (result.modifiedCount === 1 || result.upsertedCount === 1) {
          res.status(200).send('Profile updated successfully');
          console.log('Profile updated successfully');
        } else {
          console.error('Failed to update profile:', result);
          res.status(500).send('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error); // Log the error
        res.status(500).send('Internal server error');
      }
    });

    app.get('/api/check-profile', async (req, res) => {
      const { email } = req.query;

      console.log('Received request for email:', email);

      if (!email) {
        return res.status(400).send('Email is required');
      }

      try {
        const user = await usersCollection.findOne({ email });

        if (!user) {
          // If user is not found, return profileComplete: false
          console.log('User not found for email:', email);
          return res.status(200).json({ profileComplete: false });
        }

        // If user exists, check if profile is complete
        const profileComplete = user.name && user.age && user.gender;

        console.log('Profile complete:', profileComplete);
        res.status(200).json({ profileComplete: !!profileComplete });
      } catch (error) {
        console.error('Error checking profile:', error);
        res.status(200).json({ profileComplete: false });
      }
    });

    app.get('/api/get-all-users', async (req, res) => {
      try {
        const users = await usersCollection.find({}).toArray();
        res.status(200).json(users);
      } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send('Internal server error');
      }
    });

    app.get('/api/modules/:moduleId', async (req, res) => {
      const { moduleId } = req.params; // Extract the moduleId from the request parameters
      console.log(`Fetching module data for ${moduleId}`);
      
      try {
        const moduleData = await modules1Collection.findOne({ Module_ID: moduleId });
        
        if (!moduleData) {
          console.log('Module not found');
          return res.status(404).send('Module not found');
        }
        
        console.log('Module data found:', moduleData);
        res.status(200).json(moduleData);
      } catch (error) {
        console.error('Error fetching module data:', error);
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