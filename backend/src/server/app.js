const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('../routes/authRoutes');
const chatRoutes = require('../routes/chatRoutes');
const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;