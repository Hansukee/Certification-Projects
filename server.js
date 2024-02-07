const express = require('express');
const app = express();

app.use(express.json());
// Default route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;

  if (!dateString) {
    // Handle case: An empty date parameter returns the current time
    const currentTime = new Date();
    res.json({
      unix: currentTime.getTime(),
      utc: currentTime.toUTCString(),
    });
  } else {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      // Handle case: Invalid Date
      res.json({ error: 'Invalid Date' });
    } else {
      // Handle case: Valid Date
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
