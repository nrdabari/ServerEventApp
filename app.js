const express = require('express');
const app = express();
const port = 3000; // Define the port you want to run the server on
const cors = require('cors'); // Import the 'cors' library

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

  events.push(eventData);

  // In a real application, you would save the event data to a database
  console.log('Event created:', eventData); // Log the event data
  return res.status(201).json({ message: 'Event created successfully' });
});

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });