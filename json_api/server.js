const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  const date = req.params.date;

  if (!date) {
    const currentTime = new Date();
    res.json({ unix: currentTime.getTime(), utc: currentTime.toUTCString() });
  } else {
    let parsedDate;
    try {
      parsedDate = new Date(Number(date));
    } catch (err) {
      res.json({ error: 'Invalid Date' });
      return;
    }
    res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
