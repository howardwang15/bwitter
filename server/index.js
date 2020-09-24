const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: path.resolve('../.env') });
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser());
app.use('/api', require('./app').api.router);

app.listen(process.env.SERVER_PORT, () => console.log(`node server running on port ${process.env.SERVER_PORT}...`));
