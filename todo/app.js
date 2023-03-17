//npm init -y ; npm i express mongoose ejs
//requiring the packages installed
const express = require('express')
const mongoose = require('mongoose')
const app = express();

//go the the mongodb bin folder and in cmd type mongod
// connect to mongodb
mongoose.set('strictQuery', true); // to have strict Schemas and store in the database only what is specified in you model,from version mongoose v7
mongoose.connect("mongodb://localhost/todo_express", {
    //to avoid depreciated warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

// middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine","ejs");

//routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"));

//server configurations
app.listen(3000, () => console.log('server started listening on port 3000'))

//mvc ; m - structure of schema, v-to render a template using ejs
// ejs - embedded javascript(takes vanilla js and renders in a html template)
// c - routes