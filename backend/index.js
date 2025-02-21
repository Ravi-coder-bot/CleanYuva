const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (Local Machine)
const localMongoURI = 'mongodb://localhost:27017/clean';
mongoose.connect(localMongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB on local machine'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/admin', adminRoutes);

const PORT = 5000; // Hardcoded port

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});