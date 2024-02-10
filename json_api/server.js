const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the timestamp microservice!');
});

app.post('/timestamp', (req, res) => {
  const dateString = req.body.date;

  if (!dateString) {
    return res.status(400).json({ error: 'No date provided' });
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  const timestamp = Math.floor(date.getTime() / 1000);

  res.json({ unix: timestamp, utc: date.toUTCString() });
});

app.listen(port, () => {
  console.log(`Timestamp microservice listening at http://localhost:${port}`);
});
