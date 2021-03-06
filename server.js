const express = require('express');
const connectDb = require('./config/db');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDb();

// add json middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API running!'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


