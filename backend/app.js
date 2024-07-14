const express = require("express");
const app = express();
const cors = require("cors");
require("./connection/connection")

const authRoute = require("./routes/authRoute")
const listRoute = require("./routes/listRoute")

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Todo")
})


app.use("/api/v1", authRoute)
app.use("/api/v2", listRoute)

app.listen(1000, () => {
    console.log(`Server is running at http://localhost:1000`);
})