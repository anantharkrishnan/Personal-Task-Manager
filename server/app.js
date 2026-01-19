// Import dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const {connectDatabase} = require("./config/db");
dotenv.config();
connectDatabase();





// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}

));
app.use(express.json()); 
app.use(cookieParser());




// Serve frontend in production (optional)
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', router);

// Start the server

app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
    
})
