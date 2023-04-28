// require('dotenv').config();
const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.set('view engine', 'ejs');




app.get('/', (req, res) => {
  res.render('index', { name: 'World' });
});

app.get('/first', (req, res) => {
  res.render('first', { name: 'World' });
});

app.get('/me', (req, res) => {
  res.render('me', { name: 'World' });
});

app.get('/second', (req, res) => {
  res.render('second', { name: 'World' });
});




app.listen(8000, "0.0.0.0", () => {
  console.log('Server listening on port 3000');
});
