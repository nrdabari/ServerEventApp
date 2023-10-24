const express = require('express');
const app = express();
const port = 3000; // Define the port you want to run the server on
const cors = require('cors'); // Import the 'cors' library
require('dotenv').config();  // reqired for .env
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

// API endpoint to get upcoming events
app.get('/events/upcoming', async(req, res) => {
  console.log("upcomingEvents");
  // Query the database to find events with dates greater than currentDate
  // Return the upcoming events
  const currentDate = new Date(req.query.date);

  try {
    const upcomingEvents = await Event.find({ eventDate: { $gt: currentDate } });
    console.log(upcomingEvents);
    res.json(upcomingEvents);

  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get past events
app.get('/events/past', async(req, res) => {
  const currentDate = new Date(req.query.date);
  // Query the database to find events with dates less than currentDate
  // Return the past events
  try {
    const pastEvents = await Event.find({ eventDate: { $lt: currentDate } });
    res.json(pastEvents);
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });