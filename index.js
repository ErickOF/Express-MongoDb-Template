'use strict'
const cors = require('cors');

const authRoutes = require('./components/auth/auth.routes');

const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');

// init DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Accept all CORS Methods
app.use(cors());

app.use('/api', router);
authRoutes(router);

router.get('/', (req, res) => {
  res.send('MOLABS API');
});

app.use(router);
app.listen(propierties.PORT, () => {
  console.log(`Server runing on port ${propierties.PORT}`);
});
