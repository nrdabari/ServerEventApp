const express = require('express');
const app = express();
const port = 3000; // Define the port you want to run the server on
app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });