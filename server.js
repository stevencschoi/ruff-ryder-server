require('dotenv').config;
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.status(200).json('Yoyo ma');
})

app.post('/login', (req, res) => {
  // Authenticate User
  const { username } = req.body;
  const user = { name: username };

  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  res.status(200),json({ accessToken })
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.status(401).json({ message: 'Something went wrong.'});

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user, next) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  })

}

app.listen(5000, () => {
  console.log('listening on port 5000!');
});