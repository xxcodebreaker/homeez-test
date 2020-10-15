const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const port = process.env.PORT || 9000;
const routes = require("./routes/api");

mongoose.connect("mongodb+srv://homeezuser:homeezpassword@cluster0.oihs8.mongodb.net/quotationdb?retryWrites=true&w=majority", { 
    useNewUrlParser: true 
})

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected!');
})

app.use('/api', routes);
app.listen(port, () => console.log(`Server up and running on port ${port} !`));