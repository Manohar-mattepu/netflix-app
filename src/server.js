const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Netflix Clone 🎬🍿</h1><p>Running on Kubernetes (NodePort)!</p>');
});

app.listen(8080, () => {
  console.log('Netflix app running on port 8080');
});
