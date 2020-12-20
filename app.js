const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/route");
const authRouter = require("./routes/authRoute");

require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");

const app = express();

const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());

const dbURI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.vigvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => app.listen(port, () => console.log("connected")))
  .catch((err) => console.log(err));

app.use(router);
app.use(authRouter)