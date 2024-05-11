const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const dbConn = require("./database/index");

const productRoutes = require("./routes/products.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/", productRoutes)

dbConn()

const PORT = process.env.PORT;


app.get("/", (req,res)=>{
    res.send("Customer")
})

app.listen(PORT, ()=>{
    console.log(`Customer is running on PORT ${PORT}`)
})










































































































// comment 1
// comment 2
// comment 3
// comment 4