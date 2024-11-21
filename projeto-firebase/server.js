const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();

server.use(cors()); // Permite todas as origens

server.use(bodyParser.json());

module.exports = server;