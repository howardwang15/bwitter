const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve('../.env') });
const cors = require('cors');
const bodyParser = require('body-parser');



const admin = require('firebase-admin');
const serviceKey = require('./firebase-admin-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceKey)
});

app.set('admin', admin);

app.use(cors());
app.use(bodyParser());
app.use('/api', require('./app').api.router);
app.listen(process.env.SERVER_PORT, () => console.log(`node server running on port ${process.env.SERVER_PORT}...`));
