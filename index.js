require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./config");
const port = process.env.PORT || 3000;

app.use(express.json());

const pollRoutes = require('./routes/poll');
const authRoutes = require('./routes/auth');

console.log('Type of pollRoutes:', typeof pollRoutes);
console.log('Type of authRoutes:', typeof authRoutes);

app.use('/api/polls', pollRoutes);
app.use('/api/auth', authRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    
}).catch(() => {
    console.log("Error connecting to database");
    
});
