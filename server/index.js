const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve('../.env') });
const cors = require('cors');

app.use(cors());

app.use('/api', require('./app').api.router);
app.listen(process.env.SERVER_PORT, () => console.log(`node server running on port ${process.env.SERVER_PORT}...`));
