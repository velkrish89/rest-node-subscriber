require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

//Routes to subscriber
const subscriberRouter = require('./routes/subscribers');
app.use('/subscribers', subscriberRouter);


app.listen(3000, () => console.log('Listening to port 3000'));