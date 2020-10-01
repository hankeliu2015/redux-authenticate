const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
// DB
// mongoose.connect('mongodb://localhost:auth/auth');
mongoose.connect("mongodb://localhost:27017/auth", { useNewUrlParser: true })

// app
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
app.user(cors());
router(app);

// server
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server is listening on:', port);
