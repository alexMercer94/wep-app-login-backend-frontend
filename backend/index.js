const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//Create server
const app = express();

// Connect db
connectDB();

// Setup cors
const corsOptions = {
    origin: process.env.FRONTEND_URL,
};
// Enable cors
app.use(cors(corsOptions));

// App port
const port = process.env.PORT || 4000;

// Enable json
app.use(express.json());

// Rounting
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`);
});
