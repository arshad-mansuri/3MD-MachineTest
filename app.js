const express = require('express');
const app = express();

const db = require("./models/db");

const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

// app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/user',userRoutes);

app.use('/api',todoRoutes);

db.sequelize.sync();

app.listen(3000);