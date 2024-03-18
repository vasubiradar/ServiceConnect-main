// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Other middleware setup (body parsers, session management, etc.)
// ...

// Define your routes
app.get('/service22/service-category/categories', (req, res) => {
  // Your route handling logic here
  res.json({ message: 'Hello, this is your categories endpoint!' });
});

// More routes and middleware...

// Start the server
const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
