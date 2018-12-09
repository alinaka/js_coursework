const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const models = require('./models');

const routes = require('./routes/routes');

var questions = [
  {
    id: 1,
    options: ['Кловерфилд, 10', 'Тихое место', 'Оно', 'Дорога'],
    answer: 1,
    image: '2.jpg'
  },
  {
    id: 2,
    options: ['Остров собак', 'Труп невесты', 'Семейка монстров', 'Кубо. Легенда о самурае'],
    answer: 2,
    image: '6.jpg'
  },
  {
    id: 3,
    options: ['Убийство', 'Очень странные дела', 'ОА', 'Тьма'],
    answer: 3,
    image: '7.jpg'
  }];
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', routes);


app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

