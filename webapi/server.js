const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/api');

// MongoDB connection
mongoose.connect('mongodb+srv://nckhe22:nckhe22@procleaner.ragb04b.mongodb.net/?retryWrites=true&w=majority&appName=Procleaner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Express setup
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// Start server
app.listen(process.env.PORT || 4444, () => {
  console.log('API is running on port 4444', `http://localhost:4444/api`);
});
