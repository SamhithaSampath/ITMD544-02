// index.js
const express = require('express');
const bodyParser = require('body-parser');
const entityRoutes = require('./routes/entityRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/entities', entityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
