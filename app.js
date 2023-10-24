const express = require('express');
const app = express();
const port = 3000; // Define the port you want to run the server on
const cors = require('cors'); // Import the 'cors' library
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');
// Connect to MongoDB
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

  }).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Middleware to parse JSON request bodies
app.use(express.json());

// Allow requests from your Angular app (adjust origin as needed)
app.use(cors({
  origin: 'http://localhost:4200',
}));

// Define an in-memory array to store event data (for demonstration purposes)
const events = [];

// Create an endpoint to receive event data via POST request
app.post('/events', (req, res) => {
  const eventData = req.body;
  console.log(eventData);

  if (!eventData) {
    return res.status(400).json({ error: 'Event data is required' });
  }
// Save the event data to MongoDB
const event = new Event(eventData);
event.save()
  .then(() => {
    console.log('Event created:', eventData);
    return res.status(201).json({ message: 'Event created successfully' });
  })
  .catch(err => {
    console.error('Error creating event:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
 
  });
});

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });