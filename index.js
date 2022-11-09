const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/router");
const port = process.env.PORT || 4000;

//midleware

app.use(cors());
app.use(express.json());

app.use("/api", router);

//connection
app.listen(port, () => {
  console.log(`port is running on ${port} successfully 👍👍 `);
});
