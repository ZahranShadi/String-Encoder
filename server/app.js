const express = require("express");
const app = express();
const port = 5000;

const login = require("./login");
const encoder = require("./encoder");
const authorization = require("./middleware/authorization");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.post("/login", login);

app.use(authorization);

app.post("/encoder", encoder.apiEncode);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
