const express = require('express');
const app = express();
const connectDB = require("./config");
const port = process.env.PORT || 3000;

app.use(express.json());



connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    
}).catch(() => {
    console.log("Error connecting to database");
    
});
