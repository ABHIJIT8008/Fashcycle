const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/store-leads', require('./routes/storeLeadRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Fashcycle API' });
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
