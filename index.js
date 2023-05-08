const express = require('express');

const fetch = require('node-fetch');



const app = express();
app.use(express.static('public'));



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const city = req.query.city || 'New York';
  const apiKey = 'c740b141159dc93d62c32a163b009d37';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const weather = new Weather({
        city,
        temperature,
      });
      weather.save();
      res.render('index', { city, temperature, description });
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});

app.post('/weather', async (req, res) => {
  const city = req.body.city;
  const apiKey = 'c740b141159dc93d62c32a163b009d37';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  const data = await response.json();
  if (data.cod === '404') {
    console.log(data.message); // log the error message
    res.render('error', { message: 'City not found. Please try again.' });
  } else {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const weather = new Weather({
      city,
      temperature,
    });
    weather.save();
    res.render('weather', { city, temperature, description });
  }
});


app.listen(process.env.PORT ||8080, "0.0.0.0", () => {
  console.log('Server listening on port 3000');
});
