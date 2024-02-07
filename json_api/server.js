const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.get('/api', (req, res) => {
  const currentTime = new Date();
  res.json({
    unix: currentTime.getTime(),
    utc: currentTime.toUTCString(),
  });
});

app.get('/api/:date', (req, res) => {
  const dateString = req.params.date;
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
