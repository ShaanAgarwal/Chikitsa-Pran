const express = require('express');
const connectDB = require('./config/connectDatabase');
const hospitalRoutes = require('./routes/hospitalRoutes');

connectDB();

const app = express();

app.use(express.json());
app.use('/api/hospital', hospitalRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({ message: "API is running properly", success: true });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});