const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: './server/config.env' });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build'))); // Serve static files from the React app

async function main() {
  const Db = process.env.ATLAS_URI;
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

        // Include personality types and overall personality in the data
        const resultWithPersonalityTypes = {
          ...resultCategories,
          spendingType: spending,
          investingType: investing,
          earningType: earning,
          savingType: saving,
          personalityKey: key, // Store the key for easy lookup
          personalityName: personality.name, // Store the overall personality name
          personalityDescription: personality.description // Store the overall personality description
        };

        // Insert the data into the Users collection
        await usersCollection.insertOne({ 
          email, 
          resultCategories: resultWithPersonalityTypes, 
          answers, 
          createdAt: new Date() 
        });

        res.status(200).send('Answers saved successfully');
        console.log('Answers saved successfully'); // Debugging log
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
