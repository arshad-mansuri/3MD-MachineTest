const express = require('express');
const app = express();

const apiRoutes = require('./routes/apiRoutes');

app.use('/api',apiRoutes);

app.listen(3000);