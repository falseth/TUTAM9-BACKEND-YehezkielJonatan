const express = require('express');
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/note', require('./src/routes/note.route'));
app.use('/user', require('./src/routes/user.route'));

app.listen(port, () => {
  console.log(`tutam9-backend-yehezkieljonatan listening on port ${port}`)
})