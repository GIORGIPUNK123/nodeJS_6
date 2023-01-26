const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use("/", (req, res) => {
  res.json({
    message: "api not found",
  });
});

app.listen(3000, () => console.log("server listening to port 3000"));
