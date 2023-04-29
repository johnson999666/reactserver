require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.set('view engine', 'ejs');
const io = require('socket.io')(server);




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

app.get('/third', (req, res) => {
  res.sendFile('third', { name: 'World' });
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.listen(process.env.PORT ||8080, "0.0.0.0", () => {
  console.log('Server listening on port 3000');
});
