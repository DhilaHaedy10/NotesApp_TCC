require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const notesRoutes = require('./routes/notes');

app.use(cors());
app.use(express.json());

app.use('/notes', notesRoutes);

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});