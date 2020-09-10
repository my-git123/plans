const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect to Database
connectDB();

app.get('/', (req,res) => res.send('API running'));
//Initialize body parser
app.use(express.json({extended:false}));
//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/plans',require('./routes/api/plans'));
app.use('/api/channels',require('./routes/api/channels'));
app.use('/api/profile',require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`server running on port ${PORT}`));

