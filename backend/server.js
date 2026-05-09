require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const notesRoutes = require('./routes/notes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Notes backend is running',
    endpoints: {
      notes: '/notes',
    },
  });
});

app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
