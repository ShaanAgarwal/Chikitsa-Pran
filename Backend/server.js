const express = require('express');
const connectDB = require('./config/connectDatabase');
const hospitalRoutes = require('./routes/hospitalRoutes');
const morgan = require('morgan');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/hospital', hospitalRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({ message: "API is running properly", success: true });
});

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
